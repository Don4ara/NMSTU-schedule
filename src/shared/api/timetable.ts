export interface SearchResult {
    id: number;
    name: string;
    url: string;
    type: 'group' | 'teacher';
}

import { ScheduleData } from '@/entities/schedule/model/types';

interface CustomElectronWindow {
    ipcRenderer: {
        invoke(channel: string, ...args: unknown[]): Promise<unknown>;
    };
}

const electronWindow = window as unknown as CustomElectronWindow;

export const searchTimetable = async (query: string): Promise<SearchResult[]> => {
    if (!query) return [];
    try {
        const data = await electronWindow.ipcRenderer.invoke('search-timetable', query) as unknown;
        console.log("API Response:", data);
        return data as SearchResult[];
    } catch (error) {
        console.error("Failed to search timetable:", error);
        return [];
    }
};

export const getSchedule = async (type: 'group' | 'teacher', id: string | number): Promise<ScheduleData | null> => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = await electronWindow.ipcRenderer.invoke('get-schedule', type, String(id)) as any;
        if (data && data.type === 'student_group') {
            data.type = 'group';
        }
        return data as ScheduleData;
    } catch (error) {
        console.error("Failed to fetch schedule from API, trying offline:", error);
        // Try offline fallback
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const offlineData = await electronWindow.ipcRenderer.invoke('get-offline-schedule') as any;
            console.log("Offline data:", offlineData);
            if (offlineData && String(offlineData.id) === String(id) && offlineData.type === type) {
                console.log("Returning offline schedule");
                return offlineData as ScheduleData;
            }
        } catch (offlineError) {
            console.error("Failed to fetch offline schedule:", offlineError);
        }
        throw error;
    }
};

export const saveOfflineSchedule = async (data: ScheduleData) => {
    try {
        await electronWindow.ipcRenderer.invoke('save-offline-schedule', data);
        console.log("Schedule saved for offline usage");
    } catch (error) {
        console.error("Failed to save offline schedule:", error);
    }
};

export const checkApiHealth = async (): Promise<boolean> => {
    try {
        return await electronWindow.ipcRenderer.invoke('check-api-status') as boolean;
    } catch {
        return false;
    }
};

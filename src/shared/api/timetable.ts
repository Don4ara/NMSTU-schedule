export interface SearchResult {
    id: number;
    name: string;
    url: string;
    type: 'group' | 'teacher';
}

export const searchTimetable = async (query: string): Promise<SearchResult[]> => {
    if (!query) return [];
    try {
        const data = await (window as any).ipcRenderer.invoke('search-timetable', query);
        console.log("API Response:", data);
        return data as SearchResult[];
    } catch (error) {
        console.error("Failed to search timetable:", error);
        return [];
    }
};

export const getSchedule = async (type: 'group' | 'teacher', id: string | number): Promise<any> => {
    try {
        const data = await (window as any).ipcRenderer.invoke('get-schedule', type, String(id));
        if (data && data.type === 'student_group') {
            data.type = 'group';
        }
        return data;
    } catch (error) {
        console.error("Failed to fetch schedule from API, trying offline:", error);
        // Try offline fallback
        try {
            const offlineData = await (window as any).ipcRenderer.invoke('get-offline-schedule');
            console.log("Offline data:", offlineData);
            if (offlineData && String(offlineData.id) === String(id) && offlineData.type === type) {
                console.log("Returning offline schedule");
                return offlineData;
            }
        } catch (offlineError) {
            console.error("Failed to fetch offline schedule:", offlineError);
        }
        throw error;
    }
};

export const saveOfflineSchedule = async (data: any) => {
    try {
        await (window as any).ipcRenderer.invoke('save-offline-schedule', data);
        console.log("Schedule saved for offline usage");
    } catch (error) {
        console.error("Failed to save offline schedule:", error);
    }
};

export const checkApiHealth = async (): Promise<boolean> => {
    try {
        return await (window as any).ipcRenderer.invoke('check-api-status');
    } catch {
        return false;
    }
};

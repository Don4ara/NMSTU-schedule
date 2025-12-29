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
        return data;
    } catch (error) {
        console.error("Failed to fetch schedule:", error);
        throw error;
    }
};

export const checkApiHealth = async (): Promise<boolean> => {
    try {
        return await (window as any).ipcRenderer.invoke('check-api-status');
    } catch {
        return false;
    }
};

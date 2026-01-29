// Constants
export const EVENT_RANGES: Record<number, [number, number]> = {
    1: [8 * 60 + 30, 10 * 60],   // 08:30 - 10:00
    2: [10 * 60 + 10, 11 * 60 + 40], // 10:10 - 11:40
    3: [12 * 60 + 20, 13 * 60 + 50], // 12:20 - 13:50
    4: [14 * 60, 15 * 60 + 30],  // 14:00 - 15:30
    5: [15 * 60 + 40, 17 * 60 + 10], // 15:40 - 17:10
    6: [17 * 60 + 20, 18 * 60 + 50],  // 17:20 - 18:50
    7: [19 * 60, 20 * 60 + 30]  // 19:00 - 20:30
};

export const getEventTime = (index: number) => {
    const times: Record<number, string> = {
        1: "08:30 - 10:00",
        2: "10:10 - 11:40",
        3: "12:20 - 13:50",
        4: "14:00 - 15:30",
        5: "15:40 - 17:10",
        6: "17:20 - 18:50",
        7: "19:00 - 20:30",
    };
    return times[index] || `Пара ${index}`;
};

export const getEventTypeColor = (type?: string) => {
    if (!type) return "bg-slate-100 text-slate-700 border-slate-200";
    const t = type.toLowerCase();
    if (t.includes('лекция')) return "bg-blue-50 text-blue-700 border-blue-200";
    if (t.includes('лабораторная')) return "bg-orange-50 text-orange-700 border-orange-200";
    if (t.includes('практика')) return "bg-emerald-50 text-emerald-700 border-emerald-200";
    return "bg-slate-50 text-slate-700 border-slate-200";
};

export const getScheduleCardTheme = (eventType: string) => {
    const type = eventType.toLowerCase();

    if (type.includes('лекция')) { // Blue
        return {
            border: '#3b82f6',
            badge: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700',
            bg: 'bg-blue-100 dark:bg-blue-900/20',
            text: 'text-blue-600 dark:text-blue-400'
        };
    }
    if (type.includes('лабораторная')) { // Orange
        return {
            border: '#f97316',
            badge: 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700',
            bg: 'bg-orange-100 dark:bg-orange-900/20',
            text: 'text-orange-600 dark:text-orange-400'
        };
    }
    // Practice/Default (Emerald/Green)
    return {
        border: '#10b981',
        badge: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700',
        bg: 'bg-emerald-100 dark:bg-emerald-900/20',
        text: 'text-emerald-600 dark:text-emerald-400'
    };
};

// ... other pure helpers that don't depend on features can be moved here too

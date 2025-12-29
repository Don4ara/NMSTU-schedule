
export const getEventTime = (index: number) => {
    const times: Record<number, string> = {
        1: "08:30 - 10:00",
        2: "10:10 - 11:40",
        3: "12:20 - 13:50",
        4: "14:00 - 15:30",
        5: "15:40 - 17:10",
        6: "17:20 - 18:50"
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

export const isEventActive = (dayId: number, eventIndex: number): boolean => {
    const now = new Date();
    const currentDay = now.getDay();
    const adjustedCurrentDay = currentDay === 0 ? 7 : currentDay;

    if (dayId !== adjustedCurrentDay) return false;

    const minutes = now.getHours() * 60 + now.getMinutes();

    const ranges = EVENT_RANGES;

    const range = ranges[eventIndex];
    if (!range) return false;

    return minutes >= range[0] && minutes <= range[1];
};

export const getCurrentWeekName = (): string => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const startYear = now.getMonth() < 8 ? currentYear - 1 : currentYear;
    const startDate = new Date(startYear, 8, 1);

    const diff = now.getTime() - startDate.getTime();
    const weekNumber = Math.ceil(diff / (1000 * 60 * 60 * 24 * 7));

    return weekNumber % 2 !== 0 ? "Четная" : "Нечетная";
};

export const getNextEvent = (events: any[]) => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const ranges = EVENT_RANGES;

    // Filter events for today that haven't ended yet
    const upcomingEvents = events.filter(e => {
        const range = ranges[e.event_index];
        if (!range) return false;
        return currentMinutes < range[1]; // End time
    }).sort((a, b) => a.event_index - b.event_index);

    if (upcomingEvents.length > 0) {
        // Find if one is strictly "next" (starts in the future) or "current" (active now)
        const next = upcomingEvents.find(e => {
            const range = ranges[e.event_index];
            return range && currentMinutes < range[0];
        });

        const current = upcomingEvents.find(e => {
            const range = ranges[e.event_index];
            return range && currentMinutes >= range[0] && currentMinutes <= range[1];
        });

        return { next, current };
    }

    return { next: null, current: null };
};

export const EVENT_RANGES: Record<number, [number, number]> = {
    1: [8 * 60 + 30, 10 * 60 + 0],   // 08:30 - 10:00
    2: [10 * 60 + 10, 11 * 60 + 40], // 10:10 - 11:40
    3: [12 * 60 + 20, 13 * 60 + 50], // 12:20 - 13:50
    4: [14 * 60 + 0, 15 * 60 + 30],  // 14:00 - 15:30
    5: [15 * 60 + 40, 17 * 60 + 10], // 15:40 - 17:10
    6: [17 * 60 + 20, 18 * 60 + 50]  // 17:20 - 18:50
};

export const getRemainingTime = (eventIndex: number): number | null => {
    const range = EVENT_RANGES[eventIndex];
    if (!range) return null;

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const endMinutes = range[1];

    // If current time is past end time, return 0 (or technically shouldn't happen for active event)
    if (currentMinutes > endMinutes) return 0;

    return endMinutes - currentMinutes;
};

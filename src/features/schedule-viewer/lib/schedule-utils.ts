import { Event as ScheduleEvent, ScheduleData, Week, Day } from '@/entities/schedule/model/types';
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

    return weekNumber % 2 === 0 ? "Четная" : "Нечетная";
};

export const getCurrentWeekId = (): number => {
    const weekName = getCurrentWeekName();
    // Assuming backend returns 1 for "Четная" or "Нечетная" usually mapped to specific IDs
    // But week_id in response seems to be arbitrary or 1/2.
    // Based on previous JSON:
    // week_id: 2 -> "Нечетная"
    // week_id: 1 -> "Четная"
    // Let's align with that.
    return weekName === "Нечетная" ? 2 : 1;
};



export const getNextEvent = (events: ScheduleEvent[]) => {
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
    1: [8 * 60 + 30, 10 * 60],   // 08:30 - 10:00
    2: [10 * 60 + 10, 11 * 60 + 40], // 10:10 - 11:40
    3: [12 * 60 + 20, 13 * 60 + 50], // 12:20 - 13:50
    4: [14 * 60, 15 * 60 + 30],  // 14:00 - 15:30
    5: [15 * 60 + 40, 17 * 60 + 10], // 15:40 - 17:10
    6: [17 * 60 + 20, 18 * 60 + 50],  // 17:20 - 18:50
    7: [19 * 60, 20 * 60 + 30]  // 19:00 - 20:30
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

export const getDateForDay = (dayId: number, targetWeekName: string): Date => {
    const now = new Date();
    const currentWeekName = getCurrentWeekName();
    const isTargetCurrent = currentWeekName.toLowerCase() === targetWeekName.toLowerCase();

    // Get current Monday
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    const currentMonday = new Date(now.setDate(diff));

    const targetMonday = new Date(currentMonday);
    if (!isTargetCurrent) {
        // If target is not current, assume it's next week
        targetMonday.setDate(targetMonday.getDate() + 7);
    }

    // Now calculate the specific day date
    // dayId: 1=Mon, ..., 7=Sun
    const targetDate = new Date(targetMonday);
    targetDate.setDate(targetMonday.getDate() + (dayId - 1));
    return targetDate;
};
/**
 * Finds an event at a specific index (period) in a list of events.
 */
export const findEventAt = (events: ScheduleEvent[] | undefined, index: number) => {
    return events?.find((e: ScheduleEvent) => e.event_index === index);
};

/**
 * Returns theme colors for a schedule card based on event type.
 */
export const getScheduleCardTheme = (eventType: string) => {
    const typeColor = getEventTypeColor(eventType);
    if (typeColor.includes('blue')) {
        return {
            border: '#3b82f6',
            badge: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700',
        };
    }
    if (typeColor.includes('orange')) {
        return {
            border: '#f97316',
            badge: 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700',
        };
    }
    return {
        border: '#10b981',
        badge: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700',
    };
};

/**
 * Retrieves the day data for a specific week and day from the schedule.
 */
export const getWeekDayData = (scheduleData: ScheduleData | undefined | null, weekId: number, dayId: number) => {
    if (!scheduleData || !scheduleData.schedule) return null;
    const week = scheduleData.schedule.find((w: Week) => w.week_id === weekId);
    if (!week) return null;
    return week.days.find((d: Day) => d.day_id === dayId);
};

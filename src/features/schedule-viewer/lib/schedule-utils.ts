import { Event as ScheduleEvent, ScheduleData, Week, Day, GroupedEvent } from '@/entities/schedule/model/types';

export const groupEvents = (events: ScheduleEvent[]): GroupedEvent[] => {
    const grouped: GroupedEvent[] = [];
    const processedIndices = new Set<number>();

    events.forEach((event, index) => {
        if (processedIndices.has(index)) return;

        // Find matching events (same time, course, type, location)
        const duplicates = events.filter((e, i) =>
            i !== index &&
            !processedIndices.has(i) &&
            e.event_index === event.event_index &&
            e.course === event.course &&
            e.type === event.type &&
            e.location === event.location
        );

        if (duplicates.length > 0) {
            const allEvents = [event, ...duplicates];
            // Sort by subgroup to have a consistent order
            allEvents.sort((a, b) => a.subgroup - b.subgroup);

            const groupNames = allEvents.map(e => e.reverse || `Subgroup ${e.subgroup}`);

            // Extract base names (remove subgroup info like " (1 п/г)")
            // Assuming format "Name (X п/г)"
            const baseNames = allEvents.map(e => {
                const name = e.reverse || "";
                // Remove (X п/г) or (X подгр) etc at the end if present. 
                // We use a safe split approach for " (number" pattern or regex.
                // The user example: "АПИб-24-1 (3 п/г)"
                return name.split(' (')[0].trim();
            });

            const uniqueBaseNames = Array.from(new Set(baseNames));

            grouped.push({
                ...event,
                isGrouped: true,
                groupNames,
                originalEvents: allEvents,
                // Combine subgroups for display if needed, or rely on groupNames
                reverse: uniqueBaseNames.length === 1
                    ? uniqueBaseNames[0]
                    : `${allEvents.length} групп`,
                subgroup: 0 // meaningful subgroup for grouped event might be irrelevant
            });

            // Mark all as processed
            processedIndices.add(index);
            duplicates.forEach(d => {
                // We need to find the original index of 'd' in the 'events' array
                const originalIndex = events.indexOf(d);
                processedIndices.add(originalIndex);
            });
        } else {
            grouped.push(event);
            processedIndices.add(index);
        }
    });

    return grouped.sort((a, b) => a.event_index - b.event_index);
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

export const isEventActive = (dayId: number, eventIndex: number, eventDate?: string): boolean => {
    const now = new Date();
    const currentDay = now.getDay();
    const adjustedCurrentDay = currentDay === 0 ? 7 : currentDay;

    if (dayId !== adjustedCurrentDay) return false;

    // Проверяем, что это сегодняшний день (а не просто тот же день недели)
    if (eventDate) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const [day, month, year] = eventDate.split('.');
        const eventDateObj = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        eventDateObj.setHours(0, 0, 0, 0);

        if (today.getTime() !== eventDateObj.getTime()) return false;
    }

    const minutes = now.getHours() * 60 + now.getMinutes();

    const ranges = EVENT_RANGES;

    const range = ranges[eventIndex];
    if (!range) return false;

    return minutes >= range[0] && minutes <= range[1];
};

export const getCurrentWeekName = (): string => {
    return getWeekParity(new Date());
};

export const getWeekParity = (date: Date): string => {
    const currentYear = date.getFullYear();
    const startYear = date.getMonth() < 8 ? currentYear - 1 : currentYear;
    const startDate = new Date(startYear, 8, 1);

    // Reset hours to avoid timezone/DST issues affecting day diff
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    const s = new Date(startDate);
    s.setHours(0, 0, 0, 0);

    const diff = d.getTime() - s.getTime();
    if (diff < 0) return "Нечетная"; // Before sept 1st

    const weekNumber = Math.ceil((diff + 1) / (1000 * 60 * 60 * 24 * 7));
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

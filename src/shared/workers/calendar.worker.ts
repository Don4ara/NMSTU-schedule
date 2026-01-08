import { ScheduleData, Week, Day, Event } from '../../entities/schedule/model/types';

// Helper to get days in month
const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
};

self.onmessage = (e: MessageEvent) => {
    const { scheduleData, year, month } = e.data as {
        scheduleData: ScheduleData | null;
        year: number;
        month: number;
    };

    if (!scheduleData || !scheduleData.schedule) {
        self.postMessage({ daysMap: {}, lectureCount: 0, pairCount: 0, year, month });
        return;
    }

    const daysMap: Record<number, Event[]> = {};
    let lectureCount = 0;
    let pairCount = 0;

    const daysInMonth = getDaysInMonth(year, month);
    const today = new Date();

    // Cache weeks to avoid finding them repeatedly
    const evenWeek = scheduleData.schedule.find((w: Week) => w.week.toLowerCase() === "четная");
    const oddWeek = scheduleData.schedule.find((w: Week) => w.week.toLowerCase() === "нечетная");

    for (let d = 1; d <= daysInMonth; d++) {
        const targetDate = new Date(year, month, d);

        // Calculate week number from Sept 1st
        const academicStart = new Date(
            targetDate.getMonth() < 8 ? targetDate.getFullYear() - 1 : targetDate.getFullYear(),
            8, 1
        );
        const diffTime = Math.abs(targetDate.getTime() - academicStart.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const weekNum = Math.floor((diffDays + academicStart.getDay() - 1) / 7) + 1;

        const isOdd = weekNum % 2 !== 0;
        const weekData = isOdd ? oddWeek : evenWeek;

        if (weekData) {
            // Map JS day (0-6 Sun-Sat) to API day (1-7 Mon-Sun)
            const jsDay = targetDate.getDay();
            const apiDayId = jsDay === 0 ? 7 : jsDay;

            const dayData = weekData.days.find((d: Day) => d.day_id === apiDayId);
            const events = dayData?.events || [];

            daysMap[d] = events;

            // Statistics calculation
            // Only count remaining from today if current month, else whole month if future
            // (Preserving logic from original component)
            const checkDate = new Date(year, month, d);
            if (checkDate >= new Date(today.setHours(0, 0, 0, 0))) {
                const distinctEvents = events.filter((event: Event, index: number, self: Event[]) =>
                    index === self.findIndex((t) => (
                        t.event_index === event.event_index &&
                        t.course === event.course &&
                        t.type === event.type
                    ))
                );

                pairCount += distinctEvents.length;
                lectureCount += distinctEvents.filter((e: Event) => e.type.toLowerCase().includes('лекция')).length;
            }
        } else {
            daysMap[d] = [];
        }
    }

    self.postMessage({ daysMap, lectureCount, pairCount, year, month });
};

export { };

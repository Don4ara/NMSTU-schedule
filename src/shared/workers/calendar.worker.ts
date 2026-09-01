import { ScheduleData, Week, Day, Event } from '../../entities/schedule/model/types';
import { getWeekParity } from '../../entities/schedule/lib/schedule-utils';

// Кэш результатов обработки - ключ: type_id, значение: fullScheduleMap
let cachedResult: { key: string; fullScheduleMap: Record<string, Event[]> } | null = null;

self.onmessage = (e: MessageEvent) => {
    const { scheduleData, baseYear } = e.data as {
        scheduleData: ScheduleData | null;
        baseYear: number; // The year the academic year starts (e.g., 2025 for 2025-2026)
    };

    if (!scheduleData || !scheduleData.schedule) {
        self.postMessage({ fullScheduleMap: {} });
        return;
    }

    // Создаём ключ кэша из типа и id
    const cacheKey = `${scheduleData.type}_${scheduleData.id}_${baseYear}`;

    // Проверяем кэш - если данные те же, возвращаем мгновенно
    if (cachedResult && cachedResult.key === cacheKey) {
        self.postMessage({ fullScheduleMap: cachedResult.fullScheduleMap });
        return;
    }

    const fullScheduleMap: Record<string, Event[]> = {};

    // Determine academic year range: Sept 1, baseYear -> Aug 31, baseYear + 1
    const startDate = new Date(baseYear, 8, 1); // Sept 1
    const endDate = new Date(baseYear + 1, 7, 31); // Aug 31 next year

    // Cache weeks
    const evenWeek = scheduleData.schedule.find((w: Week) => w.week.toLowerCase() === "четная");
    const oddWeek = scheduleData.schedule.find((w: Week) => w.week.toLowerCase() === "нечетная");

    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        // Чётность считает общий getWeekParity — раньше здесь была своя формула,
        // расходившаяся с расписанием во всех годах, где 1 сентября не понедельник.
        const isOdd = getWeekParity(currentDate, baseYear) === "Нечетная";
        const weekData = isOdd ? oddWeek : evenWeek;

        const dateKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;

        if (weekData) {
            // Map JS day (0-6 Sun-Sat) to API day (1-7 Mon-Sun)
            const jsDay = currentDate.getDay();
            const apiDayId = jsDay === 0 ? 7 : jsDay;

            const dayData = weekData.days.find((d: Day) => d.day_id === apiDayId);
            fullScheduleMap[dateKey] = dayData?.events || [];
        } else {
            fullScheduleMap[dateKey] = [];
        }

        // Next day
        currentDate.setDate(currentDate.getDate() + 1);
    }

    // Сохраняем в кэш
    cachedResult = { key: cacheKey, fullScheduleMap };

    self.postMessage({ fullScheduleMap });
};

export { };


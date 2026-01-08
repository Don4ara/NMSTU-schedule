import { useState, useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useSchedule } from '@/app/provider/schedule-provider';
import { getSchedule } from '@/shared/api/timetable';
import { ScheduleData, Event as ScheduleEvent } from '@/entities/schedule/model/types';
import { useQuery } from '@tanstack/react-query';
import { CalendarHeader } from '@/features/calendar-viewer/ui/components/calendar-header';
import { CalendarGrid } from '@/features/calendar-viewer/ui/components/calendar-grid';
import { CalendarEmptyState } from '@/features/calendar-viewer/ui/components/calendar-empty-state';
import { DayDetailsDialog } from '@/features/calendar-viewer/ui/components/day-details-dialog';
import CalendarWorker from '@/shared/workers/calendar.worker?worker';
import { getDaysInMonth, getFirstDayOfMonth } from '@/shared/lib/date-utils';

// Helper to get days in month


export const CalendarViewer = () => {
    console.log('CalendarViewer: render');
    const { trackedEntity, setTrackedEntity } = useSchedule();
    const [currentDate, setCurrentDate] = useState(new Date());

    const { data: scheduleData, isLoading: loading } = useQuery<ScheduleData | null>({
        queryKey: ['schedule', trackedEntity?.type, trackedEntity?.id],
        queryFn: () => getSchedule(trackedEntity!.type, trackedEntity!.id),
        enabled: !!trackedEntity,
    });

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Worker State
    const workerRef = useRef<Worker | null>(null);
    const [workerDaysMap, setWorkerDaysMap] = useState<Record<number, ScheduleEvent[]>>({});
    const [workerStats, setWorkerStats] = useState({ lectureCount: 0, pairCount: 0 });
    const [calculating, setCalculating] = useState(false);
    const [loadedPeriod, setLoadedPeriod] = useState<{ year: number, month: number } | null>(null);

    // Initialize Worker
    useEffect(() => {
        workerRef.current = new CalendarWorker();
        workerRef.current.onmessage = (e) => {
            const { daysMap, lectureCount, pairCount, year: loadedYear, month: loadedMonth } = e.data;
            setWorkerDaysMap(daysMap);
            setWorkerStats({ lectureCount, pairCount });
            setLoadedPeriod({ year: loadedYear, month: loadedMonth });
            setCalculating(false);
        };

        return () => {
            workerRef.current?.terminate();
        };
    }, []);

    // Send data to worker when dependencies change
    useEffect(() => {
        if (workerRef.current) {
            // Очищаем старые данные сразу при смене месяца
            setWorkerDaysMap({});
            setCalculating(true);
            workerRef.current.postMessage({
                scheduleData,
                year,
                month
            });
        }
    }, [scheduleData, year, month]);

    // Dialog State
    const [selectedDay, setSelectedDay] = useState<Date | null>(null);
    const [selectedEvents, setSelectedEvents] = useState<ScheduleEvent[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Calculate stats and map events to days
    // Note: This is an approximation since the API returns weeks, not dates directly.
    // We need to map weeks to dates based on Sept 1st start.
    const getEventsForDate = useCallback((date: number) => {
        return workerDaysMap[date] || [];
    }, [workerDaysMap]);


    const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
    const goToToday = () => setCurrentDate(new Date());

    if (!trackedEntity) {
        return <CalendarEmptyState onSelect={(entity) => setTrackedEntity(entity)} />;
    }

    const daysInMonth = getDaysInMonth(year, month);
    const startDay = getFirstDayOfMonth(year, month);

    const handleDayClick = (day: number) => {
        console.log('CalendarViewer: handleDayClick', day);
        const date = new Date(year, month, day);
        const events = getEventsForDate(day);

        setSelectedDay(date);
        setSelectedEvents(events);
        setIsDialogOpen(true);
    };

    const isStale = !loadedPeriod || loadedPeriod.year !== year || loadedPeriod.month !== month;
    const isLoadingState = loading || calculating || isStale;

    return (
        <motion.div
            className="flex flex-col h-full backdrop-blur-sm max-w-[1920px] mx-auto w-full justify-center p-4 md:p-8 relative"
        >
            <CalendarHeader
                month={month}
                year={year}
                lectureCount={workerStats.lectureCount}
                pairCount={workerStats.pairCount}
                loading={isLoadingState}
                onPrevMonth={prevMonth}
                onNextMonth={nextMonth}
                onToday={goToToday}
                trackedEntityName={trackedEntity.name}
                onClearTrackedEntity={() => setTrackedEntity(null)}
            />

            <CalendarGrid
                loading={isLoadingState}
                daysInMonth={daysInMonth}
                startDay={startDay}
                currentDay={new Date().getDate()}
                currentMonth={new Date().getMonth()}
                currentYear={new Date().getFullYear()}
                getEventsForDate={getEventsForDate}
                onDayClick={handleDayClick}
            />

            <DayDetailsDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                date={selectedDay}
                events={selectedEvents}
                isGroup={trackedEntity?.type === 'group'}
            />
        </motion.div>
    );
};

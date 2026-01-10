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
    const [fullScheduleMap, setFullScheduleMap] = useState<Record<string, ScheduleEvent[]>>({});
    const [isWorkerLoading, setIsWorkerLoading] = useState(false);

    // Initialize Worker
    useEffect(() => {
        workerRef.current = new CalendarWorker();
        workerRef.current.onmessage = (e) => {
            const { fullScheduleMap } = e.data;
            setFullScheduleMap(fullScheduleMap);
            setIsWorkerLoading(false);
        };

        return () => {
            workerRef.current?.terminate();
        };
    }, []);

    // Send data to worker when schedule loaded
    useEffect(() => {
        if (workerRef.current && scheduleData) {
            setIsWorkerLoading(true);
            // Calculate for the academic year relevant to "now" to ensure we cover likely range
            // Actually, better to anchor on current date view? 
            // Let's anchor on the current real date to start, 
            // but if user navigates far, we might need re-calc? 
            // For now, let's assume one academic year is enough context.
            // Or better: pass the year from scheduleData? API doesn't give year.
            // Let's use the year from the *current real date* to determine academic year.
            const now = new Date();
            const currentRealYear = now.getFullYear();
            const academicStartYear = now.getMonth() < 8 ? currentRealYear - 1 : currentRealYear;

            workerRef.current.postMessage({
                scheduleData,
                baseYear: academicStartYear
            });
        }
    }, [scheduleData]);

    // Dialog State
    const [selectedDay, setSelectedDay] = useState<Date | null>(null);
    const [selectedEvents, setSelectedEvents] = useState<ScheduleEvent[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Get events from full map
    const getEventsForDate = useCallback((date: Date) => {
        const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        return fullScheduleMap[dateKey] || [];
    }, [fullScheduleMap]);

    // Calculate stats for CURRENT VIEWED MONTH synchronously
    const { lectureCount, pairCount } = useMemoSimpleStats(fullScheduleMap, year, month);

    const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
    const goToToday = () => setCurrentDate(new Date());

    if (!trackedEntity) {
        return <CalendarEmptyState onSelect={(entity) => setTrackedEntity(entity)} />;
    }

    const startDay = getFirstDayOfMonth(year, month);

    const handleDayClick = (date: Date) => {
        console.log('CalendarViewer: handleDayClick', date);
        const events = getEventsForDate(date);

        setSelectedDay(date);
        setSelectedEvents(events);
        setIsDialogOpen(true);
    };

    // No loading state for month switches anymore!
    const isLoadingState = loading || isWorkerLoading;
    const isUpdating = false; // Always instant now

    return (
        <motion.div
            className="flex flex-col h-full backdrop-blur-sm max-w-[1920px] mx-auto w-full justify-center p-4 md:p-8 relative"
        >
            <CalendarHeader
                month={month}
                year={year}
                lectureCount={lectureCount}
                pairCount={pairCount}
                loading={isLoadingState}
                onPrevMonth={prevMonth}
                onNextMonth={nextMonth}
                onToday={goToToday}
                trackedEntityName={trackedEntity.name}
                onClearTrackedEntity={() => setTrackedEntity(null)}
            />

            <CalendarGrid
                loading={isLoadingState}
                isUpdating={isUpdating}
                startDay={startDay}
                currentMonth={month}
                currentYear={year}
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

// Helper for stats
function useMemoSimpleStats(fullScheduleMap: Record<string, ScheduleEvent[]>, year: number, month: number) {
    const days = getDaysInMonth(year, month);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let lectureCount = 0;
    let pairCount = 0;

    for (let d = 1; d <= days; d++) {
        const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        const events = fullScheduleMap[dateKey] || [];

        const checkDate = new Date(year, month, d);

        // Only count current or future days logic? 
        // Previous logic: "if (checkDate >= new Date(today.setHours(0, 0, 0, 0)))"
        // Let's keep that.
        if (checkDate >= today) {
            const distinctEvents = events.filter((event, index, self) =>
                index === self.findIndex((t) => (
                    t.event_index === event.event_index &&
                    t.course === event.course &&
                    t.type === event.type
                ))
            );
            pairCount += distinctEvents.length;
            lectureCount += distinctEvents.filter(e => e.type.toLowerCase().includes('лекция')).length;
        }
    }
    return { lectureCount, pairCount };
}

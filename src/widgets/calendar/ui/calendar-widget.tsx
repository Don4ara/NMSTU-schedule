import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
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

export const CalendarWidget = () => {
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

    // Calculate stats for CURRENT VIEWED MONTH - теперь правильно мемоизировано
    const { lectureCount, pairCount } = useMemo(() => {
        const days = getDaysInMonth(year, month);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let lCount = 0;
        let pCount = 0;

        for (let d = 1; d <= days; d++) {
            const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            const events = fullScheduleMap[dateKey] || [];
            const checkDate = new Date(year, month, d);

            if (checkDate >= today) {
                const distinctEvents = events.filter((event, index, self) =>
                    index === self.findIndex((t) => (
                        t.event_index === event.event_index &&
                        t.course === event.course &&
                        t.type === event.type
                    ))
                );
                pCount += distinctEvents.length;
                lCount += distinctEvents.filter(e => e.type.toLowerCase().includes('лекция')).length;
            }
        }
        return { lectureCount: lCount, pairCount: pCount };
    }, [fullScheduleMap, year, month]);

    const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
    const goToToday = () => setCurrentDate(new Date());

    if (!trackedEntity) {
        return <CalendarEmptyState onSelect={(entity) => setTrackedEntity(entity)} />;
    }

    const startDay = getFirstDayOfMonth(year, month);

    const handleDayClick = (date: Date) => {
        const events = getEventsForDate(date);
        setSelectedDay(date);
        setSelectedEvents(events);
        setIsDialogOpen(true);
    };

    const isLoadingState = loading || isWorkerLoading;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col h-[calc(100vh-2rem)] max-w-[1920px] mx-auto w-full p-4 lg:p-6 gap-4"
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

            <div className="flex-1 min-h-0 bg-white dark:bg-slate-900 rounded-[1.5rem] shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden relative">
                <CalendarGrid
                    loading={isLoadingState}
                    isUpdating={false}
                    startDay={startDay}
                    currentMonth={month}
                    currentYear={year}
                    getEventsForDate={getEventsForDate}
                    onDayClick={handleDayClick}
                />
            </div>

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


import { useState, useEffect, useCallback } from 'react';
import { useSchedule } from '@/app/provider/schedule-provider';
import { getSchedule } from '@/shared/api/timetable';
import { ScheduleData, Event as ScheduleEvent } from '@/entities/schedule/model/types';
import { useQuery } from '@tanstack/react-query';
import { CalendarHeader } from './components/calendar-header';
import { CalendarGrid } from './components/calendar-grid';
import { CalendarEmptyState } from './components/calendar-empty-state';
import { DayDetailsDialog } from './components/day-details-dialog';

// Helper to get days in month
const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
};

// Helper to get start day of month (0-6, Sun-Sat) - adjust for Monday start
const getFirstDayOfMonth = (year: number, month: number) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; // Convert Sun(0) to 6, Mon(1) to 0
};

export const CalendarViewer = () => {
    console.log('CalendarViewer: render');
    const { trackedEntity, setTrackedEntity } = useSchedule();
    const [currentDate, setCurrentDate] = useState(new Date());

    const { data: scheduleData, isLoading: loading } = useQuery<ScheduleData>({
        queryKey: ['schedule', trackedEntity?.type, trackedEntity?.id],
        queryFn: () => getSchedule(trackedEntity!.type, trackedEntity!.id),
        enabled: !!trackedEntity,
    });

    // Stats
    const [lectureCount, setLectureCount] = useState(0);
    const [pairCount, setPairCount] = useState(0);

    // Dialog State (moved up to avoid conditional hook call error)
    const [selectedDay, setSelectedDay] = useState<Date | null>(null);
    const [selectedEvents, setSelectedEvents] = useState<ScheduleEvent[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Calculate stats and map events to days
    // Note: This is an approximation since the API returns weeks, not dates directly.
    // We need to map weeks to dates based on Sept 1st start.
    const getEventsForDate = useCallback((date: number) => {
        if (!scheduleData?.schedule) return [];

        const targetDate = new Date(year, month, date);

        // Calculate week number from Sept 1st
        const academicStart = new Date(
            targetDate.getMonth() < 8 ? targetDate.getFullYear() - 1 : targetDate.getFullYear(),
            8, 1
        );
        const diffTime = Math.abs(targetDate.getTime() - academicStart.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const weekNum = Math.ceil((diffDays + academicStart.getDay() - 1) / 7);

        const isOdd = weekNum % 2 !== 0;
        const weekName = isOdd ? "Четная" : "Нечетная";

        const weekData = scheduleData.schedule.find(w => w.week.toLowerCase() === weekName.toLowerCase());
        if (!weekData) return [];

        // Map JS day (0-6 Sun-Sat) to API day (1-7 Mon-Sun?) 
        // API: Mon=1 ... Sun=7.
        // JS: Sun=0, Mon=1...
        const jsDay = targetDate.getDay();
        const apiDayId = jsDay === 0 ? 7 : jsDay;

        const dayData = weekData.days.find(d => d.day_id === apiDayId);
        return dayData?.events || [];
    }, [scheduleData, year, month]);

    // Recalculate stats when month/schedule changes
    useEffect(() => {
        if (!scheduleData) return;

        let lectures = 0;
        let pairs = 0;
        const daysInMonth = getDaysInMonth(year, month);
        const today = new Date();

        for (let d = 1; d <= daysInMonth; d++) {
            // Only count remaining from today if current month, else whole month if future
            const checkDate = new Date(year, month, d);
            if (checkDate < new Date(today.setHours(0, 0, 0, 0))) continue; // Skip past days

            const events = getEventsForDate(d);

            // Filter distinct events like in ScheduleViewer
            const distinctEvents = events.filter((event: ScheduleEvent, index: number, self: ScheduleEvent[]) =>
                index === self.findIndex((t) => (
                    t.event_index === event.event_index &&
                    t.course === event.course &&
                    t.type === event.type
                ))
            );

            pairs += distinctEvents.length;
            lectures += distinctEvents.filter((e: ScheduleEvent) => e.type.toLowerCase().includes('лекция')).length;
        }

        setLectureCount(lectures);
        setPairCount(pairs);
    }, [year, month, scheduleData, getEventsForDate]);


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

        console.log('CalendarViewer: setting selected day', date);
        console.log('CalendarViewer: setting selected events', events);

        setSelectedDay(date);
        setSelectedEvents(events);
        setIsDialogOpen(true);
    };

    return (
        <div className="flex flex-col h-full bg-white/50 backdrop-blur-sm max-w-[1920px] mx-auto w-full justify-center p-4 md:p-8 relative">
            <CalendarHeader
                month={month}
                year={year}
                lectureCount={lectureCount}
                pairCount={pairCount}
                loading={loading}
                onPrevMonth={prevMonth}
                onNextMonth={nextMonth}
                onToday={goToToday}
                trackedEntityName={trackedEntity.name}
                onClearTrackedEntity={() => setTrackedEntity(null)}
            />

            <CalendarGrid
                loading={loading}
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
        </div>
    );
};

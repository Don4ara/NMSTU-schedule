
import React from 'react';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Event as ScheduleEvent } from '@/entities/schedule/model/types';
import { getWeekParity, groupEvents } from '@/features/schedule-viewer/lib/schedule-utils';
import { useSchedule } from '@/app/provider/schedule-provider';

interface CalendarGridProps {
    loading: boolean;
    startDay: number;
    currentMonth: number;
    currentYear: number;
    getEventsForDate: (date: Date) => ScheduleEvent[];
    onDayClick: (date: Date) => void;
    isUpdating?: boolean;
}

const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export const CalendarGrid: React.FC<CalendarGridProps> = React.memo(({
    loading,
    startDay,
    currentMonth,
    currentYear,
    getEventsForDate,
    onDayClick,
    isUpdating = false
}) => {
    const { trackedEntity } = useSchedule();
    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();

    const getRowParity = (weekIndex: number) => {
        const gridStartIndex = weekIndex * 7;
        const dayOffset = gridStartIndex - startDay + 1;
        const date = new Date(currentYear, currentMonth, dayOffset);
        return getWeekParity(date);
    };

    const weeks = 6;

    if (loading && !isUpdating) { // Only show full loader if initial load
        return (
            <div className="flex-1 flex items-center justify-center h-full min-h-[400px]">
                <Loader2 className="animate-spin text-blue-600" size={32} />
            </div>
        );
    }

    return (
        <div className="relative flex-1 flex flex-col min-h-0 w-full h-full">
            {/* Header Row */}
            <div className="grid grid-cols-[40px_repeat(7,minmax(0,1fr))] mb-2 pr-[6px] gap-2">
                <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase flex items-center justify-center tracking-widest">

                </div>
                {WEEKDAYS.map((day, index) => (
                    <div
                        key={day}
                        className={`text-center py-2 text-[11px] font-bold uppercase tracking-wider
                            ${index >= 5 ? 'text-red-400 dark:text-red-400/80' : 'text-slate-400 dark:text-slate-500'}
                        `}
                    >
                        {day}
                    </div>
                ))}
            </div>

            {/* Scrollable Grid Area */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 overflow-hidden relative rounded-2xl"
            >
                <div
                    className="grid grid-cols-[40px_repeat(7,minmax(0,1fr))] h-full gap-2 p-1"
                    style={{ gridTemplateRows: `repeat(${weeks}, minmax(0, 1fr))` }}
                >
                    {isUpdating && (
                        <div className="absolute inset-0 z-20 bg-white/50 dark:bg-slate-950/50 backdrop-blur-[1px] flex items-center justify-center rounded-2xl">
                            <Loader2 className="animate-spin text-blue-600" size={24} />
                        </div>
                    )}

                    {Array.from({ length: weeks }).map((_, weekIndex) => {
                        const parity = getRowParity(weekIndex);
                        const isOdd = parity === 'Нечетная';

                        return (
                            <React.Fragment key={weekIndex}>
                                {/* Week Number / Parity Indicator */}
                                <div className={`
                                    flex items-center justify-center rounded-xl bg-white/50 dark:bg-slate-900/50
                                    ${isOdd ? 'bg-blue-50/30' : 'bg-orange-50/30'}
                                    transition-all hover:bg-white dark:hover:bg-slate-800
                                `}>
                                    <div className={`
                                        text-[10px] font-bold uppercase tracking-widest -rotate-90 whitespace-nowrap
                                        ${isOdd ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400'}
                                    `}>
                                        {isOdd ? 'Нечетная' : 'Четная'}
                                    </div>
                                </div>

                                {/* Days */}
                                {Array.from({ length: 7 }).map((_, dayIndex) => {
                                    const cellIndex = weekIndex * 7 + dayIndex;
                                    const dayOffset = cellIndex - startDay + 1;
                                    const cellDate = new Date(currentYear, currentMonth, dayOffset);
                                    const isCurrentMonth = cellDate.getMonth() === currentMonth;
                                    const dayNumber = cellDate.getDate();
                                    const rawEvents = getEventsForDate(cellDate);

                                    // Apply grouping if teacher
                                    const dateEvents = trackedEntity?.type === 'teacher'
                                        ? groupEvents(rawEvents)
                                        : rawEvents;

                                    const isToday = cellDate.getFullYear() === todayYear &&
                                        cellDate.getMonth() === todayMonth &&
                                        cellDate.getDate() === todayDate;

                                    const isWeekend = dayIndex >= 5;

                                    // Glass Card Styling
                                    let cardClasses = 'bg-white dark:bg-slate-900 shadow-sm border-transparent';
                                    let numberClasses = 'text-slate-700 dark:text-slate-300';

                                    if (!isCurrentMonth) {
                                        cardClasses = 'bg-white/40 dark:bg-slate-900/20 shadow-none border-transparent opacity-60';
                                        numberClasses = 'text-slate-400 dark:text-slate-600';
                                    } else if (isToday) {
                                        cardClasses = 'bg-white dark:bg-slate-900 ring-2 ring-blue-500/50 shadow-md transform scale-[1.02] z-10';
                                        numberClasses = 'text-blue-600 dark:text-blue-400';
                                    } else if (isWeekend) {
                                        cardClasses = 'bg-red-50/30 dark:bg-red-900/10 shadow-sm';
                                        numberClasses = 'text-red-500 dark:text-red-400';
                                    }

                                    return (
                                        <div
                                            key={`${weekIndex}-${dayIndex}`}
                                            onClick={() => onDayClick(cellDate)}
                                            className={`
                                                relative flex flex-col items-center justify-between py-2 px-1 rounded-2xl
                                                transition-all duration-300 cursor-pointer group min-h-0
                                                hover:shadow-md hover:scale-[1.03] hover:z-10
                                                ${cardClasses}
                                            `}
                                        >
                                            {/* Top: Day Number and Dots */}
                                            <div className="w-full flex justify-between items-start px-1">
                                                <div className={`
                                                    text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full transition-all
                                                    ${isToday ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : numberClasses}
                                                `}>
                                                    {dayNumber}
                                                </div>

                                                {/* Tiny dots interaction hint */}
                                                {dateEvents.length > 0 && isCurrentMonth && (
                                                    <div className="flex gap-0.5 mt-1">
                                                        {dateEvents.some((e) => e.type.includes('Лек')) && <div className="w-1 h-1 rounded-full bg-blue-400" />}
                                                        {dateEvents.some((e) => e.type.includes('Прак') || e.type.includes('Лаб')) && <div className="w-1 h-1 rounded-full bg-orange-400" />}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Center: Count */}
                                            <div className="flex-1 flex flex-col items-center justify-center w-full">
                                                {dateEvents.length > 0 && isCurrentMonth ? (
                                                    <div className="flex flex-col items-center gap-0">
                                                        <span className={`text-xl font-bold tracking-tight ${isToday ? 'text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-200'}`}>
                                                            {dateEvents.length}
                                                        </span>
                                                        <span className="text-[8px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wide">
                                                            {dateEvents.length > 4 ? 'пар' : dateEvents.length === 1 ? 'пара' : 'пары'}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    // Empty state
                                                    null
                                                )}
                                            </div>

                                            {/* Bottom filler */}
                                            <div className="h-4" />
                                        </div>
                                    );
                                })}
                            </React.Fragment>
                        );
                    })}
                </div>
            </motion.div>
        </div>
    );
});

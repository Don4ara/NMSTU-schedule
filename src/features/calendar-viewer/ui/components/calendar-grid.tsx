
import React from 'react';
import { Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Event as ScheduleEvent } from '@/entities/schedule/model/types';
import { getWeekParity } from '@/features/schedule-viewer/lib/schedule-utils';

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

export const CalendarGrid: React.FC<CalendarGridProps> = ({
    loading,
    startDay,
    currentMonth,
    currentYear,
    getEventsForDate,
    onDayClick,
    isUpdating = false
}) => {
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
            <div className="grid grid-cols-[40px_repeat(7,minmax(0,1fr))] mb-2 pr-[6px]"> {/* Add pr to compensate scrollbar if needed, but we hide it */}
                <div className="text-[10px] font-bold text-slate-300 dark:text-slate-600 uppercase flex items-center justify-center tracking-widest">

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

            {/* Scrollable Grid Area (hidden scroll) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 overflow-hidden relative bg-white/50 dark:bg-slate-900/50"
            >
                <div
                    className="grid grid-cols-[40px_repeat(7,minmax(0,1fr))] h-full"
                    style={{ gridTemplateRows: `repeat(${weeks}, minmax(0, 1fr))` }} // Force equal height, no scroll
                >
                    {isUpdating && (
                        <div className="absolute inset-0 z-20 bg-white/50 dark:bg-slate-950/50 backdrop-blur-[1px] flex items-center justify-center">
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
                                    flex items-center justify-center border-r bg-white border-slate-100 dark:border-slate-800
                                    ${isOdd ? 'bg-blue-50/10' : 'bg-orange-50/10'}
                                    border-b border-slate-100 dark:border-slate-800
                                `}>
                                    <div className={`
                                        text-[10px] font-bold uppercase tracking-widest -rotate-90 whitespace-nowrap
                                        ${isOdd ? 'text-blue-500/60' : 'text-orange-500/60'}
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
                                    const dateEvents = getEventsForDate(cellDate);
                                    const isToday = cellDate.getFullYear() === todayYear &&
                                        cellDate.getMonth() === todayMonth &&
                                        cellDate.getDate() === todayDate;

                                    const isWeekend = dayIndex >= 5;
                                    const isLastInRow = dayIndex === 6;

                                    // Styles for adjacent month days
                                    const bgClass = isCurrentMonth
                                        ? (isToday
                                            ? 'bg-white dark:bg-blue-900/5'
                                            : isWeekend
                                                ? 'bg-red-50/50 dark:bg-red-900/10' // Weekend specific bg
                                                : 'bg-white dark:bg-slate-900/50')
                                        : 'bg-white dark:bg-slate-900/50';

                                    const textClass = isCurrentMonth
                                        ? (isToday
                                            ? 'bg-blue-600 text-white shadow-md shadow-blue-200 dark:shadow-none'
                                            : isWeekend
                                                ? 'text-red-500 dark:text-red-400'
                                                : 'text-slate-700 dark:text-slate-300')
                                        : 'text-slate-300 dark:text-slate-600';

                                    // Calc visible events based on space (heuristic: 3-4 max usually fits)
                                    // With 1fr rows, space depends on screen. Let's try to fit 3 + indicator.
                                    const visibleEvents = dateEvents.filter((event, index, self) =>
                                        index === self.findIndex((t) => (
                                            t.event_index === event.event_index &&
                                            t.course === event.course
                                            // We filter by course name mainly to avoid duplicates visuals
                                        ))
                                    ).slice(0, 3);
                                    const moreCount = dateEvents.length > visibleEvents.length ? dateEvents.length - visibleEvents.length : 0;

                                    return (
                                        <div
                                            key={`${weekIndex}-${dayIndex}`}
                                            onClick={() => onDayClick(cellDate)}
                                            className={`
                                                relative flex flex-col p-1 border-b border-r border-slate-100 dark:border-slate-800
                                                transition-colors duration-200 cursor-pointer group min-h-0
                                                ${bgClass}
                                                ${!isCurrentMonth ? 'hover:bg-slate-50 dark:hover:bg-slate-800/50' : isWeekend ? 'hover:bg-red-50 dark:hover:bg-red-900/20' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'}
                                            `}
                                        >
                                            {/* Day Header */}
                                            <div className="flex items-start justify-between mb-1">
                                                <span className={`
                                                    text-[10px] font-semibold w-5 h-5 flex items-center justify-center rounded-full transition-all
                                                    ${isToday
                                                        ? 'bg-blue-600 text-white shadow-md shadow-blue-200 dark:shadow-none'
                                                        : isCurrentMonth
                                                            ? 'text-slate-700 dark:text-slate-300 group-hover:bg-white dark:group-hover:bg-slate-700'
                                                            : 'text-slate-300 dark:text-slate-600'
                                                    }
                                                 `}>
                                                    {dayNumber}
                                                </span>

                                                {dateEvents.length > 0 && isCurrentMonth && (
                                                    <div className="flex gap-0.5">
                                                        {/* Tiny dots distribution by type */}
                                                        {dateEvents.some(e => e.type.includes('Лек')) && <div className="w-1 h-1 rounded-full bg-blue-400" />}
                                                        {dateEvents.some(e => e.type.includes('Прак') || e.type.includes('Лаб')) && <div className="w-1 h-1 rounded-full bg-violet-400" />}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Events List */}
                                            <div className={`flex flex-col gap-0.5 flex-1 min-h-0 overflow-hidden ${!isCurrentMonth ? 'opacity-30 grayscale' : ''}`}>
                                                {visibleEvents.map((event, i) => {
                                                    const isLec = event.type.toLowerCase().includes('лек');
                                                    const isLab = event.type.toLowerCase().includes('лаб');
                                                    return (
                                                        <div key={i} className={`
                                                            text-[9px] px-1 py-[1px] rounded-[3px] font-medium truncate leading-tight border
                                                            ${isLec
                                                                ? 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800/50'
                                                                : isLab
                                                                    ? 'bg-orange-50 text-orange-700 border-orange-100 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800/50'
                                                                    : 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800/50'}
                                                        `}>
                                                            {event.course}
                                                        </div>
                                                    )
                                                })}
                                                {moreCount > 0 && (
                                                    <div className="text-[8px] text-slate-400 font-medium pl-0.5 mt-auto">
                                                        +{moreCount} еще
                                                    </div>
                                                )}
                                            </div>
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
};

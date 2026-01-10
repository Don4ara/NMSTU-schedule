
import React from 'react';
import { Loader2 } from 'lucide-react';
import { Event as ScheduleEvent } from '@/entities/schedule/model/types';
import { getWeekParity } from '@/features/schedule-viewer/lib/schedule-utils';

interface CalendarGridProps {
    loading: boolean;
    startDay: number; // 0-6 (Mon-Sun in our adjusted logic)
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
    // Check "today" relative to system time
    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center h-full">
                <Loader2 className="animate-spin text-blue-600" size={40} />
            </div>
        );
    }

    // Helper to get week parity for a specific row's start date
    const getRowParity = (weekIndex: number) => {
        // Calculate the Monday of this week row
        // gridIndex 0 corresponds to: Date(currentYear, currentMonth, 1 - startDay)
        const gridStartIndex = weekIndex * 7;
        const dayOffset = gridStartIndex - startDay + 1;
        const date = new Date(currentYear, currentMonth, dayOffset);
        return getWeekParity(date);
    };

    // Fix to 6 rows (42 days)
    const weeks = 6;

    return (
        <div className="flex-1 mt-6 h-full flex flex-col min-h-0">
            <div
                className={`grid grid-cols-[30px_repeat(7,1fr)] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm dark:bg-slate-900 flex-1 relative transition-opacity duration-300 ${isUpdating ? 'opacity-70 pointer-events-none' : 'opacity-100'}`}
                style={{ gridTemplateRows: `auto repeat(${weeks}, minmax(0, 1fr))` }}
            >
                {/* Loader Overlay */}
                {isUpdating && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/20 dark:bg-black/10 backdrop-blur-[1px]">
                        <Loader2 className="animate-spin text-blue-600/50" size={32} />
                    </div>
                )}

                {/* Header Row */}
                <div className="bg-slate-50 dark:bg-slate-800 border-b border-r border-slate-100 dark:border-slate-700"></div>
                {WEEKDAYS.map((day, index) => (
                    <div
                        key={day}
                        className={`bg-slate-50 dark:bg-slate-800 py-3 text-center text-xs font-semibold uppercase tracking-widest border-b border-slate-100 dark:border-slate-700 
                            ${index !== 6 ? 'border-r border-slate-100 dark:border-slate-700' : ''}
                            ${index >= 5 ? 'text-red-400 dark:text-red-500' : 'text-slate-500 dark:text-slate-400'}
                        `}
                    >
                        {day}
                    </div>
                ))}

                {/* Grid Content: Render explicitly by Rows/Weeks */}
                {Array.from({ length: weeks }).map((_, weekIndex) => {
                    const parity = getRowParity(weekIndex);
                    const isOdd = parity === 'Нечетная';
                    const parityColor = isOdd
                        ? 'text-blue-400 bg-blue-50/30 dark:bg-blue-900/10'
                        : 'text-orange-400 bg-orange-50/30 dark:bg-orange-900/10';

                    return (
                        <React.Fragment key={weekIndex}>
                            {/* Week Indicator Column */}
                            <div className={`
                                border-b border-r border-slate-100 dark:border-slate-700 flex items-center justify-center
                                relative overflow-hidden group
                                ${parityColor}
                            `}>
                                <span className={`
                                    absolute whitespace-nowrap text-[9px] font-bold uppercase tracking-widest
                                    -rotate-90 transform opacity-60 group-hover:opacity-100 transition-opacity
                                `}>
                                    {isOdd ? 'Нечет' : 'Чет'}
                                </span>
                            </div>

                            {/* 7 Days of the week */}
                            {Array.from({ length: 7 }).map((_, dayIndex) => {
                                // Calculate date for this cell
                                const cellIndex = weekIndex * 7 + dayIndex;
                                const dayOffset = cellIndex - startDay + 1;
                                const cellDate = new Date(currentYear, currentMonth, dayOffset);

                                const isCurrentMonth = cellDate.getMonth() === currentMonth;
                                const dayNumber = cellDate.getDate();

                                const dateEvents = getEventsForDate(cellDate);
                                const distinctEvents = dateEvents.filter((event, index, self) =>
                                    index === self.findIndex((t) => (
                                        t.event_index === event.event_index &&
                                        t.course === event.course &&
                                        t.type === event.type
                                    ))
                                ).slice(0, 4);

                                const isToday = cellDate.getFullYear() === todayYear &&
                                    cellDate.getMonth() === todayMonth &&
                                    cellDate.getDate() === todayDate;

                                const isWeekend = dayIndex >= 5;
                                const isLastInRow = dayIndex === 6;

                                // Styles for adjacent month days
                                const bgClass = isCurrentMonth
                                    ? (isToday ? 'bg-blue-50/30 dark:bg-blue-900/10' : isWeekend ? 'bg-slate-50/20 dark:bg-slate-900/30' : 'bg-white dark:bg-slate-900')
                                    : 'bg-slate-50/40 dark:bg-slate-900/20 text-slate-400 dark:text-slate-600';

                                const textClass = isCurrentMonth
                                    ? (isToday ? 'bg-blue-600 text-white shadow-md shadow-blue-200 dark:shadow-blue-900' : isWeekend ? 'text-red-400 dark:text-red-500' : 'text-slate-600 dark:text-slate-400')
                                    : 'text-slate-300 dark:text-slate-700';

                                return (
                                    <div
                                        key={`${weekIndex}-${dayIndex}`}
                                        onClick={() => onDayClick(cellDate)}
                                        className={`
                                            min-h-0 h-full p-1.5 flex flex-col group transition-all duration-200 relative
                                            border-b border-slate-200/60 dark:border-slate-800 ${!isLastInRow ? 'border-r dark:border-slate-800' : ''}
                                            hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer
                                            ${bgClass}
                                        `}
                                    >
                                        {/* Day Number */}
                                        <div className="flex justify-end mb-1">
                                            <span className={`
                                                text-[11px] font-semibold w-6 h-6 flex items-center justify-center rounded-full transition-all
                                                ${textClass}
                                            `}>
                                                {dayNumber}
                                            </span>
                                        </div>

                                        {/* Events Stack */}
                                        <div className={`flex flex-col gap-0.5 overflow-hidden ${!isCurrentMonth ? 'opacity-50 grayscale' : ''}`}>
                                            {distinctEvents.map((event, idx) => {
                                                const isLecture = event.type.toLowerCase().includes('лек');
                                                const isLab = event.type.toLowerCase().includes('лаб');
                                                const colorClass = isLecture
                                                    ? 'bg-blue-100/80 text-blue-700 border-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-800'
                                                    : isLab
                                                        ? 'bg-orange-100/80 text-orange-700 border-orange-200 dark:bg-orange-900/40 dark:text-orange-300 dark:border-orange-800'
                                                        : 'bg-emerald-100/80 text-emerald-700 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-800';

                                                return (
                                                    <div
                                                        key={idx}
                                                        className={`
                                                            px-1 py-[1px] rounded-[3px] text-[9px] font-medium border
                                                            truncate leading-tight transition-transform hover:scale-[1.02]
                                                            ${colorClass}
                                                        `}
                                                    >
                                                        {event.course}
                                                    </div>
                                                );
                                            })}

                                            {distinctEvents.length < dateEvents.filter((event, index, self) => index === self.findIndex((t) => (t.event_index === event.event_index && t.course === event.course && t.type === event.type))).length && (
                                                <div className="text-[9px] font-semibold text-slate-400 pl-1 mt-0.5">
                                                    +{dateEvents.length - 4}
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
        </div>
    );
};

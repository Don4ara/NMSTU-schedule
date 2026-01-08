
import React from 'react';
import { Loader2 } from 'lucide-react';
import { Event as ScheduleEvent } from '@/entities/schedule/model/types';

interface CalendarGridProps {
    loading: boolean;
    daysInMonth: number;
    startDay: number; // 0-6 (Mon-Sun in our adjusted logic)
    currentMonth: number;
    currentYear: number;
    getEventsForDate: (date: number) => ScheduleEvent[];
    onDayClick: (day: number) => void;
    isUpdating?: boolean;
}

const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export const CalendarGrid: React.FC<CalendarGridProps> = ({
    loading,
    daysInMonth,
    startDay,
    currentMonth,
    currentYear,
    getEventsForDate,
    onDayClick,
    isUpdating = false
}) => {
    // console.log('CalendarGrid: render');
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const empties = Array.from({ length: startDay }, (_, i) => i);

    // Calculate number of weeks needed
    const totalSlots = startDay + daysInMonth;
    const weeks = Math.ceil(totalSlots / 7);

    // Check "today" relative to system time
    const today = new Date();
    const isSameMonth = today.getMonth() === currentMonth && today.getFullYear() === currentYear;
    const todayDate = today.getDate();

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center h-full">
                <Loader2 className="animate-spin text-blue-600" size={40} />
            </div>
        );
    }

    return (
        <div className="flex-1 mt-6 h-full flex flex-col min-h-0">
            <div
                className={`grid grid-cols-7 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm dark:bg-slate-900 flex-1 relative transition-opacity duration-300 ${isUpdating ? 'opacity-70 pointer-events-none' : 'opacity-100'}`}
                style={{ gridTemplateRows: `auto repeat(${weeks}, minmax(0, 1fr))` }}
            >
                {/* Loader Overlay for non-blocking updates */}
                {isUpdating && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/20 dark:bg-black/10 backdrop-blur-[1px]">
                        <Loader2 className="animate-spin text-blue-600/50" size={32} />
                    </div>
                )}

                {/* Weekday Headers */}
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

                {empties.map((i) => {
                    const colIndex = i % 7;
                    const isWeekend = colIndex >= 5;

                    return (
                        <div
                            key={`empty-${i}`}
                            className={`
                min-h-[100px] h-full 
                border-b border-r border-slate-200/60 dark:border-slate-800/50
                transition-colors duration-200
                ${isWeekend
                                    ? 'bg-white dark:bg-slate-900/40'
                                    : 'bg-white dark:bg-slate-950'
                                }
            `}
                        />
                    );
                })}

                {/* Days */}
                {days.map(day => {
                    const dateEvents = getEventsForDate(day);
                    const distinctEvents = dateEvents.filter((event, index, self) =>
                        index === self.findIndex((t) => (
                            t.event_index === event.event_index &&
                            t.course === event.course &&
                            t.type === event.type
                        ))
                    ).slice(0, 4);

                    const isToday = isSameMonth && day === todayDate;

                    // Determine grid placement
                    const gridIndex = startDay + day - 1;
                    const colIndex = gridIndex % 7;
                    const isLastInRow = (colIndex + 1) % 7 === 0;
                    const isWeekend = colIndex >= 5;

                    return (
                        <div
                            key={day}
                            onClick={() => onDayClick(day)}
                            className={`
                                min-h-0 h-full p-2 flex flex-col group transition-all duration-200 relative
                                border-b border-slate-100 dark:border-slate-700 ${!isLastInRow ? 'border-r dark:border-slate-700' : ''}
                                hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer
                                ${isToday ? 'bg-blue-50/10 dark:bg-blue-900/20 dark:bg-blue-50/10' : isWeekend ? 'dark:bg-slate-800/40' : 'bg-white dark:bg-slate-900'}
                            `}
                        >
                            {/* Day Number */}
                            <div className="flex justify-end mb-1">
                                <span className={`
                                    text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full transition-colors
                                    ${isToday
                                        ? 'bg-blue-600 text-white shadow-md shadow-blue-200 dark:shadow-blue-900'
                                        : isWeekend ? 'text-red-400 dark:text-red-500 group-hover:bg-red-50 dark:group-hover:bg-red-900/20' : 'text-slate-700 dark:text-slate-300 group-hover:bg-slate-200/70 dark:group-hover:bg-slate-700'}
                                `}>
                                    {day}
                                </span>
                            </div>

                            {/* Events Stack */}
                            <div className="flex flex-col gap-1 overflow-hidden">
                                {distinctEvents.map((event, idx) => {
                                    const isLecture = event.type.toLowerCase().includes('лек');
                                    const isLab = event.type.toLowerCase().includes('лаб');
                                    const colorClass = isLecture
                                        ? 'bg-blue-100 text-blue-700 border-blue-200'
                                        : isLab
                                            ? 'bg-orange-100 text-orange-700 border-orange-200'
                                            : 'bg-emerald-100 text-emerald-700 border-emerald-200';

                                    return (
                                        <div
                                            key={idx}
                                            className={`
                                                px-1.5 py-0.5 rounded text-[10px] font-medium border
                                                truncate leading-tight transition-transform hover:scale-[1.02]
                                                ${colorClass}
                                            `}
                                        >
                                            {event.course}
                                        </div>
                                    );
                                })}

                                {distinctEvents.length < dateEvents.filter((event, index, self) => index === self.findIndex((t) => (t.event_index === event.event_index && t.course === event.course && t.type === event.type))).length && (
                                    <div className="text-[9px] font-semibold text-slate-400 pl-1">
                                        + еще {dateEvents.length - 4}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

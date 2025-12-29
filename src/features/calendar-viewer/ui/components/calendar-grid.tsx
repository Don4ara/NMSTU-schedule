
import React from 'react';
import { Loader2 } from 'lucide-react';
import { Event as ScheduleEvent } from '@/entities/schedule/model/types';

interface CalendarGridProps {
    loading: boolean;
    daysInMonth: number;
    startDay: number; // 0-6 (Mon-Sun in our adjusted logic)
    currentDay: number;
    currentMonth: number;
    currentYear: number;
    getEventsForDate: (date: number) => ScheduleEvent[];
    onDayClick: (day: number) => void;
}

const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export const CalendarGrid: React.FC<CalendarGridProps> = ({
    loading,
    daysInMonth,
    startDay,
    currentMonth,
    currentYear,
    getEventsForDate,
    onDayClick
}) => {
    console.log('CalendarGrid: render');
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const empties = Array.from({ length: startDay }, (_, i) => i);

    // Check "today" relative to system time
    const today = new Date();
    const isSameMonth = today.getMonth() === currentMonth && today.getFullYear() === currentYear;
    const todayDate = today.getDate();

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <Loader2 className="animate-spin text-blue-500" size={40} />
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="grid grid-cols-7 gap-px bg-slate-200 border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                {/* Weekday Headers */}
                {WEEKDAYS.map(day => (
                    <div key={day} className="bg-slate-50 py-2 text-center text-xs font-semibold text-slate-500 uppercase tracking-wide">
                        {day}
                    </div>
                ))}

                {/* Empty cells */}
                {empties.map(i => (
                    <div key={`empty-${i}`} className="bg-white/40 h-24 md:h-32"></div>
                ))}

                {/* Days */}
                {days.map(day => {
                    const dateEvents = getEventsForDate(day);
                    const distinctEvents = dateEvents.filter((event, index, self) =>
                        index === self.findIndex((t) => (
                            t.event_index === event.event_index &&
                            t.course === event.course &&
                            t.type === event.type
                        ))
                    ).slice(0, 3);

                    const isToday = isSameMonth && day === todayDate;

                    return (
                        <div
                            key={day}
                            onClick={() => onDayClick(day)}
                            className={`bg-white h-24 md:h-32 p-1.5 flex flex-col group hover:bg-slate-50 cursor-pointer transition-colors relative ${isToday ? 'bg-blue-50/30' : ''}`}
                        >
                            <span className={`
                                text-xs font-semibold mb-1 w-6 h-6 flex items-center justify-center rounded-full
                                ${isToday ? 'bg-blue-600 text-white shadow-md' : 'text-slate-700 group-hover:bg-slate-200'}
                            `}>
                                {day}
                            </span>

                            <div className="flex flex-col gap-0.5 overflow-hidden">
                                {distinctEvents.map((event, idx) => (
                                    <div key={idx} className="flex items-center gap-1 px-1 py-0.5 rounded text-[9px] bg-slate-50 border border-slate-100 truncate">
                                        <div className={`w-1 h-1 rounded-full shrink-0 ${event.type.toLowerCase().includes('лек') ? 'bg-blue-400' : event.type.toLowerCase().includes('лаб') ? 'bg-orange-400' : 'bg-emerald-400'}`}></div>
                                        <span className="truncate font-medium text-slate-600 leading-tight">{event.course}</span>
                                    </div>
                                ))}
                                {distinctEvents.length < dateEvents.filter((event, index, self) => index === self.findIndex((t) => (t.event_index === event.event_index && t.course === event.course && t.type === event.type))).length && (
                                    <span className="text-[8px] text-slate-400 pl-1 leading-none">+ еще {dateEvents.length - 3}</span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

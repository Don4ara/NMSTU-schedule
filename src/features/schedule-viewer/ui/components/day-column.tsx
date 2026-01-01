
import React from 'react';
import { BookOpen } from 'lucide-react';
import { Day } from '@/entities/schedule/model/types';
import { isEventActive } from '../../lib/schedule-utils';
import { ScheduleCard } from './schedule-card';

interface DayColumnProps {
    day: Day;
    date: string;
    isGroup: boolean;
}

export const DayColumn: React.FC<DayColumnProps> = ({ day, date, isGroup }) => {
    return (
        <div className="flex flex-col" id={`day-${day.day_id}`}>
            <h3 className="flex items-center justify-between text-sm font-bold text-slate-700 mb-3 px-1">
                <div className="flex items-center gap-2">
                    <div className={`
                    w-2 h-2 rounded-full 
                    ${day.day === 'Понедельник' ? 'bg-indigo-500' :
                            day.day === 'Вторник' ? 'bg-blue-500' :
                                day.day === 'Среда' ? 'bg-sky-500' :
                                    day.day === 'Четверг' ? 'bg-teal-500' :
                                               day.day === 'Пятница' ? 'bg-emerald-500' : 'bg-orange-500'}
                `}></div>
                    {day.day}
                </div>
                <span className="text-slate-400 font-medium text-xs">{date}</span>
            </h3>

            {day.events.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-400 py-6 bg-white rounded-lg border border-dashed border-slate-200">
                    <BookOpen className="mb-2 opacity-20" size={20} />
                    <span className="text-xs font-medium">Нет занятий</span>
                </div>
            ) : (
                <div className="space-y-2">
                    {day.events
                        .filter((event, index, self) =>
                            index === self.findIndex((t) => (
                                t.event_index === event.event_index &&
                                t.course === event.course &&
                                t.type === event.type &&
                                t.subgroup === event.subgroup
                            ))
                        )
                        .map((event, idx) => {
                            const isActive = isEventActive(day.day_id, event.event_index);
                            return (
                                <ScheduleCard
                                    key={idx}
                                    event={event}
                                    isActive={isActive}
                                    isGroup={isGroup}
                                />
                            );
                        })}
                </div>
            )}
        </div>
    );
};

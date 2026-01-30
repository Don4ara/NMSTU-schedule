
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { Day } from '@/entities/schedule/model/types';
import { isEventActive, groupEvents } from '../../lib/schedule-utils';
import { ScheduleCard } from '@/entities/schedule';
import { useSchedule } from '@/app/provider/schedule-provider';

interface DayColumnProps {
    day: Day;
    date: string;
    isGroup: boolean;
}

export const DayColumn = React.memo<DayColumnProps>(({ day, date, isGroup }) => {
    const navigate = useNavigate();
    const { setSelectedEntity } = useSchedule();

    const handleReverseClick = (id: number, name: string, type: 'group' | 'teacher') => {
        setSelectedEntity({
            id,
            name,
            type,
            url: ''
        });
        navigate('/schedule');
    };


    return (
        <div className="flex flex-col" id={`day-${day.day_id}`}>
            <h3 className="flex items-center justify-between text-sm font-bold mb-3 px-1">
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
                <span className="font-bold text-xs">{date}</span>
            </h3>

            {day.events.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center py-6 rounded-lg">
                    <BookOpen className="mb-2 opacity-20" size={20} />
                    <span className="text-xs font-medium">Нет занятий</span>
                </div>
            ) : (
                <div className="space-y-2">
                    {(!isGroup ? groupEvents(day.events) : day.events).map((event, idx) => {
                        const isActive = isEventActive(day.day_id, event.event_index);
                        return (
                            <ScheduleCard
                                key={idx}
                                event={event}
                                isActive={isActive}
                                isGroup={isGroup}
                                onReverseClick={handleReverseClick}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
});

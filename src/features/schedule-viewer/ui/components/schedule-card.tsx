import React from 'react';
import { MapPin, User, Users } from 'lucide-react';
import { Event } from '@/entities/schedule/model/types';
import { getEventTime, getEventTypeColor } from '../../lib/schedule-utils';
import { useSchedule } from '@/app/provider/schedule-provider';

interface ScheduleCardProps {
    event: Event;
    isActive: boolean;
    isGroup: boolean;
}

// Обновленный Card с поддержкой dark mode
const Card = ({ children, className = "", style }: { children: React.ReactNode, className?: string, style?: React.CSSProperties }) => (
    <div className={`bg-white dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-200 ${className}`} style={style}>
        {children}
    </div>
);

const Badge = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold tracking-wide ${className}`}>
        {children}
    </span>
);

export const ScheduleCard = React.memo<ScheduleCardProps>(({ event, isActive, isGroup }) => {
    const { setSelectedEntity, setViewMode } = useSchedule();

    // Определяем цвет левой границы (Hex цвета обычно хорошо смотрятся и в dark, и в light, оставляем как есть)
    const borderColor = getEventTypeColor(event.type).includes('blue') ? '#3b82f6' :
        getEventTypeColor(event.type).includes('orange') ? '#f97316' : '#10b981';

    return (
        <Card
            className={`
                flex flex-col overflow-hidden group border-l-[3px] 
                hover:border-slate-300 dark:hover:border-slate-600 
                transition-all shadow-none hover:shadow-sm 
                ${isActive
                    ? 'ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-900/10' // Активный фон: легкий тинт в dark mode
                    : 'bg-white dark:bg-slate-900'
                }
            `}
            style={{ borderLeftColor: borderColor }}
        >
            <div className="p-2 flex flex-col gap-1.5 relative h-full">
                {/* Header: Time, Type */}
                <div className="flex items-center justify-between gap-2">
                    <span className={`
                        font-mono font-medium px-1 py-0.5 rounded leading-none text-[10px] 
                        ${isActive
                            ? 'bg-purple-200 text-purple-800 dark:bg-purple-500/20 dark:text-purple-300'
                            : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                        }
                    `}>
                        {getEventTime(event.event_index)}
                    </span>

                    {/* Примечание: Если getEventTypeColor возвращает классы типа 'bg-blue-100 text-blue-800', 
                      они могут выглядеть слишком ярко в dark mode. 
                      В идеале, helper-функцию тоже нужно обновить, добавив 'dark:' классы.
                    */}
                    <Badge className={`${getEventTypeColor(event.type)} border dark:border-opacity-20 px-1 py-0 text-[9px] h-4`}>
                        {event.type}
                    </Badge>
                </div>

                {/* Course Name */}
                <h4 className="font-semibold text-slate-900 dark:text-slate-200 text-xs leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {event.course}
                </h4>

                {/* Footer: Location & Teacher */}
                <div className="mt-auto flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1.5 border-t border-slate-50 dark:border-slate-800">
                    <div className="flex items-center gap-1 min-w-0 shrink-0">
                        <MapPin size={12} className="text-slate-400 dark:text-slate-500" />
                        <span className="truncate max-w-[90px] font-medium text-slate-600 dark:text-slate-400">
                            {event.location}
                        </span>
                    </div>

                    <div
                        className="flex items-center gap-1 min-w-0 justify-end cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors group/reverse"
                        onClick={(e) => {
                            e.stopPropagation();
                            if (event.reverse_id) {
                                setSelectedEntity({
                                    id: event.reverse_id,
                                    name: event.reverse,
                                    type: isGroup ? 'teacher' : 'group',
                                    url: ''
                                });
                                setViewMode('schedule');
                            }
                        }}
                        title={`Перейти к расписанию: ${event.reverse}`}
                    >
                        {isGroup
                            ? <User size={12} className="text-slate-400 dark:text-slate-500 group-hover/reverse:text-blue-500 dark:group-hover/reverse:text-blue-400" />
                            : <Users size={12} className="text-slate-400 dark:text-slate-500 group-hover/reverse:text-blue-500 dark:group-hover/reverse:text-blue-400" />
                        }
                        <span className="truncate max-w-[120px] text-right underline decoration-dotted decoration-slate-300 dark:decoration-slate-600 underline-offset-2 group-hover/reverse:decoration-blue-400 dark:group-hover/reverse:decoration-blue-400 font-medium">
                            {event.reverse}
                        </span>
                    </div>
                </div>
            </div>
        </Card>
    );
});
import React from 'react';
import { MapPin, User, Users } from 'lucide-react';
import { Event } from '@/entities/schedule/model/types';
import { getEventTime, getEventTypeColor } from '../../lib/schedule-utils';
import { useSchedule } from '@/app/provider/schedule-provider';
import { Card } from "@/shared/components/ui/card";

interface ScheduleCardProps {
    event: Event;
    isActive: boolean;
    isGroup: boolean;
}

export const ScheduleCard = React.memo<ScheduleCardProps>(({ event, isActive, isGroup }) => {
    const { setSelectedEntity, setViewMode } = useSchedule();

    // Определяем цвета на основе типа события
    const getTypeColors = () => {
        const typeColor = getEventTypeColor(event.type);
        if (typeColor.includes('blue')) {
            return {
                border: '#3b82f6',
                badge: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700',
            };
        }
        if (typeColor.includes('orange')) {
            return {
                border: '#f97316',
                badge: 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700',
            };
        }
        return {
            border: '#10b981',
            badge: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700',
        };
    };

    const colors = getTypeColors();

    return (
        <Card
            className={`
                flex flex-col overflow-hidden group border-l-[3px] p-0 gap-0 rounded-lg
                hover:border-slate-300 dark:hover:border-slate-600 
                transition-all shadow-none hover:shadow-sm 
                ${isActive
                    ? 'ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-900/20'
                    : 'bg-card'
                }
            `}
            style={{ borderLeftColor: colors.border }}
        >
            <div className="p-2 flex flex-col gap-1.5 relative h-full">
                {/* Header: Time, Type */}
                <div className="flex items-center justify-between gap-2">
                    <span className={`
                        font-mono font-medium  px-1.5 py-0.5 rounded leading-none text-[10px] dark:text-white
                        ${isActive
                            ? 'bg-purple-200 text-purple-800 dark:bg-purple-500/30 dark:text-purple-300'
                            : 'bg-muted text-muted-foreground'
                        }
                    `}>
                        {getEventTime(event.event_index)}
                    </span>

                    {/* Цветной Badge с поддержкой темной темы */}
                    <span className={`
                        inline-flex items-center justify-center rounded-full border 
                        px-1.5 py-0 text-[9px] h-4 font-medium
                        ${colors.badge}
                    `}>
                        {event.type}
                    </span>
                </div>

                {/* Course Name */}
                <h4 className="font-semibold text-card-foreground text-xs leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {event.course}
                </h4>

                {/* Footer: Location & Teacher */}
                <div className="mt-auto flex items-center justify-between text-[11px] text-muted-foreground pt-1.5 border-t border-border">
                    <div className="flex items-center gap-1 min-w-0 shrink-0">
                        <MapPin size={12} className="text-muted-foreground" />
                        <span className="truncate max-w-[90px] font-medium dark:text-white">
                            {event.location}
                        </span>
                    </div>

                    <div
                        className="flex items-center gap-1 min-w-0 justify-end cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors group/reverse dark:text-white"
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
                            ? <User size={12} className="text-muted-foreground group-hover/reverse:text-blue-500" />
                            : <Users size={12} className="text-muted-foreground group-hover/reverse:text-blue-500" />
                        }
                        <span className="truncate max-w-[120px] text-right underline decoration-dotted decoration-border underline-offset-2 group-hover/reverse:decoration-blue-400 font-medium">
                            {event.reverse}
                        </span>
                    </div>
                </div>
            </div>
        </Card>
    );
});
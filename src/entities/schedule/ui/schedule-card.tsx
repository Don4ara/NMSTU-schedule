import React from 'react';
import { MapPin, User, Users } from 'lucide-react';
import { Event } from '../model/types';
import { Card } from "@/shared/components/ui/card";

// Note: Helper functions like getEventTime/getScheduleCardTheme are essentially "lib" or "model" helpers. 
// Ideally should be in entities/schedule/lib/ but for now we might import them from where they are or move them.
// To avoid circular dependency hell, let's assume they might be moved to shared/lib or entities/schedule/lib.
// For this step, I will keep imports if they work, or better:
// The `getScheduleCardTheme` is purely visual logic for this entity. It belongs in `entities/schedule/lib`.
// Let's assume for now we still import from features to avoid breaking build, BUT strict FSD forbids entities importing features.
// SO, `getEventTime` and `getScheduleCardTheme` MUST actally be moved to `entities/schedule/lib`.
// I will create them there in the next steps. For now, I'll temporarily duplicate or fix imports after moving utils.
// Actually, I'll update the imports to point to a new location `../lib/schedule-utils` which I will create.

import { getEventTime, getScheduleCardTheme } from '../lib/schedule-utils';

interface ScheduleCardProps {
    event: Event;
    isActive: boolean;
    isGroup: boolean;
    onReverseClick?: (id: number, name: string, type: 'group' | 'teacher') => void;
}

export const ScheduleCard = React.memo<ScheduleCardProps>(({ event, isActive, isGroup, onReverseClick }) => {

    const colors = getScheduleCardTheme(event.type);

    const handleReverseClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (event.reverse_id && onReverseClick) {
            onReverseClick(
                event.reverse_id,
                event.reverse,
                isGroup ? 'teacher' : 'group'
            );
        }
    };

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

                    {/* Цветной Badge */}
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
                        onClick={handleReverseClick}
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

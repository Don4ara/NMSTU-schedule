import React from 'react'
import { MapPin, User, Users } from 'lucide-react'
import { Card } from '@/shared/components/ui/card'
import type { Event } from '../model/types'
import { getEventTime, getScheduleCardTheme } from '../lib/schedule-utils'

interface ScheduleCardProps {
    event: Event
    isActive: boolean
    isGroup: boolean
    onReverseClick?: (id: number, name: string, type: 'group' | 'teacher') => void
}

export const ScheduleCard = React.memo<ScheduleCardProps>(({ event, isActive, isGroup, onReverseClick }) => {
    const colors = getScheduleCardTheme(event.type)

    const handleReverseClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (event.reverse_id && onReverseClick) {
            onReverseClick(
                event.reverse_id,
                event.reverse,
                isGroup ? 'teacher' : 'group'
            )
        }
    }

    return (
        <Card
            className={`
                flex flex-row overflow-hidden group border-l-[3px] p-0 gap-0 rounded-lg
                hover:border-slate-300 dark:hover:border-slate-600 
                transition-all shadow-none hover:shadow-sm 
                ${isActive
                    ? 'ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-900/20'
                    : 'bg-card'
                }
            `}
            style={{ borderLeftColor: colors.border }}
        >
            {/* Left Column: Big Pair Number */}
            <div className={`
                flex flex-col items-center justify-center min-w-[3rem] border-r border-dashed border-slate-100 dark:border-white/5
                ${colors.bg}
            `}>
                <span className={`text-2xl font-black leading-none ${colors.text}`}>
                    {event.event_index}
                </span>
                <span className="text-[9px] font-medium opacity-50 uppercase tracking-tighter">
                    Пара
                </span>
            </div>

            {/* Right Column: Original "Old Design" Content */}
            <div className="flex-1 p-2 flex flex-col gap-1.5 min-w-0">
                {/* Header: Time, Type */}
                <div className="flex items-center justify-between gap-2">
                    <span className="font-mono font-bold rounded text-slate-700 leading-none text-xs dark:text-white">
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
                        <span className="truncate max-w-22.5 font-medium dark:text-white">
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
                        <span className="truncate max-w-30 text-right underline decoration-dotted decoration-border underline-offset-2 group-hover/reverse:decoration-blue-400 font-medium">
                            {event.reverse}
                        </span>
                    </div>
                </div>
            </div>
        </Card>
    )
})

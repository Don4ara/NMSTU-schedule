import React from 'react'
import { MapPin, User, Users } from 'lucide-react'
import { Card } from '@/shared/components/ui/card'
import type { Event, GroupedEvent } from '../model/types'
import { getEventTime, getScheduleCardTheme } from '../lib/schedule-utils'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'

interface ScheduleCardProps {
    event: Event | GroupedEvent
    isActive: boolean
    isGroup: boolean
    onReverseClick?: (id: number, name: string, type: 'group' | 'teacher') => void
}

export const ScheduleCard = React.memo<ScheduleCardProps>(({ event, isActive, isGroup, onReverseClick }) => {
    const colors = getScheduleCardTheme(event.type)
    const groupedEvent = event as GroupedEvent
    const isGrouped = groupedEvent.isGrouped

    const handleReverseClick = (e: React.MouseEvent, reverseId: number, reverseName: string) => {
        e.stopPropagation()
        if (reverseId && onReverseClick) {
            onReverseClick(
                reverseId,
                reverseName,
                isGroup ? 'teacher' : 'group'
            )
        }
    }

    const renderReverseContent = () => (
        <div
            className={`flex items-center gap-1 min-w-0 justify-end cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors group/reverse dark:text-white ${isGrouped ? 'hover:bg-slate-100 dark:hover:bg-slate-800 rounded px-1 -mr-1' : ''}`}
            onClick={(e) => !isGrouped && handleReverseClick(e, event.reverse_id, event.reverse)}
            title={!isGrouped ? `Перейти к расписанию: ${event.reverse}` : 'Выберите группу'}
        >
            {isGroup
                ? <User size={12} className="text-muted-foreground group-hover/reverse:text-blue-500" />
                : <Users size={12} className="text-muted-foreground group-hover/reverse:text-blue-500" />
            }
            <span className={`truncate max-w-30 text-right font-semibold ${!isGrouped ? 'underline decoration-dotted decoration-border underline-offset-2 group-hover/reverse:decoration-blue-400' : ''}`}>
                {event.reverse}
            </span>
        </div>
    );


    return (
        <Card
            className={`
                flex flex-row overflow-hidden group border-l-[3px] p-0 gap-0
                rounded-xl sm:rounded-lg
                transition-all
                sm:shadow-none sm:hover:shadow-sm sm:hover:border-slate-300 sm:dark:hover:border-slate-600
                ${isActive
                    ? 'ring-2 ring-blue-400/70 dark:ring-blue-400/60 bg-gradient-to-br from-blue-50/80 sm:from-blue-50 via-cyan-50/40 to-sky-50/60 dark:from-blue-950/40 dark:via-cyan-950/30 dark:to-sky-950/20 shadow-lg sm:shadow-xl shadow-blue-200/50 sm:shadow-blue-300/60 dark:shadow-blue-900/40 sm:dark:shadow-blue-800/50'
                    : 'bg-card'
                }
            `}
            style={{ borderLeftColor: colors.border }}
        >
            {/* Left Column: Big Pair Number */}
            <div className={`
                flex flex-col items-center justify-center min-w-[3.25rem] sm:min-w-[3rem] border-r border-dashed border-slate-100 dark:border-white/5
                ${colors.bg}
            `}>
                <span className={`text-2xl font-black leading-none ${colors.text}`}>
                    {event.event_index}
                </span>
                <span className="text-[9px] font-medium opacity-50 uppercase tracking-tighter">
                    Пара
                </span>
            </div>

            <div className="flex-1 p-2.5 sm:p-2 flex flex-col gap-1.5 min-w-0">
                <div className="flex items-center justify-between gap-2 overflow-hidden">
                    <span className="font-mono font-bold rounded leading-none text-xs whitespace-nowrap shrink-0 text-foreground/80 sm:text-foreground">
                        {getEventTime(event.event_index)}
                    </span>

                    <span className={`
                        inline-flex items-center justify-center rounded-full border 
                        px-2 sm:px-1.5 py-0.5 sm:py-0 text-[9px] h-[18px] sm:h-4 font-bold sm:font-medium shrink min-w-0
                        ${colors.badge}
                    `}>
                        <span className="truncate sm:font-bold">{event.type}</span>
                    </span>
                </div>

                <h4 className="font-semibold text-card-foreground text-[13px] sm:text-xs leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {event.course}
                </h4>

                {/* Подгруппа */}
                {event.subgroup > 0 && !isGrouped && (
                    <span className="text-[10px] text-muted-foreground/70 font-medium">
                        Подгр. {event.subgroup}
                    </span>
                )}

                <div className="mt-auto flex items-center justify-between text-[11px] text-muted-foreground pt-2 sm:pt-1.5 border-t border-border/60 sm:border-border">
                    <div className="flex items-center gap-1 min-w-0 shrink-0">
                        <MapPin size={12} className="text-muted-foreground/70 sm:text-muted-foreground" />
                        <span className="truncate font-semibold max-w-24 sm:max-w-22.5">
                            {event.location}
                        </span>
                    </div>

                    {isGrouped ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="outline-none h-full flex items-center">{renderReverseContent()}</div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {groupedEvent.originalEvents?.map((origEvent, idx) => (
                                    <DropdownMenuItem
                                        key={idx}
                                        onClick={(e) => handleReverseClick(e, origEvent.reverse_id, origEvent.reverse)}
                                    >
                                        {origEvent.reverse}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        renderReverseContent()
                    )}
                </div>
            </div>
        </Card>
    )
})


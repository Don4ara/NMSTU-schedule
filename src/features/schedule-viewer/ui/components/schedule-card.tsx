
import React from 'react';
import { MapPin, User, Users } from 'lucide-react';
import { Event } from '@/entities/schedule/model/types';
import { getEventTime, getEventTypeColor } from '../../lib/schedule-utils';

interface ScheduleCardProps {
    event: Event;
    isActive: boolean;
    isGroup: boolean;
}

const Card = ({ children, className = "", style }: { children: React.ReactNode, className?: string, style?: React.CSSProperties }) => (
    <div className={`bg-white rounded-xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-200 ${className}`} style={style}>
        {children}
    </div>
);

const Badge = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold tracking-wide ${className}`}>
        {children}
    </span>
);

export const ScheduleCard: React.FC<ScheduleCardProps> = ({ event, isActive, isGroup }) => {
    return (
        <Card
            className={`flex flex-col overflow-hidden group border-l-[3px] hover:border-slate-300 transition-all shadow-none hover:shadow-sm ${isActive ? 'ring-2 ring-purple-500 bg-purple-50' : 'bg-white'}`}
            style={{ borderLeftColor: getEventTypeColor(event.type).includes('blue') ? '#3b82f6' : getEventTypeColor(event.type).includes('orange') ? '#f97316' : '#10b981' }}
        >
            <div className="p-2 flex flex-col gap-1.5 relative h-full">
                {/* Header: Time, Type */}
                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-[10px]">
                        <span className={`font-mono font-medium px-1 py-0.5 rounded leading-none ${isActive ? 'bg-purple-200 text-purple-800' : 'bg-slate-100 text-slate-500'}`}>
                            {getEventTime(event.event_index)}
                        </span>
                        <Badge className={`${getEventTypeColor(event.type)} border px-1 py-0 text-[9px] h-4`}>
                            {event.type}
                        </Badge>
                    </div>
                    {event.subgroup !== 0 && (
                        <span className="text-[9px] text-slate-400 bg-slate-50 border border-slate-100 px-1 py-0.5 rounded leading-none">
                            гр.{event.subgroup}
                        </span>
                    )}
                </div>

                {/* Course Name */}
                <h4 className="font-semibold text-slate-900 text-xs leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                    {event.course}
                </h4>

                {/* Footer: Location & Teacher */}
                <div className="mt-auto flex items-center justify-between text-[10px] text-slate-500 pt-1.5 border-t border-slate-50">
                    <div className="flex items-center gap-1 min-w-0 shrink-0">
                        <MapPin size={10} className="text-slate-400" />
                        <span className="truncate max-w-[80px]">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-1 min-w-0 justify-end">
                        {isGroup ? <User size={10} className="text-slate-400" /> : <Users size={10} className="text-slate-400" />}
                        <span className="truncate max-w-[100px] text-right">{event.reverse}</span>
                    </div>
                </div>
            </div>
        </Card>
    );
};

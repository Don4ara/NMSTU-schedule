
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { Day } from '@/entities/schedule/model/types';
import { getEventStartEnd } from '@/entities/schedule/lib/schedule-utils';
import { isEventActive, groupEvents } from '../../lib/schedule-utils';
import { ScheduleCard } from '@/entities/schedule';
import { useSchedule } from '@/app/provider/schedule-provider';

interface DayColumnProps {
    day: Day;
    date: Date;
    isGroup: boolean;
}

/** «31 августа» вместо «31.08» */
const formatDayDate = (date: Date) =>
    date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });

const formatBreakMinutes = (minutes: number) => {
    if (minutes >= 60) {
        const hours = Math.floor(minutes / 60);
        const rest = minutes % 60;
        return rest > 0 ? `${hours} ч ${rest} мин` : `${hours} ч`;
    }

    const abs = Math.abs(minutes);
    const mod10 = abs % 10;
    const mod100 = abs % 100;

    if (mod10 === 1 && mod100 !== 11) return `${minutes} минута`;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `${minutes} минуты`;
    return `${minutes} минут`;
};

const getBreakMinutes = (currentIndex: number, nextIndex: number) => {
    if (currentIndex === nextIndex) return null;

    const currentTiming = getEventStartEnd(currentIndex);
    const nextTiming = getEventStartEnd(nextIndex);
    if (!currentTiming || !nextTiming) return null;

    const breakMinutes = nextTiming.startMin - currentTiming.endMin;
    return breakMinutes > 0 ? breakMinutes : null;
};

const BreakSeparator = ({ minutes }: { minutes: number }) => {
    const isLongBreak = minutes >= 60;

    return (
        <div className={`flex items-center gap-1.5 px-1 py-0 text-[10px] font-bold uppercase tracking-wider ${isLongBreak ? 'text-amber-600 dark:text-amber-400' : 'text-muted-foreground/70'}`}>
            <div className={`h-px flex-1 border-t border-dashed ${isLongBreak ? 'border-amber-300 dark:border-amber-800' : 'border-border'}`} />
            <span className={`shrink-0 rounded-full bg-background px-1.5 ${isLongBreak ? 'bg-amber-50 text-amber-700 ring-1 ring-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:ring-amber-900/60' : ''}`}>
                {isLongBreak ? `Окно ${formatBreakMinutes(minutes)}` : formatBreakMinutes(minutes)}
            </span>
            <div className={`h-px flex-1 border-t border-dashed ${isLongBreak ? 'border-amber-300 dark:border-amber-800' : 'border-border'}`} />
        </div>
    );
};

const EmptyDay = () => (
    <div className="flex-1 flex flex-col items-center justify-center py-8 rounded-xl border border-dashed border-border/50 bg-muted/10">
        <BookOpen className="mb-2 text-muted-foreground/30" size={24} />
        <span className="text-xs font-medium text-muted-foreground/60">Нет занятий</span>
    </div>
);

export const DayColumn = React.memo<DayColumnProps>(({ day, date, isGroup }) => {
    const navigate = useNavigate();
    const { setSelectedEntity } = useSchedule();

    const handleReverseClick = (id: number, name: string, type: 'group' | 'teacher') => {
        setSelectedEntity({ id, name, type, url: '' });
        navigate('/schedule');
    };

    const events = (!isGroup ? groupEvents(day.events) : [...day.events])
        .sort((a, b) => a.event_index - b.event_index);

    return (
        <div className="flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-300" id={`day-${day.day_id}`}>
            {/* Day header */}
            <div className="flex items-center gap-2.5 mb-3 px-1">
                <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-foreground leading-tight">{day.day}</h3>
                </div>
                <span className="text-xs font-bold text-muted-foreground">{formatDayDate(date)}</span>
            </div>

            {events.length === 0 ? (
                <EmptyDay />
            ) : (
                <div className="space-y-1.5">
                    {events.map((event, idx) => {
                        const isActive = isEventActive(day.day_id, event.event_index, date);
                        const nextEvent = events[idx + 1];
                        const breakMinutes = nextEvent
                            ? getBreakMinutes(event.event_index, nextEvent.event_index)
                            : null;

                        return (
                            <React.Fragment key={`${event.event_index}-${idx}`}>
                                <ScheduleCard
                                    event={event}
                                    isActive={isActive}
                                    isGroup={isGroup}
                                    onReverseClick={handleReverseClick}
                                />
                                {breakMinutes !== null && <BreakSeparator minutes={breakMinutes} />}
                            </React.Fragment>
                        );
                    })}
                </div>
            )}
        </div>
    );
});

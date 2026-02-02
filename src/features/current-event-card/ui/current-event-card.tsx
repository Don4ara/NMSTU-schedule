import { Event as ScheduleEvent } from '@/entities/schedule/model/types';
import { getScheduleCardTheme, getEventTime, EVENT_RANGES } from '@/entities/schedule/lib/schedule-utils';
import { formatDuration } from '@/shared/lib/time-utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { MapPin, User, GraduationCap } from 'lucide-react';

interface CurrentEventCardProps {
    currentEvent?: ScheduleEvent | null;
    nextEvent?: ScheduleEvent | null;
    currentTime: Date;
}

export const CurrentEventCard = ({ currentEvent, nextEvent, currentTime }: CurrentEventCardProps) => {
    const event = currentEvent || nextEvent;

    return (
        <Card
            className={`overflow-hidden border-l-[6px] transition-all duration-300 shadow-sm hover:shadow-md ${event
                ? event.type.toLowerCase().includes('лек') ? 'border-l-blue-500'
                    : event.type.toLowerCase().includes('лаб') ? 'border-l-orange-500'
                        : 'border-l-emerald-500'
                : 'border-l-primary'
                }`}>
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-xl flex items-center gap-2">
                            {currentEvent ? 'Сейчас идет' : nextEvent ? 'Следующая пара' : 'Занятия окончены'}
                            {event && (
                                <span
                                    className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border tracking-wide ${getScheduleCardTheme(event.type).badge}`}>
                                    {event.type}
                                </span>
                            )}
                        </CardTitle>
                        <CardDescription>
                            {currentEvent ? 'Текущее занятие' : nextEvent ? 'Ближайшее событие' : 'На сегодня все'}
                        </CardDescription>
                    </div>
                    <Badge
                        variant={currentEvent ? 'destructive' : nextEvent ? 'secondary' : 'outline'}
                        className={currentEvent ? 'animate-pulse shadow-sm' : ''}>
                        {currentEvent ? 'LIVE' : nextEvent ? 'Ожидание' : 'Отдых'}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="pt-4">
                {event ? (
                    <div className="grid gap-6">
                        <div className="space-y-1">
                            <h2 className="text-3xl font-bold tracking-tight">
                                {event.course}
                            </h2>
                            <div
                                className="flex flex-wrap items-center gap-4 text-muted-foreground">
                                <div
                                    className="flex items-center gap-1.5 bg-secondary/50 px-2.5 py-1 rounded-md text-sm font-medium">
                                    <MapPin className="w-4 h-4 text-red-500 dark:text-red-400" />
                                    {event.location}
                                </div>
                                <div
                                    className="flex items-center gap-1.5 bg-secondary/50 px-2.5 py-1 rounded-md text-sm font-medium">
                                    <User className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                                    {event.reverse}
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground mb-1">Время</p>
                                <div className="text-lg font-mono font-semibold">
                                    {getEventTime(event.event_index)}
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground mb-1">
                                    {currentEvent ? 'До конца' : 'Через'}
                                </p>
                                <div
                                    className={`text-2xl font-mono font-bold ${getScheduleCardTheme(event.type).text}`}>
                                    {(() => {
                                        const range = EVENT_RANGES[event.event_index];
                                        if (!range) return '--:--';

                                        const targetTime = currentEvent ? range[1] : range[0];
                                        const totalSeconds = (targetTime * 60) - (currentTime.getHours() * 3600 + currentTime.getMinutes() * 60 + currentTime.getSeconds());

                                        return formatDuration(totalSeconds);
                                    })()}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div
                        className="py-8 flex flex-col items-center justify-center text-center text-muted-foreground">
                        <GraduationCap className="h-12 w-12 mb-4 opacity-20" />
                        <p className="text-lg font-medium">Пар больше нет</p>
                        <p className="text-sm">Хорошего отдыха и продуктивной подготовки!</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

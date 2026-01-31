import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSchedule } from '@/app/provider/schedule-provider';
import { useQuery } from '@tanstack/react-query';
import { getSchedule, saveOfflineSchedule } from '@/shared/api/timetable';
import {
    getCurrentWeekName,
    getNextEvent,
    groupEvents,
} from '@/features/schedule-viewer/lib/schedule-utils';
import {
    getScheduleCardTheme,
    getEventTime,
    EVENT_RANGES
} from '@/entities/schedule/lib/schedule-utils';
import {
    Loader2,
    MapPin,
    User,
    GraduationCap,
    Calendar,
    Timer,
    ArrowRight,
    CalendarRange
} from 'lucide-react';
import { ScheduleData, Week, Day, Event as ScheduleEvent } from '@/entities/schedule/model/types';
import { Search } from '@/features/search/ui/search';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Button } from "@/shared/components/ui/button.tsx";
import { formatDuration } from '@/shared/lib/time-utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";

export const DashboardWidget = () => {
    const { trackedEntity, setTrackedEntity, setSelectedEntity } = useSchedule();
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);


    const { data: scheduleData, isLoading } = useQuery<ScheduleData | null>({
        queryKey: ['schedule', trackedEntity?.type, trackedEntity?.id],
        queryFn: () => getSchedule(trackedEntity!.type, trackedEntity!.id),
        enabled: !!trackedEntity,
    });

    useEffect(() => {
        if (scheduleData && trackedEntity && String(scheduleData.id) === String(trackedEntity.id)) {
            saveOfflineSchedule(scheduleData);
        }
    }, [scheduleData, trackedEntity]);

    const today = new Date();
    const currentHour = today.getHours();
    const greeting = currentHour < 12 ? 'Доброе утро' : currentHour < 21 ? 'Добрый день' : 'Добрый вечер';

    const dayId = today.getDay() === 0 ? 7 : today.getDay(); // 1-7 Mon-Sun
    const currentWeekName = getCurrentWeekName();

    if (isLoading) {
        return (
            <div className="h-full flex items-center justify-center">
                <Loader2 className="animate-spin text-primary" size={40} />
            </div>
        );
    }

    if (!trackedEntity) {
        return (
            <div
                className="h-full flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500 bg-background">
                <div className="max-w-md w-full flex flex-col items-center">
                    <div className="bg-muted p-4 rounded-full">
                        <GraduationCap size={48} className="text-muted-foreground" />
                    </div>
                    <div className="space-y-2 text-center mt-6">
                        <h1 className="text-3xl font-semibold tracking-tight">
                            Добро пожаловать
                        </h1>
                        <p className="text-muted-foreground">
                            Выберите группу или преподавателя для начала работы
                        </p>
                    </div>
                    <Search
                        placeholder="Поиск..."
                        className="w-full mt-3"
                        onSelectResult={(result) => setTrackedEntity(result)}
                    />
                </div>
            </div>
        );
    }

    let currentEvent: ScheduleEvent | null | undefined = null;
    let nextEvent: ScheduleEvent | null | undefined = null;
    let todayEvents: ScheduleEvent[] = [];

    if (scheduleData?.schedule) {
        const weekData = scheduleData.schedule.find((w: Week) => w.week.toLowerCase() === currentWeekName.toLowerCase());
        const dayData = weekData?.days.find((d: Day) => d.day_id === dayId);

        if (dayData) {
            const rawEvents = dayData.events.filter((event, index, self) =>
                index === self.findIndex((t) => (
                    t.event_index === event.event_index &&
                    t.course === event.course &&
                    t.type === event.type &&
                    t.subgroup === event.subgroup
                ))
            );

            todayEvents = trackedEntity.type === 'teacher'
                ? groupEvents(rawEvents)
                : rawEvents;

            const { current, next } = getNextEvent(todayEvents);
            currentEvent = current;
            nextEvent = next;
        }
    }

    return (
        <div className="h-full flex flex-col overflow-hidden bg-background font-sans">
            <div className="flex-1 overflow-y-auto p-6 flex flex-col justify-center">
                <div className="max-w-5xl w-full mx-auto space-y-6">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">
                                {greeting}, <span className="text-primary">{trackedEntity.name}</span>
                            </h1>
                            <p className="text-muted-foreground flex items-center gap-2 mt-1">
                                <Calendar className="w-4 h-4 text-primary/70" />
                                <span className="capitalize">{format(today, 'd MMMM, EEEE', { locale: ru })}</span>
                                <span className="text-border">•</span>
                                <span>{currentWeekName} неделя</span>
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" asChild
                                className="text-muted-foreground hover:text-primary transition-colors">
                                <Link
                                    to="/schedule"
                                    onClick={() => trackedEntity && setSelectedEntity(trackedEntity)}
                                >
                                    <CalendarRange className="w-5 h-5 mr-2" />
                                    Расписание
                                </Link>
                            </Button>
                            <Button variant="ghost" size="sm" asChild
                                className="text-muted-foreground hover:text-primary transition-colors">
                                <Link to="/calendar">
                                    <Calendar className="w-5 h-5 mr-2" />
                                    Календарь
                                </Link>
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => setTrackedEntity(null)}
                                className="text-muted-foreground hover:text-destructive transition-colors">
                                <ArrowRight className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Left Column */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* Current/Next Event Card */}
                            <Card
                                className={`overflow-hidden border-l-[6px] transition-all duration-300 shadow-sm hover:shadow-md ${(currentEvent || nextEvent)
                                    ? (currentEvent || nextEvent)!.type.toLowerCase().includes('лек') ? 'border-l-blue-500'
                                        : (currentEvent || nextEvent)!.type.toLowerCase().includes('лаб') ? 'border-l-orange-500'
                                            : 'border-l-emerald-500'
                                    : 'border-l-primary'
                                    }`}>
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="text-xl flex items-center gap-2">
                                                {currentEvent ? 'Сейчас идет' : nextEvent ? 'Следующая пара' : 'Занятия окончены'}
                                                {(currentEvent || nextEvent) && (
                                                    <span
                                                        className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border tracking-wide ${getScheduleCardTheme((currentEvent || nextEvent)!.type).badge}`}>
                                                        {(currentEvent || nextEvent)!.type}
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
                                    {currentEvent || nextEvent ? (
                                        <div className="grid gap-6">
                                            <div className="space-y-1">
                                                <h2 className="text-3xl font-bold tracking-tight">
                                                    {(currentEvent || nextEvent)?.course}
                                                </h2>
                                                <div
                                                    className="flex flex-wrap items-center gap-4 text-muted-foreground">
                                                    <div
                                                        className="flex items-center gap-1.5 bg-secondary/50 px-2.5 py-1 rounded-md text-sm font-medium">
                                                        <MapPin className="w-4 h-4 text-red-500 dark:text-red-400" />
                                                        {(currentEvent || nextEvent)?.location}
                                                    </div>
                                                    <div
                                                        className="flex items-center gap-1.5 bg-secondary/50 px-2.5 py-1 rounded-md text-sm font-medium">
                                                        <User className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                                                        {(currentEvent || nextEvent)?.reverse}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-sm font-medium text-muted-foreground mb-1">Время</p>
                                                    <div className="text-lg font-mono font-semibold">
                                                        {getEventTime((currentEvent || nextEvent)!.event_index)}
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-muted-foreground mb-1">
                                                        {currentEvent ? 'До конца' : 'Через'}
                                                    </p>
                                                    <div
                                                        className={`text-2xl font-mono font-bold ${getScheduleCardTheme((currentEvent || nextEvent)!.type).text}`}>
                                                        {(() => {
                                                            const event = currentEvent || nextEvent;
                                                            const range = EVENT_RANGES[event!.event_index];
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
                        </div>

                        {/* Right Column: Timeline */}
                        <div className="lg:col-span-1">
                            <Card className="h-fit flex flex-col shadow-sm">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Timer className="w-5 h-5 text-orange-500" />
                                        Хронология
                                    </CardTitle>
                                    <CardDescription>Расписание на сегодня</CardDescription>
                                </CardHeader>
                                <CardContent className="pr-2">
                                    <div className="space-y-6 relative ml-2">
                                        {/* Vertical Line */}
                                        <div className="absolute left-0 top-2 bottom-2 w-px bg-border"></div>

                                        {todayEvents.length > 0 ? (
                                            todayEvents.map((event, idx) => {
                                                const isCurrent = event === currentEvent;
                                                const isPast = !isCurrent && event.event_index < (currentEvent?.event_index || 999);

                                                return (
                                                    <div key={idx}
                                                        className={`relative pl-6 ${isPast ? 'opacity-50 grayscale transition-all' : 'opacity-100'}`}>
                                                        {/* Dot */}
                                                        <div className={`absolute left-[-4px] top-1.5 h-2.5 w-2.5 rounded-full border-2 z-10 transition-colors
                                                            ${isCurrent
                                                                ? 'border-white dark:border-slate-900 bg-red-500 ring-2 ring-red-500 ring-offset-2'
                                                                : 'border-background bg-slate-300 dark:bg-slate-600'}`}
                                                        />

                                                        <div
                                                            className={`space-y-1 transition-all duration-300 ${isCurrent ? 'scale-[1.02] origin-left' : ''}`}>
                                                            <div
                                                                className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                                                                <span
                                                                    className="font-mono bg-secondary px-1.5 py-0.5 rounded text-foreground">
                                                                    {getEventTime(event.event_index).split(' - ')[0]}
                                                                </span>
                                                                <span
                                                                    className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${getScheduleCardTheme(event.type).badge}`}>
                                                                    {event.type}
                                                                </span>
                                                            </div>
                                                            <p className={`font-semibold text-sm leading-tight ${isCurrent ? 'text-primary' : 'text-foreground'}`}>
                                                                {event.course}
                                                            </p>
                                                            <div
                                                                className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                                                <MapPin size={12}
                                                                    className={isCurrent ? 'text-red-500' : ''} />
                                                                <span className="truncate">{event.location}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <div className="text-center py-8 text-muted-foreground">
                                                <p className="text-sm">Нет занятий</p>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

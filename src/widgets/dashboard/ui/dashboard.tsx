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
    Loader2,
    GraduationCap,
    Calendar,
    ArrowRight,
    CalendarRange
} from 'lucide-react';
import { ScheduleData, Week, Day, Event as ScheduleEvent } from '@/entities/schedule/model/types';
import { Search } from '@/features/search/ui/search';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Button } from "@/shared/components/ui/button.tsx";

import { DailyScheduleTimeline } from '@/features/daily-schedule-timeline';
import { CurrentEventCard } from '@/features/current-event-card';

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
                            <CurrentEventCard
                                currentEvent={currentEvent}
                                nextEvent={nextEvent}
                                currentTime={currentTime}
                            />
                        </div>

                        {/* Right Column: Timeline */}
                        <div className="lg:col-span-1">
                            <DailyScheduleTimeline events={todayEvents} currentEvent={currentEvent} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSchedule } from '@/app/provider/schedule-provider';
import { useQuery } from '@tanstack/react-query';
import { getSchedule, saveOfflineSchedule } from '@/shared/api/timetable';
import {
    getCurrentWeekName,
    getNextEvent,
    getEventTime,
    EVENT_RANGES
} from '@/features/schedule-viewer/lib/schedule-utils';
import { Loader2, MapPin, User, Clock, GraduationCap, LogOut } from 'lucide-react';
import { ScheduleData, Week, Day, Event as ScheduleEvent } from '@/entities/schedule/model/types';
import { Search } from '@/features/search/ui/search';
import { format } from 'date-fns';
import { Button } from "@/shared/components/ui/button.tsx";
import { Separator } from "@/shared/components/ui/separator.tsx";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/components/ui/tooltip.tsx";

export const Dashboard = () => {
    const navigate = useNavigate();
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
                <Loader2 className="animate-spin text-blue-600" size={40} />
            </div>
        );
    }

    if (!trackedEntity) {
        return (
            <div
                className="h-full flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
                <div className="max-w-2xl w-full flex flex-col items-center">
                    <div className="bg-white p-6 rounded-full shadow-sm mb-8 border border-slate-100">
                        <GraduationCap size={64} className="text-blue-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
                        Добро пожаловать
                    </h1>
                    <p className="text-lg text-slate-500 max-w-lg mb-10 leading-relaxed">
                        Найдите свою группу или преподавателя, чтобы начать.
                    </p>
                    <div
                        className="w-full max-w-md relative z-10 scale-110 transform transition-all group focus-within:scale-110">
                        <Search
                            placeholder="Найти группу..."
                            className="w-full"
                            onSelectResult={(result) => setTrackedEntity(result)}
                        />
                    </div>
                </div>
            </div>
        );
    }

    // --- Data Processing & Logic ---
    let currentEvent: ScheduleEvent | null | undefined = null;
    let nextEvent: ScheduleEvent | null | undefined = null;
    let todayEvents: ScheduleEvent[] = [];


    if (scheduleData?.schedule) {
        const weekData = scheduleData.schedule.find((w: Week) => w.week.toLowerCase() === currentWeekName.toLowerCase());
        const dayData = weekData?.days.find((d: Day) => d.day_id === dayId);

        if (dayData) {
            todayEvents = dayData.events;
            const { current, next } = getNextEvent(todayEvents);
            currentEvent = current;
            nextEvent = next;
        }
    }

    // --- Render ---
    return (
        <motion.div
            className="h-full overflow-y-auto p-4 md:p-6 lg:p-8 select-none flex flex-col font-sans text-slate-900"
        >
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-min my-auto">

                {/* 1. Header Area (Full Width) */}
                <div
                    className="lg:col-span-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                            {greeting}, {trackedEntity.name}
                        </h1>
                        <div className="flex items-center gap-2 text-slate-500 mt-1 text-sm font-medium">
                            <span className="capitalize">{today.toLocaleDateString('ru-RU', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long'
                            })}</span>
                            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                            <span>{currentWeekName} неделя</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-1 p-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-colors">
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                                if (trackedEntity) setSelectedEntity(trackedEntity);
                                navigate('/schedule');
                            }}
                            className="px-4 h-9 font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
                        >
                            Расписание
                        </Button>

                        <Separator orientation="vertical" className="h-4 bg-slate-200 dark:bg-slate-700" />

                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => navigate('/calendar')}
                            className="px-4 h-9 font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
                        >
                            Календарь
                        </Button>

                        <Separator orientation="vertical" className="h-4 bg-slate-200 dark:bg-slate-700" />

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setTrackedEntity(null)}
                                        className="h-9 w-9 text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30"
                                    >
                                        <LogOut className="h-[18px] w-[18px]" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent className="dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200">
                                    <p>Выйти</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>

                {/* 2. Left Column (Hero + Clock) */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    {/* Hero Card */}
                    <div
                        className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[320px] group transition-colors">
                        {/* Dynamic Backgrounds */}
                        <div
                            className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-600/10 dark:to-indigo-600/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none opacity-60"></div>
                        <div
                            className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-tr from-emerald-50 to-teal-50 dark:from-emerald-600/10 dark:to-teal-600/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none opacity-60"></div>

                        {currentEvent ? (
                            <>
                                <div className="relative z-10 flex justify-between items-start">
                                    <span
                                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider border border-blue-100 dark:border-blue-800">
                                        <span className="relative flex h-2 w-2">
                                            <span
                                                className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                            <span
                                                className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                        </span>
                                        Сейчас
                                    </span>
                                    <span className="font-mono text-black dark:text-white font-medium">
                                        {getEventTime(currentEvent.event_index)}
                                    </span>
                                </div>

                                <div className="relative z-10 my-auto py-4">
                                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight mb-4">
                                        {currentEvent.course}
                                    </h2>
                                    <div className="flex flex-wrap gap-4 text-slate-600 dark:text-slate-400">
                                        <div
                                            className="flex items-center gap-2 bg-white/60 dark:bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700 backdrop-blur-sm">
                                            <MapPin size={18} className="text-blue-500 dark:text-blue-400" />
                                            <span className="font-medium">{currentEvent.location}</span>
                                        </div>
                                        <div
                                            className="flex items-center gap-2 bg-white/60 dark:bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700 backdrop-blur-sm">
                                            <User size={18} className="text-violet-500 dark:text-violet-400" />
                                            <span className="font-medium">{currentEvent.reverse}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative z-10 mt-auto">
                                    <div
                                        className="flex justify-between text-xs font-medium text-slate-900 dark:text-white mb-1">
                                        <span>До конца пары</span>
                                    </div>
                                    <div
                                        className="text-3xl font-mono font-bold text-blue-600 dark:text-blue-400 tracking-tight">
                                        {(() => {
                                            const range = EVENT_RANGES[currentEvent.event_index];
                                            if (!range) return '--:--';

                                            const totalSeconds = (range[1] * 60) - (currentTime.getHours() * 3600 + currentTime.getMinutes() * 60 + currentTime.getSeconds());

                                            if (totalSeconds <= 0) return '00:00';

                                            const h = Math.floor(totalSeconds / 3600);
                                            const m = Math.floor((totalSeconds % 3600) / 60);
                                            const s = totalSeconds % 60;

                                            if (h > 0) {
                                                return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
                                            }
                                            return `${m}:${s.toString().padStart(2, '0')}`;
                                        })()}
                                    </div>
                                </div>
                            </>
                        ) : nextEvent ? (
                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div className="flex flex-col items-center text-center mt-8">
                                    <div
                                        className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400 flex items-center justify-center mb-6">
                                        <Clock size={32} />
                                    </div>
                                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Следующая
                                        пара</h3>
                                    <p className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-1 max-w-md mx-auto">{nextEvent.course}</p>
                                    <p className="text-slate-500 dark:text-slate-400 mb-2">{nextEvent.location} • {getEventTime(nextEvent.event_index).split(' - ')[0]}</p>
                                </div>

                                <div className="text-center mb-4">
                                    <div className="text-xs font-medium text-slate-400 dark:text-slate-500 mb-1">До
                                        начала
                                    </div>
                                    <div
                                        className="text-3xl font-mono font-bold text-slate-700 dark:text-slate-300 tracking-tight">
                                        {(() => {
                                            const range = EVENT_RANGES[nextEvent.event_index];
                                            if (!range) return '--:--';

                                            const totalSeconds = (range[0] * 60) - (currentTime.getHours() * 3600 + currentTime.getMinutes() * 60 + currentTime.getSeconds());

                                            if (totalSeconds <= 0) return '00:00';

                                            const h = Math.floor(totalSeconds / 3600);
                                            const m = Math.floor((totalSeconds % 3600) / 60);
                                            const s = totalSeconds % 60;

                                            if (h > 0) {
                                                return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
                                            }
                                            return `${m}:${s.toString().padStart(2, '0')}`;
                                        })()}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
                                <div
                                    className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-500 dark:text-emerald-400 flex items-center justify-center mb-6">
                                    <GraduationCap size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Занятия
                                    окончены</h3>
                                <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">Отдыхайте и
                                    набирайтесь сил перед следующим учебным днем!</p>
                            </div>
                        )}
                    </div>

                    {/* Clock */}
                    <div
                        className="bg-slate-900 dark:bg-black rounded-3xl p-6 shadow-sm text-white flex flex-col justify-between relative overflow-hidden h-[160px] border border-slate-800 dark:border-blue-500/20 shrink-0 transition-colors duration-300">
                        {/* Dynamic Glows */}
                        <div
                            className="absolute top-0 right-0 w-40 h-40 bg-blue-500/20 dark:bg-blue-600/30 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                        <div
                            className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 dark:bg-purple-600/20 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none"></div>

                        <div className="relative z-10 text-center my-auto">
                            <div className="text-6xl font-bold tracking-tight font-mono dark:text-blue-50">
                                {format(currentTime, 'HH:mm:ss')}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Timeline / Today's Schedule (Vertical Sidebar) */}
                <div
                    className="lg:col-span-1 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 flex flex-col relative overflow-hidden h-fit">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-lg text-slate-900">Сегодня</h3>
                        <span
                            className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded-full">{todayEvents.length} пар</span>
                    </div>

                    <div className="flex-1 pr-2 custom-scrollbar relative">
                        {/* Линия таймлайна — белая в темной теме */}
                        <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-slate-200 dark:bg-white/20"></div>

                        <div className="space-y-4">
                            {todayEvents.length > 0 ? (
                                todayEvents.map((event, idx) => (
                                    <div key={idx} className="relative pl-10 group">
                                        {/* Точка (индикатор) — центрирована относительно линии */}
                                        <div
                                            className={`absolute left-[10px] top-[22px] w-3 h-3 rounded-full border-2 z-10 transition-all duration-300 
                        ${event === currentEvent
                                                    ? 'bg-blue-500 border-white dark:border-slate-900 ring-4 ring-blue-500/30 scale-125'
                                                    : 'bg-slate-300 dark:bg-white border-white dark:border-slate-900 group-hover:bg-blue-400'}`}
                                        ></div>

                                        {/* Карточка события */}
                                        <div className={`rounded-2xl p-3.5 transition-all duration-300 border
                        ${event === currentEvent
                                                ? 'bg-blue-50/50 dark:bg-blue-900/30 border-blue-100 dark:border-blue-800/50 -ml-2 pl-5'
                                                : 'bg-transparent border-transparent hover:bg-white dark:hover:bg-white/5 hover:border-slate-100 dark:hover:border-white/10'
                                            }`}
                                        >
                                            <div className="flex justify-between items-baseline mb-1.5">
                                                <span className={`text-xs font-bold uppercase tracking-widest ${event.type.toLowerCase().includes('лек') ? 'text-blue-600 dark:text-blue-400' :
                                                    event.type.toLowerCase().includes('лаб') ? 'text-orange-600 dark:text-orange-400' :
                                                        'text-emerald-600 dark:text-emerald-400'
                                                    }`}>
                                                    {event.type}
                                                </span>
                                                <span className="text-xs font-mono font-medium text-black dark:text-white">
                                                    {getEventTime(event.event_index).split(' - ')[0]}
                                                </span>
                                            </div>

                                            <div
                                                className={`text-sm font-bold mb-1 leading-snug ${event === currentEvent ? 'text-blue-900 dark:text-white' : 'text-slate-800 dark:text-slate-100'
                                                    }`}
                                            >
                                                {event.course}
                                            </div>

                                            <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                                                <MapPin size={12} className="opacity-70" />
                                                <span className="truncate">{event.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12 text-slate-400 dark:text-slate-500">
                                    <p className="text-sm font-medium">Нет занятий сегодня</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </motion.div>
    );
};

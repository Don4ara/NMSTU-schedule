import { useEffect, useState } from 'react';
import { useSchedule } from '@/app/provider/schedule-provider';
import { useQuery } from '@tanstack/react-query';
import { getSchedule, saveOfflineSchedule } from '@/shared/api/timetable';
import { getCurrentWeekName, getNextEvent, getEventTime, EVENT_RANGES } from '@/features/schedule-viewer/lib/schedule-utils';
import { Loader2, Calendar as CalendarIcon, MapPin, User, Clock, GraduationCap, LogOut } from 'lucide-react';
import { ScheduleData, Week, Day } from '@/entities/schedule/model/types';
import { Search } from '@/features/search/ui/search';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';
import { ru } from 'date-fns/locale';

export const Dashboard = () => {
    const { trackedEntity, setTrackedEntity, setViewMode, setSelectedEntity } = useSchedule();
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const { data: scheduleData, isLoading } = useQuery<ScheduleData>({
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
    const greeting = currentHour < 12 ? 'Доброе утро' : currentHour < 18 ? 'Добрый день' : 'Добрый вечер';

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
            <div className="h-full flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500 bg-slate-50/50">
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
                    <div className="w-full max-w-md relative z-10 scale-110 transform transition-all group focus-within:scale-110">
                        <div className="bg-white p-2 rounded-xl shadow-lg border border-slate-200/60 ring-4 ring-slate-50">
                            <Search
                                placeholder="Найти группу..."
                                className="w-full"
                                onSelectResult={(result) => setTrackedEntity(result)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // --- Data Processing & Logic ---
    let currentEvent: any = null;
    let nextEvent: any = null;
    let todayEvents: any[] = [];
    const currentDate = new Date();
    const calendarStart = startOfWeek(startOfMonth(currentDate), { weekStartsOn: 1 });
    const calendarEnd = endOfWeek(endOfMonth(currentDate), { weekStartsOn: 1 });
    const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

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
        <div className="h-full overflow-y-auto bg-slate-50/50 p-4 md:p-6 lg:p-8 select-none flex flex-col font-sans text-slate-900">
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-min my-auto">

                {/* 1. Header Area (Full Width) */}
                <div className="lg:col-span-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                            {greeting}, {trackedEntity.name}
                        </h1>
                        <div className="flex items-center gap-2 text-slate-500 mt-1 text-sm font-medium">
                            <span className="capitalize">{today.toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
                            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                            <span>{currentWeekName} неделя</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
                        <button
                            onClick={() => {
                                // Specific logic: When going from Dashboard, show the Tracked Entity
                                if (trackedEntity) setSelectedEntity(trackedEntity);
                                setViewMode('schedule');
                            }}
                            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all"
                        >
                            Расписание
                        </button>
                        <div className="w-px h-4 bg-slate-200"></div>
                        <button
                            onClick={() => setViewMode('calendar')}
                            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all"
                        >
                            Календарь
                        </button>
                        <div className="w-px h-4 bg-slate-200"></div>
                        <button
                            onClick={() => setTrackedEntity(null)}
                            className="px-3 py-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Выйти"
                        >
                            <LogOut size={18} />
                        </button>
                    </div>
                </div>

                {/* 2. Hero Card (Main Focus) - Col Span 2 */}
                <div className="lg:col-span-2 bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[320px] group">
                    {/* Dynamic Backgrounds */}
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none opacity-60"></div>
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-tr from-emerald-50 to-teal-50 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none opacity-60"></div>

                    {currentEvent ? (
                        <>
                            <div className="relative z-10 flex justify-between items-start">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/50 text-blue-700 text-xs font-bold uppercase tracking-wider border border-blue-100">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                    </span>
                                    Сейчас
                                </span>
                                <span className="font-mono text-slate-400 font-medium">
                                    {getEventTime(currentEvent.event_index)}
                                </span>
                            </div>

                            <div className="relative z-10 my-auto py-4">
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
                                    {currentEvent.course}
                                </h2>
                                <div className="flex flex-wrap gap-4 text-slate-600">
                                    <div className="flex items-center gap-2 bg-white/60 px-3 py-1.5 rounded-lg border border-slate-100 backdrop-blur-sm">
                                        <MapPin size={18} className="text-blue-500" />
                                        <span className="font-medium">{currentEvent.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white/60 px-3 py-1.5 rounded-lg border border-slate-100 backdrop-blur-sm">
                                        <User size={18} className="text-violet-500" />
                                        <span className="font-medium">{currentEvent.reverse}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="relative z-10 mt-auto">
                                <div className="flex justify-between text-xs font-medium text-slate-400 mb-1">
                                    <span>До конца пары</span>
                                </div>
                                <div className="text-3xl font-mono font-bold text-blue-600 tracking-tight">
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
                                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center mb-6">
                                    <Clock size={32} />
                                </div>
                                <h3 className="text-xl font-semibold text-slate-900 mb-2">Следующая пара</h3>
                                <p className="text-2xl font-bold text-slate-800 mb-1 max-w-md mx-auto">{nextEvent.course}</p>
                                <p className="text-slate-500 mb-2">{nextEvent.location} • {getEventTime(nextEvent.event_index).split(' - ')[0]}</p>
                            </div>

                            <div className="text-center mb-4">
                                <div className="text-xs font-medium text-slate-400 mb-1">До начала</div>
                                <div className="text-3xl font-mono font-bold text-slate-700 tracking-tight">
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
                            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center mb-6">
                                <GraduationCap size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Занятия окончены</h3>
                            <p className="text-slate-500 max-w-sm mx-auto">Отдыхайте и набирайтесь сил перед следующим учебным днем!</p>
                        </div>
                    )}
                </div>

                {/* 3. Timeline / Today's Schedule (Vertical Sidebar) - Row Span 2 */}
                <div className="lg:col-span-1 lg:row-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 flex flex-col relative overflow-hidden">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-lg text-slate-900">Сегодня</h3>
                        <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded-full">{todayEvents.length} пар</span>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar relative">
                        {/* Timeline Line */}
                        <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-slate-100"></div>

                        <div className="space-y-6">
                            {todayEvents.length > 0 ? (
                                todayEvents.map((event, idx) => (
                                    <div key={idx} className="relative pl-10 group">
                                        {/* Dot */}
                                        <div className={`absolute left-2 top-1.5 w-3 h-3 rounded-full border-2 border-white ring-1 ring-slate-200 z-10 transition-colors ${event === currentEvent ? 'bg-blue-500 ring-blue-300 scale-125' : 'bg-slate-200'}`}></div>

                                        {/* Content */}
                                        <div className={`rounded-xl p-3 transition-all ${event === currentEvent ? 'bg-blue-50/50 -ml-2 pl-4 border border-blue-100' : 'hover:bg-slate-50/50'}`}>
                                            <div className="flex justify-between items-baseline mb-1">
                                                <span className={`text-xs font-bold uppercase tracking-wider ${event.type.includes('Лек') ? 'text-blue-600' : 'text-emerald-600'}`}>{event.type}</span>
                                                <span className="text-xs font-mono text-slate-400">{getEventTime(event.event_index).split(' - ')[0]}</span>
                                            </div>
                                            <div className={`text-sm font-semibold mb-1 leading-snug ${event === currentEvent ? 'text-blue-900' : 'text-slate-800'}`}>
                                                {event.course}
                                            </div>
                                            <div className="text-xs text-slate-500 truncate">
                                                {event.location}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-10 text-slate-400 text-sm">
                                    Нет занятий сегодня
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* 4. Clock & Calendar (Sub-main area) - Col Span 2 split */}
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Digital Clock */}
                    <div className="bg-slate-900 rounded-3xl p-6 shadow-sm text-white flex flex-col justify-between relative overflow-hidden h-[200px] border border-slate-900">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none"></div>

                        <div className="relative z-10 flex justify-between items-start">
                            <span className="text-white/60 font-medium text-sm capitalize">
                                {format(currentTime, 'EEEE, d MMMM', { locale: ru })}
                            </span>
                            <Clock className="text-white/40" size={20} />
                        </div>

                        <div className="relative z-10 text-center my-auto">
                            <div className="text-5xl font-bold tracking-tight font-mono">
                                {format(currentTime, 'HH:mm:ss')}
                            </div>
                        </div>
                    </div>

                    {/* Mini Calendar */}
                    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col h-[200px]">
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-bold text-slate-800 capitalize">
                                {format(currentDate, 'LLLL yyyy', { locale: ru })}
                            </span>
                            <CalendarIcon className="text-slate-400" size={18} />
                        </div>

                        <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2 text-slate-400 font-medium">
                            {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(d => (
                                <div key={d}>{d}</div>
                            ))}
                        </div>

                        <div className="grid grid-cols-7 gap-1 text-center text-xs flex-1">
                            {calendarDays.map((day, i) => {
                                const isCurrentMonth = isSameMonth(day, currentDate);
                                const isTodayDate = isToday(day);
                                return (
                                    <div
                                        key={i}
                                        className={`
                                            flex items-center justify-center rounded-lg h-8 
                                            ${!isCurrentMonth ? 'text-slate-300' : 'text-slate-700'}
                                            ${isTodayDate ? 'bg-blue-600 text-white font-bold shadow-sm' : ''}
                                        `}
                                    >
                                        {format(day, 'd')}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

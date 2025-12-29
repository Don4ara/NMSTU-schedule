import { useEffect, useState } from 'react';
import { useSchedule } from '@/app/provider/schedule-provider';
import { useQuery } from '@tanstack/react-query';
import { getSchedule } from '@/shared/api/timetable';
import { getCurrentWeekName, getNextEvent, getEventTime, getRemainingTime } from '@/features/schedule-viewer/lib/schedule-utils';
import { Loader2, Calendar, MapPin, User, Clock, GraduationCap, LogOut, SearchIcon } from 'lucide-react';
import { ScheduleData, Week, Day } from '@/entities/schedule/model/types';
import { Search } from '@/features/search/ui/search';

export const Dashboard = () => {
    const { trackedEntity, setTrackedEntity, setViewMode } = useSchedule();
    const [, setCurrentTime] = useState(new Date()); // Use state to trigger re-render

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    const { data: scheduleData, isLoading } = useQuery<ScheduleData>({
        queryKey: ['schedule', trackedEntity?.type, trackedEntity?.id], // Explicitly typed
        queryFn: () => getSchedule(trackedEntity!.type, trackedEntity!.id),
        enabled: !!trackedEntity,
    });

    // Compute derived state
    const currentWeekName = getCurrentWeekName();
    const today = new Date();
    const dayId = today.getDay() === 0 ? 7 : today.getDay(); // 1-7 Mon-Sun

    if (isLoading) {
        return (
            <div className="h-full flex items-center justify-center">
                <Loader2 className="animate-spin text-blue-500" size={32} />
            </div>
        );
    }

    let currentEvent: any = null;
    let nextEvent: any = null;
    let todayEvents: any[] = [];

    if (scheduleData?.schedule) {
        const weekData = scheduleData.schedule.find((w: Week) => w.week.toLowerCase() === currentWeekName.toLowerCase());
        const dayData = weekData?.days.find((d: Day) => d.day_id === dayId);
        if (dayData) {
            todayEvents = dayData.events;
            const { current, next } = getNextEvent(todayEvents); // Removed unused arg
            currentEvent = current;
            nextEvent = next;
        }
    }

    if (!trackedEntity) {
        return (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500 bg-slate-50/50">
                <div className="max-w-2xl w-full flex flex-col items-center">
                    <div className="bg-white p-6 rounded-full shadow-sm mb-8 border border-slate-100">
                        <GraduationCap size={64} className="text-blue-600" />
                    </div>

                    <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
                        Добро пожаловать в менеджер расписания
                    </h1>
                    <p className="text-lg text-slate-500 max-w-lg mb-10 leading-relaxed">
                        Чтобы начать отслеживать свои занятия, найдите свою группу или преподавателя. Мы запомним ваш выбор.
                    </p>

                    <div className="w-full max-w-md relative z-10 scale-110 transform transition-all group focus-within:scale-110">
                        <div className="bg-white p-2 rounded-xl shadow-lg border border-slate-200/60 ring-4 ring-slate-50">
                            <Search
                                placeholder="Найти группу (например, АПИб-23-1)..."
                                className="w-full"
                                onSelectResult={(result) => setTrackedEntity(result)}
                            />
                        </div>
                        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-400">
                            <SearchIcon size={14} />
                            <span>Начните вводить название</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mt-8 opacity-80">
                        <div className="flex flex-col items-center p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600 mb-4">
                                <Clock size={20} />
                            </div>
                            <h3 className="font-semibold text-slate-900 mb-2">Актуальное расписание</h3>
                            <p className="text-sm text-slate-500">Всегда знайте, какая пара идет сейчас и что будет дальше.</p>
                        </div>
                        <div className="flex flex-col items-center p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 mb-4">
                                <Calendar size={20} />
                            </div>
                            <h3 className="font-semibold text-slate-900 mb-2">Удобный календарь</h3>
                            <p className="text-sm text-slate-500">Планируйте свое время, просматривая расписание на весь месяц.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full overflow-y-auto bg-slate-50/50 p-6 md:p-10 select-none">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div>
                    <div className="text-sm font-medium text-slate-400 mb-1 uppercase tracking-wider">
                        {currentWeekName} неделя
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                        {today.toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </h1>
                    <div className="mt-2 flex items-center gap-2 text-slate-500 bg-white/60 px-3 py-1.5 rounded-full w-fit border border-slate-200/50 backdrop-blur-sm">
                        <User size={14} />
                        <span className="font-medium text-sm">{trackedEntity.name}</span>
                    </div>
                </div>

                <div className="flex gap-3 items-center">
                    <button
                        onClick={() => setViewMode('schedule')}
                        className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
                    >
                        К расписанию
                    </button>
                    <button
                        onClick={() => setViewMode('calendar')}
                        className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
                    >
                        Открыть календарь
                    </button>

                    <button
                        onClick={() => setTrackedEntity(null)}
                        className="p-2 bg-white border border-slate-200 text-red-500 rounded-lg hover:bg-red-50 hover:border-red-200 transition-all shadow-sm ml-2"
                        title="Перестать отслеживать"
                    >
                        <LogOut size={20} />
                    </button>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Current / Next Class Card - Hero */}
                <div className="col-span-1 md:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-32 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                                {currentEvent ? (
                                    <>
                                        <span className="relative flex h-3 w-3">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                                        </span>
                                        Идет занятие
                                    </>
                                ) : nextEvent ? (
                                    <>
                                        <Clock size={18} className="text-blue-500" />
                                        Следующее занятие
                                    </>
                                ) : (
                                    <>
                                        <Clock size={18} className="text-slate-400" />
                                        На сегодня всё
                                    </>
                                )}
                            </h2>
                            {nextEvent && (
                                <span className="text-sm font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded">
                                    {getEventTime(nextEvent.event_index).split(' - ')[0]}
                                </span>
                            )}
                        </div>

                        {currentEvent ? (
                            <div className="transform transition-all duration-300">
                                <div className="text-3xl font-bold text-slate-900 mb-2 leading-tight">{currentEvent.course}</div>
                                <div className="flex flex-wrap gap-4 text-slate-600 mb-6">
                                    <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                                        <MapPin size={16} className="text-slate-400" />
                                        <span className="font-medium">{currentEvent.location}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                                        <User size={16} className="text-slate-400" />
                                        <span className="font-medium">{currentEvent.reverse}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 capitalize">
                                        <span className={`w-2 h-2 rounded-full ${getTimeColor(currentEvent.type)}`}></span>
                                        <span className="font-medium">{currentEvent.type}</span>
                                    </div>
                                </div>
                                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-emerald-500 h-full rounded-full w-2/3 animate-pulse"></div>
                                </div>
                                <p className="text-xs text-slate-400 mt-2 text-right">
                                    {(() => {
                                        const remaining = getRemainingTime(currentEvent.event_index);
                                        if (remaining === null) return null;
                                        if (remaining <= 0) return "Пара заканчивается";
                                        if (remaining < 60) return `До конца пары ${remaining} мин`;
                                        return `До конца пары ~${Math.floor(remaining / 60)} ч ${remaining % 60} мин`;
                                    })()}
                                </p>
                            </div>
                        ) : nextEvent ? (
                            <div>
                                <div className="text-2xl font-bold text-slate-900 mb-2">{nextEvent.course}</div>
                                <div className="flex gap-4 text-slate-500">
                                    <span className="flex items-center gap-1.5"><MapPin size={14} /> {nextEvent.location}</span>
                                    <span className="flex items-center gap-1.5"><User size={14} /> {nextEvent.reverse}</span>
                                </div>
                            </div>
                        ) : (
                            <div className="py-8 text-center text-slate-400">
                                <p>Занятий больше нет. Отличный повод отдохнуть!</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Today's Overview or Quick Stats */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm flex flex-col">
                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Сегодня</h3>
                    <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                        {todayEvents.length > 0 ? (
                            todayEvents.map((event, idx) => (
                                <div key={idx} className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${event === currentEvent ? 'bg-emerald-50/50 border-emerald-100' : 'bg-slate-50/50 border-transparent hover:border-slate-200'}`}>
                                    <div className="min-w-[40px] text-xs font-mono text-slate-500 pt-0.5">
                                        {getEventTime(event.event_index).split(' - ')[0]}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className={`font-medium text-sm truncate ${event === currentEvent ? 'text-emerald-900' : 'text-slate-700'}`}>{event.course}</div>
                                        <div className="text-xs text-slate-400 mt-0.5 flex justify-between">
                                            <span>{event.type}</span>
                                            <span>{event.location}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-sm text-slate-400 italic">Выходной день</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer / Quote / Etc */}
            <div className="mt-12 text-center text-slate-300 text-xs">
                Магнитогорский государственный технический университет им. Г.И. Носова
            </div>
        </div>
    );
};

// Helper for color
const getTimeColor = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes('лек')) return 'bg-blue-400';
    if (t.includes('лаб')) return 'bg-orange-400';
    return 'bg-emerald-400';
};

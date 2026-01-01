import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSchedule } from '@/app/provider/schedule-provider';
import { getSchedule, searchTimetable, SearchResult } from '@/shared/api/timetable';
import { Search, Plus, X } from 'lucide-react';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { getDateForDay, getCurrentWeekId, getEventTime } from '@/features/schedule-viewer/lib/schedule-utils';
import { WeekTabs } from '@/features/schedule-viewer/ui/components/week-tabs';
import { ScheduleCard } from '@/features/schedule-viewer/ui/components/schedule-card';

export const ScheduleComparisonPage = () => {
    const { trackedEntity, comparisonEntity, setComparisonEntity } = useSchedule();

    // Local state for the "Primary" (left) side, initialized with the global tracked entity
    const [primaryEntity, setPrimaryEntity] = useState<SearchResult | null>(trackedEntity);

    const [searchQuery, setSearchQuery] = useState('');
    const [searchTarget, setSearchTarget] = useState<'primary' | 'secondary' | null>(null);
    const [activeWeekId, setActiveWeekId] = useState<number>(getCurrentWeekId());

    // Sync primaryEntity with trackedEntity if trackedEntity changes externally or on load
    useEffect(() => {
        if (trackedEntity && !primaryEntity) {
            setPrimaryEntity(trackedEntity);
        }
    }, [trackedEntity]);

    // Search query
    const { data: searchResults = [] } = useQuery({
        queryKey: ['search-comparison', searchQuery],
        queryFn: () => searchTimetable(searchQuery),
        enabled: searchQuery.length > 2,
    });

    // Primary Schedule Query (Left Side)
    const { data: primarySchedule } = useQuery({
        queryKey: ['schedule', primaryEntity?.type, primaryEntity?.id],
        queryFn: () => primaryEntity ? getSchedule(primaryEntity.type, primaryEntity.id) : null,
        enabled: !!primaryEntity,
    });

    // Comparison Schedule Query (Right Side)
    const { data: comparisonSchedule } = useQuery({
        queryKey: ['schedule', comparisonEntity?.type, comparisonEntity?.id],
        queryFn: () => comparisonEntity ? getSchedule(comparisonEntity.type, comparisonEntity.id) : null,
        enabled: !!comparisonEntity,
    });

    const handleSearchSelect = (entity: SearchResult) => {
        if (searchTarget === 'primary') {
            setPrimaryEntity(entity);
        } else {
            setComparisonEntity(entity);
        }
        setSearchQuery('');
        setSearchTarget(null);
    };

    const getDayData = (scheduleData: any, dayId: number) => {
        if (!scheduleData || !scheduleData.schedule) return null;
        const week = scheduleData.schedule.find((w: any) => w.week_id === activeWeekId);
        if (!week) return null;
        return week.days.find((d: any) => d.day_id === dayId);
    };

    const days = [1, 2, 3, 4, 5, 6]; // Monday to Saturday
    const eventIndices = [1, 2, 3, 4, 5, 6, 7]; // Standard pair slots

    // Helper to find event at specific index
    const findEventAt = (events: any[], index: number) => {
        return events?.find((e: any) => e.event_index === index);
    };

    return (
        <div className="h-full flex flex-col p-6 max-w-[1920px] mx-auto w-full relative">
            {/* Header section with Week Selector */}
            <div className="flex items-center justify-end mb-4 shrink-0 z-10">
                {(primarySchedule?.schedule || comparisonSchedule?.schedule) && (
                    <div className="w-56">
                        <WeekTabs
                            weeks={(primarySchedule?.schedule || comparisonSchedule?.schedule)!}
                            activeWeekId={activeWeekId}
                            onWeekChange={setActiveWeekId}
                        />
                    </div>
                )}
            </div>

            {/* Entity Headers (Fixed at top) */}
            <div className="grid grid-cols-[1fr_auto_1fr] gap-4 mb-4 shrink-0 z-30 sticky top-0 bg-white py-2">
                {/* Primary Header (Left) */}
                <div className={`px-6 flex justify-between items-center rounded-xl transition-all ${primaryEntity ? 'bg-white/50 border border-slate-100' : 'mt-0'}`}>
                    {primaryEntity ? (
                        <div className="w-full flex justify-between items-center group py-2">
                            <div className="min-w-0">
                                <span className="text-[10px] font-bold uppercase tracking-wider block mb-1 text-indigo-500/80">
                                    Основное
                                </span>
                                <h2 className="text-lg font-bold text-slate-900 tracking-tight truncate">{primaryEntity.name}</h2>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => setPrimaryEntity(null)} className="h-8 w-8 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors opacity-0 group-hover:opacity-100">
                                <X size={18} />
                            </Button>
                        </div>
                    ) : (
                        <div
                            className="flex items-center gap-3 w-full cursor-pointer hover:bg-slate-100/50 py-2 rounded-xl transition-all"
                            onClick={() => setSearchTarget('primary')}
                        >
                            <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-white flex items-center justify-center text-slate-400 shadow-sm">
                                <Plus size={16} />
                            </div>
                            <span className="text-sm font-semibold text-slate-500">Добавить</span>
                        </div>
                    )}
                </div>

                {/* Gap for timeline */}
                <div className="w-20"></div>

                {/* Comparison Header (Right) */}
                <div className={`px-6 flex justify-between items-center rounded-xl transition-all ${comparisonEntity ? 'bg-white/50 border border-slate-100' : 'mt-0'}`}>
                    {comparisonEntity ? (
                        <div className="w-full flex justify-between items-center group py-2">
                            <div className="min-w-0">
                                <span className="text-[10px] font-bold uppercase tracking-wider block mb-1 text-orange-500/80">
                                    Сравнение
                                </span>
                                <h2 className="text-lg font-bold text-slate-900 tracking-tight truncate">{comparisonEntity.name}</h2>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => setComparisonEntity(null)} className="h-8 w-8 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors opacity-0 group-hover:opacity-100">
                                <X size={18} />
                            </Button>
                        </div>
                    ) : (
                        <div
                            className="flex items-center gap-3 w-full cursor-pointer hover:bg-slate-100/50 py-2 rounded-xl transition-all"
                            onClick={() => setSearchTarget('secondary')}
                        >
                            <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-white flex items-center justify-center text-slate-400 shadow-sm">
                                <Plus size={16} />
                            </div>
                            <span className="text-sm font-semibold text-slate-500">Добавить</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Comparison Content (Scrollable) */}
            <div className="flex-1 overflow-y-auto min-h-0 pr-2 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">


                <div className="space-y-12 pb-20">
                    {days.map(dayId => {
                        const primaryDay = getDayData(primarySchedule, dayId);
                        const comparisonDay = getDayData(comparisonSchedule, dayId);

                        // Calculate Date
                        const refSchedule = primarySchedule?.schedule || comparisonSchedule?.schedule;
                        const weekName = refSchedule?.find((w: any) => w.week_id === activeWeekId)?.week || '';
                        const date = getDateForDay(dayId, weekName);

                        const dayName = date.toLocaleDateString('ru-RU', { weekday: 'long' });
                        const dateNum = date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });

                        // Check if day has any events at all to maybe skip or show empty? 
                        // For comparison, showing a full day grid is usually better for clarity.
                        const hasAnyEvents = (primaryDay?.events?.length > 0) || (comparisonDay?.events?.length > 0);

                        return (
                            <div key={dayId} className="relative">
                                {/* Day Header */}
                                <div className="flex items-center justify-center mb-6 relative">
                                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                        <div className="w-full border-t border-slate-200"></div>
                                    </div>
                                    <div className="relative flex justify-center">
                                        <span className="bg-slate-50 px-4 text-sm text-slate-500 font-medium capitalize flex items-center gap-2 border border-slate-200 rounded-full py-1 shadow-sm">
                                            <span className={`w-2 h-2 rounded-full ${dayId === 1 ? 'bg-indigo-500' :
                                                dayId === 2 ? 'bg-blue-500' :
                                                    dayId === 3 ? 'bg-sky-500' :
                                                        dayId === 4 ? 'bg-teal-500' :
                                                            dayId === 5 ? 'bg-emerald-500' : 'bg-orange-500'
                                                }`}></span>
                                            {dayName}, {dateNum}
                                        </span>
                                    </div>
                                </div>

                                {!hasAnyEvents ? (
                                    <div className="text-center py-8 text-slate-400 text-sm border-2 border-dashed border-slate-100 rounded-2xl bg-white/50">
                                        Нет занятий в этот день
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {eventIndices.map((idx) => {
                                            const pEvent = findEventAt(primaryDay?.events, idx);
                                            const cEvent = findEventAt(comparisonDay?.events, idx);

                                            // Skip row if NOBODY has event at this time?
                                            // Optional: Render empty rows if user prefers dense grid. 
                                            // But skipping empty rows is cleaner for readability unless "gaps" are critical.
                                            // Let's Skip ONLY if both are empty.
                                            if (!pEvent && !cEvent) return null;

                                            const time = getEventTime(idx).split(' - ');
                                            const isIntersection = !!pEvent && !!cEvent;

                                            return (
                                                <div key={idx} className={`grid grid-cols-[1fr_auto_1fr] gap-4 items-stretch group rounded-xl transition-all ${isIntersection ? 'bg-red-50/50 p-2 -mx-2 ring-1 ring-red-100' : ''}`}>
                                                    {/* Primary Event (Left) */}
                                                    <div className="min-h-[80px] flex">
                                                        {pEvent ? (
                                                            <div className="w-full">
                                                                <ScheduleCard
                                                                    event={pEvent}
                                                                    isActive={false}
                                                                    isGroup={primaryEntity?.type === 'group'}
                                                                />
                                                            </div>
                                                        ) : (
                                                            // Empty State Left
                                                            <div className="w-full rounded-xl border border-slate-100 bg-slate-50/30 flex items-center justify-center group-hover:bg-slate-50 transition-colors">
                                                                {/* Dot placeholder */}
                                                                <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Timeline (Center) */}
                                                    <div className="w-20 flex flex-col items-center justify-center text-xs font-mono font-medium text-slate-400 select-none">
                                                        <span className={`transition-colors ${isIntersection ? 'text-red-500 font-bold' : 'group-hover:text-slate-600'}`}>{time[0]}</span>
                                                        <div className={`h-8 w-px my-1 transition-colors ${isIntersection ? 'bg-red-200' : 'bg-slate-200 group-hover:bg-slate-300'}`}></div>
                                                        <span className={`transition-colors ${isIntersection ? 'text-red-500 font-bold' : 'opacity-60 group-hover:text-slate-500'}`}>{time[1]}</span>
                                                    </div>

                                                    {/* Comparison Event (Right) */}
                                                    <div className="min-h-[80px] flex">
                                                        {cEvent ? (
                                                            <div className="w-full">
                                                                <ScheduleCard
                                                                    event={cEvent}
                                                                    isActive={false}
                                                                    isGroup={comparisonEntity?.type === 'group'}
                                                                />
                                                            </div>
                                                        ) : (
                                                            // Empty State Right
                                                            <div className="w-full rounded-xl border border-slate-100 bg-slate-50/30 flex items-center justify-center group-hover:bg-slate-50 transition-colors">
                                                                {/* Dot placeholder */}
                                                                <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Search Modal/Overlay */}
            {searchTarget && (
                <div className="absolute inset-0 z-50 bg-white/60 backdrop-blur-md flex items-start justify-center pt-32 transition-all duration-300">
                    <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden ring-1 ring-slate-900/5 animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-300">
                        <div className="p-4 border-b border-slate-50 flex items-center gap-4">
                            <Search className="text-slate-400" size={22} />
                            <Input
                                autoFocus
                                placeholder={searchTarget === 'primary' ? 'Поиск основного (слева)...' : 'Поиск для сравнения (справа)...'}
                                className="border-none shadow-none focus-visible:ring-0 text-lg px-0 h-auto placeholder:text-slate-300 font-medium"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Button variant="ghost" size="icon" onClick={() => { setSearchTarget(null); setSearchQuery(''); }} className="rounded-full hover:bg-slate-100">
                                <X size={20} />
                            </Button>
                        </div>
                        <div className="max-h-[50vh] overflow-y-auto p-2 scrollbar-hide">
                            {searchResults.map((result) => (
                                <button
                                    key={`${result.type}-${result.id}`}
                                    className="w-full text-left px-5 py-4 rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-between group active:scale-[0.99] duration-200"
                                    onClick={() => handleSearchSelect(result)}
                                >
                                    <span className="font-semibold text-slate-700">{result.name}</span>
                                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-lg ${result.type === 'group' ? 'bg-indigo-50 text-indigo-500' : 'bg-orange-50 text-orange-500'}`}>
                                        {result.type === 'group' ? 'Группа' : 'Преподаватель'}
                                    </span>
                                </button>
                            ))}
                            {searchQuery.length > 2 && searchResults.length === 0 && (
                                <p className="text-center text-slate-400 py-12 text-sm">Ничего не найдено</p>
                            )}
                            {searchQuery.length <= 2 && (
                                <p className="text-center text-slate-400 py-12 text-sm">Введите запрос для поиска...</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

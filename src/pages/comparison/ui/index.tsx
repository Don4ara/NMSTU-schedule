import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSchedule } from '@/app/provider/schedule-provider';
import { getSchedule, SearchResult } from '@/shared/api/timetable';
import { Plus, X } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { getDateForDay, getCurrentWeekId, getEventTime, findEventAt, getWeekDayData } from '@/features/schedule-viewer/lib/schedule-utils';
import { WeekTabs } from '@/features/schedule-viewer/ui/components/week-tabs';
import { ScheduleCard } from '@/features/schedule-viewer/ui/components/schedule-card';
import { Week } from '@/entities/schedule/model/types';

import { ScheduleSearchDialog } from '@/features/search/ui/schedule-search-dialog';


export const ScheduleComparisonPage = () => {
    const { trackedEntity, comparisonEntity, setComparisonEntity } = useSchedule();
    const [primaryEntity, setPrimaryEntity] = useState<SearchResult | null>(trackedEntity);

    const [searchTarget, setSearchTarget] = useState<'primary' | 'secondary' | null>(null);
    const [activeWeekId, setActiveWeekId] = useState<number>(getCurrentWeekId());

    useEffect(() => {
        if (trackedEntity) {
            setPrimaryEntity(trackedEntity);
        }
    }, [trackedEntity]);



    const { data: primarySchedule } = useQuery({
        queryKey: ['schedule', primaryEntity?.type, primaryEntity?.id],
        queryFn: () => primaryEntity ? getSchedule(primaryEntity.type, primaryEntity.id) : null,
        enabled: !!primaryEntity,
    });

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
        setSearchTarget(null);
    };

    const days = [1, 2, 3, 4, 5, 6];
    const eventIndices = [1, 2, 3, 4, 5, 6, 7];

    return (
        <div className="h-full flex flex-col max-w-[1920px] mx-auto w-full relative">
            {/* Header & Controls */}
            <div className="shrink-0 z-20 sticky top-0 bg-white border-b pt-6">
                <div className="px-8 pb-4 flex items-center justify-between gap-8 max-w-7xl mx-auto w-full">
                    {/* Week Selector */}
                    {(primarySchedule?.schedule || comparisonSchedule?.schedule) ? (
                        <div className="w-64">
                            <WeekTabs
                                weeks={(primarySchedule?.schedule || comparisonSchedule?.schedule)!}
                                activeWeekId={activeWeekId}
                                onWeekChange={setActiveWeekId}
                            />
                        </div>
                    ) : <div className="w-64" />}

                    {/* Entity Headers Grid */}
                    <div className="flex-1 grid grid-cols-2 gap-12 items-center">
                        {/* Primary (Left) */}
                        <div className="flex items-center gap-4 min-w-0">
                            {primaryEntity ? (
                                <div className="flex-1 flex items-center justify-between bg-indigo-50/50 dark:bg-indigo-900/10 px-4 py-2 rounded-xl border border-indigo-100 dark:border-indigo-900/30">
                                    <div className="min-w-0">
                                        <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 mb-0.5">Основное</div>
                                        <div className="font-bold text-slate-900 dark:text-slate-100 truncate">{primaryEntity.name}</div>
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => setPrimaryEntity(null)} className="h-7 w-7 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                                        <X size={14} />
                                    </Button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setSearchTarget('primary')}
                                    className="flex-1 flex items-center gap-3 px-4 py-2 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10 transition-all group"
                                >
                                    <Plus size={18} className="text-slate-400 group-hover:text-indigo-500" />
                                    <span className="text-sm font-medium text-slate-500 group-hover:text-indigo-600 dark:text-slate-400 dark:group-hover:text-indigo-400">Выбрать</span>
                                </button>
                            )}
                        </div>

                        {/* Comparison (Right) */}
                        <div className="flex items-center gap-4 min-w-0">
                            {comparisonEntity ? (
                                <div className="flex-1 flex items-center justify-between bg-orange-50/50 dark:bg-orange-900/10 px-4 py-2 rounded-xl border border-orange-100 dark:border-orange-900/30">
                                    <div className="min-w-0">
                                        <div className="text-[10px] font-bold uppercase tracking-wider text-orange-500 mb-0.5">Сравнение</div>
                                        <div className="font-bold text-slate-900 dark:text-slate-100 truncate">{comparisonEntity.name}</div>
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => setComparisonEntity(null)} className="h-7 w-7 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                                        <X size={14} />
                                    </Button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setSearchTarget('secondary')}
                                    className="flex-1 flex items-center gap-3 px-4 py-2 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-orange-300 dark:hover:border-orange-700 hover:bg-orange-50/30 dark:hover:bg-orange-900/10 transition-all group"
                                >
                                    <Plus size={18} className="text-slate-400 group-hover:text-orange-500" />
                                    <span className="text-sm font-medium text-slate-500 group-hover:text-orange-600 dark:text-slate-400 dark:group-hover:text-orange-400">Сравнить</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Content (Scrollable) */}
            <div className="flex-1 overflow-y-auto px-8 pt-12 pb-20 max-w-7xl mx-auto w-full">
                <div className="space-y-16 pb-20">
                    {days.map(dayId => {
                        const primaryDay = getWeekDayData(primarySchedule, activeWeekId, dayId);
                        const comparisonDay = getWeekDayData(comparisonSchedule, activeWeekId, dayId);

                        const refSchedule = primarySchedule?.schedule || comparisonSchedule?.schedule;
                        const weekName = refSchedule?.find((w: Week) => w.week_id === activeWeekId)?.week || '';
                        const date = getDateForDay(dayId, weekName);

                        const dayName = date.toLocaleDateString('ru-RU', { weekday: 'long' });
                        const dateNum = date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });

                        const hasEvents = (primaryDay?.events?.length ?? 0) > 0 || (comparisonDay?.events?.length ?? 0) > 0;

                        if (!hasEvents) return null; // Clean look: skip empty days

                        return (
                            <div key={dayId} className="relative">
                                {/* Subtle Day Divider */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div className={`px-4 py-1.5 rounded-xl text-lg font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 capitalize shadow-sm`}>
                                        {dayName}
                                    </div>
                                    <div className="text-base text-slate-400 font-medium">{dateNum}</div>
                                    <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800"></div>
                                </div>

                                <div className="space-y-1">
                                    {eventIndices.map((idx) => {
                                        const pEvent = findEventAt(primaryDay?.events, idx);
                                        const cEvent = findEventAt(comparisonDay?.events, idx);

                                        if (!pEvent && !cEvent) return null; // Compact mode

                                        const time = getEventTime(idx).split(' - ');
                                        const isTimeOverlap = !!pEvent && !!cEvent;

                                        const isDirectRelation = (String(pEvent?.reverse_id) === String(comparisonEntity?.id)) || (String(cEvent?.reverse_id) === String(primaryEntity?.id));
                                        const isSameCourse = pEvent?.course === cEvent?.course;
                                        const isIntersection = isTimeOverlap && (isDirectRelation || isSameCourse);

                                        return (
                                            <div key={idx} className={`
                                                group grid grid-cols-[1fr_80px_1fr] gap-6 items-stretch rounded-xl transition-all duration-300
                                                ${isIntersection
                                                    ? 'bg-gradient-to-r from-indigo-50/50 via-purple-50/50 to-orange-50/50 dark:from-indigo-900/10 dark:via-purple-900/10 dark:to-orange-900/10 ring-1 ring-purple-100 dark:ring-purple-900/30'
                                                    : 'hover:bg-slate-50/50 dark:hover:bg-slate-900/30'}
                                            `}>
                                                {/* Left Event */}
                                                <div className="py-2 pl-2">
                                                    {pEvent ? (
                                                        <ScheduleCard event={pEvent} isActive={false} isGroup={primaryEntity?.type === 'group'} />
                                                    ) : (
                                                        <div className="h-full rounded-lg border border-dashed border-slate-200 dark:border-slate-800 bg-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    )}
                                                </div>

                                                {/* Center Timeline */}
                                                <div className="flex flex-col items-center justify-center relative">
                                                    {/* Vertical Connector Line (Visual only) */}
                                                    <div className="absolute top-0 bottom-0 w-px bg-slate-100 dark:bg-slate-800 -z-10 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors" />

                                                    <div className={`
                                                        w-full text-center py-1 rounded-md text-sm font-bold tracking-tight transition-all z-10
                                                        ${isIntersection ? 'text-purple-600 bg-white/80 dark:bg-slate-900/80 shadow-sm ring-1 ring-purple-100 dark:ring-purple-900/30' : 'text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-400 bg-transparent'}
                                                    `}>
                                                        {time[0]}
                                                    </div>
                                                    <div className={`h-1 w-1 rounded-full my-1 ${isIntersection ? 'bg-purple-400' : 'bg-slate-200 dark:bg-slate-700'}`} />
                                                    <div className={`text-sm font-medium transition-colors ${isIntersection ? 'text-purple-400' : 'text-slate-300 group-hover:text-slate-400 dark:text-slate-600 dark:group-hover:text-slate-500'}`}>
                                                        {time[1]}
                                                    </div>
                                                </div>

                                                {/* Right Event */}
                                                <div className="py-2 pr-2">
                                                    {cEvent ? (
                                                        <ScheduleCard event={cEvent} isActive={false} isGroup={comparisonEntity?.type === 'group'} />
                                                    ) : (
                                                        <div className="h-full rounded-lg border border-dashed border-slate-200 dark:border-slate-800 bg-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Search Dialog */}
                <ScheduleSearchDialog
                    open={!!searchTarget}
                    onOpenChange={(open) => !open && setSearchTarget(null)}
                    title={searchTarget === 'primary' ? "Выберите основное расписание" : "Выберите расписание для сравнения"}
                    onSelect={handleSearchSelect}
                />
            </div>
        </div>
    );
};

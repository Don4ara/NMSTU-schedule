import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useSchedule } from '@/app/provider/schedule-provider';
import { getSchedule, SearchResult } from '@/shared/api/timetable';
import { Plus, X, Zap } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';

import { getDateForDay, getCurrentWeekId, groupEvents } from '@/features/schedule-viewer/lib/schedule-utils';
import { ScheduleCard } from '@/entities/schedule';
import { Week, Event } from '@/entities/schedule/model/types';
import { ScheduleSearchDialog } from '@/features/search/ui/schedule-search-dialog';

export const ScheduleComparisonWidget = () => {
    const navigate = useNavigate();
    const { trackedEntity, comparisonEntity, setComparisonEntity, setSelectedEntity } = useSchedule();
    const [primaryEntity, setPrimaryEntity] = useState<SearchResult | null>(trackedEntity);
    const [searchTarget, setSearchTarget] = useState<'primary' | 'secondary' | null>(null);
    const [activeWeekId, setActiveWeekId] = useState<number>(getCurrentWeekId());

    useEffect(() => {
        if (trackedEntity) setPrimaryEntity(trackedEntity);
    }, [trackedEntity]);

    const handleReverseClick = (id: number, name: string, type: 'group' | 'teacher') => {
        setSelectedEntity({ id, name, type, url: '' });
        navigate('/schedule');
    };

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
        if (searchTarget === 'primary') setPrimaryEntity(entity);
        else setComparisonEntity(entity);
        setSearchTarget(null);
    };

    const weeks = primarySchedule?.schedule || comparisonSchedule?.schedule || [];

    // Проверка совпадения (используется и для подсчёта, и для отображения)
    const isIntersection = (pEvent: Event | undefined, cEvent: Event | undefined) => {
        if (!pEvent || !cEvent) return false;
        if (pEvent.event_index !== cEvent.event_index) return false;
        const isRelated = String(pEvent.reverse_id) === String(comparisonEntity?.id) ||
            String(cEvent.reverse_id) === String(primaryEntity?.id);
        const isSame = pEvent.course === cEvent.course;
        return isRelated || isSame;
    };

    // Подсчет совпадений
    const intersectionCount = useMemo(() => {
        if (!primarySchedule || !comparisonSchedule) return 0;
        let count = 0;
        const pWeek = primarySchedule.schedule?.find((w: Week) => w.week_id === activeWeekId);
        const cWeek = comparisonSchedule.schedule?.find((w: Week) => w.week_id === activeWeekId);
        if (!pWeek || !cWeek) return 0;

        pWeek.days.forEach(pDay => {
            const cDay = cWeek.days.find(d => d.day_id === pDay.day_id);
            if (!cDay) return;

            pDay.events.forEach(pEvent => {
                const cEvent = cDay.events.find(e => e.event_index === pEvent.event_index);
                if (isIntersection(pEvent, cEvent)) {
                    count++;
                }
            });
        });
        return count;
    }, [primarySchedule, comparisonSchedule, activeWeekId, primaryEntity?.id, comparisonEntity?.id]);

    // Получить день
    const getDay = (schedule: typeof primarySchedule, dayId: number) => {
        return schedule?.schedule?.find((w: Week) => w.week_id === activeWeekId)?.days.find(d => d.day_id === dayId);
    };

    const days = [1, 2, 3, 4, 5, 6];
    const dayColors = ['bg-indigo-500', 'bg-blue-500', 'bg-sky-500', 'bg-teal-500', 'bg-emerald-500', 'bg-orange-500'];

    return (
        <div className="h-full flex flex-col max-w-5xl mx-auto w-full mt-9">
            {/* Compact Header */}
            <div className="shrink-0 px-4 py-3 border-b flex items-center gap-3">
                {/* Primary */}
                <div className="flex-1 min-w-0 flex items-center gap-2">
                    {primaryEntity ? (
                        <>
                            <div className="flex-1 min-w-0 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900">
                                <span className="text-sm font-medium truncate block">{primaryEntity.name}</span>
                            </div>
                            <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={() => setPrimaryEntity(null)}>
                                <X className="w-3.5 h-3.5" />
                            </Button>
                        </>
                    ) : (
                        <Button variant="outline" size="sm" onClick={() => setSearchTarget('primary')} className="w-full justify-start">
                            <Plus className="w-3.5 h-3.5 mr-1.5" /> Первое расписание
                        </Button>
                    )}
                </div>

                {/* Week Tabs */}
                {weeks.length > 0 && (
                    <Tabs value={String(activeWeekId)} onValueChange={(v) => setActiveWeekId(Number(v))}>
                        <TabsList className="h-8">
                            {weeks.map((week: Week) => (
                                <TabsTrigger key={week.week_id} value={String(week.week_id)} className="text-xs px-3">
                                    {week.week}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>
                )}

                {/* Intersection Badge */}
                {intersectionCount > 0 && (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 text-xs font-medium">
                        <Zap className="w-3 h-3" />
                        {intersectionCount}
                    </div>
                )}

                {/* Comparison */}
                <div className="flex-1 min-w-0 flex items-center gap-2">
                    {comparisonEntity ? (
                        <>
                            <div className="flex-1 min-w-0 px-3 py-1.5 rounded-lg bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900">
                                <span className="text-sm font-medium truncate block">{comparisonEntity.name}</span>
                            </div>
                            <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={() => setComparisonEntity(null)}>
                                <X className="w-3.5 h-3.5" />
                            </Button>
                        </>
                    ) : (
                        <Button variant="outline" size="sm" onClick={() => setSearchTarget('secondary')} className="w-full justify-start">
                            <Plus className="w-3.5 h-3.5 mr-1.5" /> Второе расписание
                        </Button>
                    )}
                </div>
            </div>

            {/* Two Column Layout */}
            <div className="flex-1 p-4 space-y-6 overflow-auto">
                {days.map((dayId, i) => {
                    const primDay = getDay(primarySchedule, dayId);
                    const compDay = getDay(comparisonSchedule, dayId);
                    if (!primDay?.events.length && !compDay?.events.length) return null;

                    const weekName = primarySchedule?.schedule?.find((w: Week) => w.week_id === activeWeekId)?.week ||
                        comparisonSchedule?.schedule?.find((w: Week) => w.week_id === activeWeekId)?.week || '';
                    const date = getDateForDay(dayId, weekName);
                    const dayName = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'][i];
                    const dateStr = date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'numeric' });

                    const primEvents = primaryEntity?.type === 'teacher' && primDay?.events
                        ? groupEvents(primDay.events)
                        : primDay?.events || [];
                    const compEvents = comparisonEntity?.type === 'teacher' && compDay?.events
                        ? groupEvents(compDay.events)
                        : compDay?.events || [];

                    // Собираем все уникальные event_index
                    const allIndices = new Set<number>();
                    primEvents.forEach(e => allIndices.add(e.event_index));
                    compEvents.forEach(e => allIndices.add(e.event_index));
                    const sortedIndices = Array.from(allIndices).sort((a, b) => a - b);

                    return (
                        <div key={dayId}>
                            {/* Day Header */}
                            <div className="flex items-center gap-2 mb-3 px-1">
                                <div className={`w-2 h-2 rounded-full ${dayColors[i]}`} />
                                <span className="text-sm font-bold">{primDay?.day || compDay?.day || dayName}</span>
                                <span className="text-xs text-muted-foreground">{dateStr}</span>
                                <div className="flex-1 h-px bg-border ml-2" />
                            </div>

                            {/* Events Grid - Two Columns */}
                            <div className="space-y-2">
                                {sortedIndices.map(idx => {
                                    const pEvent = primEvents.find(e => e.event_index === idx);
                                    const cEvent = compEvents.find(e => e.event_index === idx);
                                    const hasMatch = isIntersection(pEvent, cEvent);

                                    return (
                                        <div key={idx} className={`grid grid-cols-2 gap-3 p-2 rounded-xl transition-all ${hasMatch ? 'ring-2 ring-purple-400 bg-purple-500/10' : ''}`}>
                                            {/* Left Event */}
                                            <div>
                                                {pEvent ? (
                                                    <ScheduleCard
                                                        event={pEvent}
                                                        isActive={false}
                                                        isGroup={primaryEntity?.type === 'group'}
                                                        onReverseClick={handleReverseClick}
                                                    />
                                                ) : (
                                                    <div className="h-full min-h-[60px] rounded-lg border border-dashed border-muted-foreground/20 flex items-center justify-center">
                                                        <span className="text-xs text-muted-foreground/40">—</span>
                                                    </div>
                                                )}
                                            </div>
                                            {/* Right Event */}
                                            <div>
                                                {cEvent ? (
                                                    <ScheduleCard
                                                        event={cEvent}
                                                        isActive={false}
                                                        isGroup={comparisonEntity?.type === 'group'}
                                                        onReverseClick={handleReverseClick}
                                                    />
                                                ) : (
                                                    <div className="h-full min-h-[60px] rounded-lg border border-dashed border-muted-foreground/20 flex items-center justify-center">
                                                        <span className="text-xs text-muted-foreground/40">—</span>
                                                    </div>
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

            <ScheduleSearchDialog
                open={!!searchTarget}
                onOpenChange={(open) => !open && setSearchTarget(null)}
                title={searchTarget === 'primary' ? "Первое расписание" : "Второе расписание"}
                onSelect={handleSearchSelect}
            />
        </div>
    );
};

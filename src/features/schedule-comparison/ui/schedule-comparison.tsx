import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSchedule } from '@/app/provider/schedule-provider';
import { getSchedule, searchTimetable, SearchResult } from '@/shared/api/timetable';
import { Search, Plus, Calendar, X } from 'lucide-react';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { DayColumn } from '@/features/schedule-viewer/ui/components/day-column';
import { getDateForDay, getCurrentWeekId } from '@/features/schedule-viewer/lib/schedule-utils';
import { WeekTabs } from '@/features/schedule-viewer/ui/components/week-tabs';

export const ScheduleComparisonPage = () => {
    const { trackedEntity, comparisonEntity, setComparisonEntity } = useSchedule();
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [activeWeekId, setActiveWeekId] = useState<number>(getCurrentWeekId());

    // Search query
    const { data: searchResults = [] } = useQuery({
        queryKey: ['search-comparison', searchQuery],
        queryFn: () => searchTimetable(searchQuery),
        enabled: searchQuery.length > 2,
    });

    // Primary Schedule Query (Tracked Entity)
    const { data: primarySchedule, isLoading: isPrimaryLoading } = useQuery({
        queryKey: ['schedule', trackedEntity?.type, trackedEntity?.id],
        queryFn: () => trackedEntity ? getSchedule(trackedEntity.type, trackedEntity.id) : null,
        enabled: !!trackedEntity,
    });

    // Comparison Schedule Query
    const { data: comparisonSchedule, isLoading: isComparisonLoading } = useQuery({
        queryKey: ['schedule', comparisonEntity?.type, comparisonEntity?.id],
        queryFn: () => comparisonEntity ? getSchedule(comparisonEntity.type, comparisonEntity.id) : null,
        enabled: !!comparisonEntity,
    });

    const handleSearchSelect = (entity: SearchResult) => {
        setComparisonEntity(entity);
        setSearchQuery('');
        setIsSearching(false);
    };

    const getDayData = (scheduleData: any, dayId: number) => {
        if (!scheduleData || !scheduleData.schedule) return null;
        const week = scheduleData.schedule.find((w: any) => w.week_id === activeWeekId);
        if (!week) return null;
        return week.days.find((d: any) => d.day_id === dayId);
    };

    const days = [1, 2, 3, 4, 5, 6]; // Monday to Saturday

    if (!trackedEntity) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-slate-500 animate-in fade-in zoom-in-95 duration-500">
                <p>Пожалуйста, сначала выберите основное расписание на Главной.</p>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col p-6 max-w-[1920px] mx-auto w-full relative">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 shrink-0 z-10">
                <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-100">
                        <SplitSquareHorizontal size={24} className="text-indigo-600" />
                    </div>
                    Сравнение
                </h1>

                {/* Week Selector */}
                {primarySchedule?.schedule && (
                    <div className="w-72">
                        <WeekTabs
                            weeks={primarySchedule.schedule}
                            activeWeekId={activeWeekId}
                            onWeekChange={setActiveWeekId}
                        />
                    </div>
                )}
            </div>

            {/* Comparison Content - Row based layout for alignment */}
            <div className="flex-1 overflow-y-auto min-h-0 pr-2 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                {/* Column Headers */}
                <div className="grid grid-cols-2 gap-8 mb-6 sticky top-0 bg-slate-50/95 backdrop-blur-sm z-10 py-2 border-b border-slate-200">
                    {/* Primary Header */}
                    <div className="px-4">
                        {trackedEntity ? (
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider block mb-1 text-indigo-400">
                                    Основное
                                </span>
                                <h2 className="text-xl font-bold text-slate-800 tracking-tight">{trackedEntity.name}</h2>
                            </div>
                        ) : (
                            <div className="text-slate-400 font-medium">Выберите расписание</div>
                        )}
                    </div>

                    {/* Comparison Header */}
                    <div className="px-4 flex justify-between items-center bg-white/50 rounded-xl">
                        {comparisonEntity ? (
                            <>
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider block mb-1 text-orange-400">
                                        Сравнение
                                    </span>
                                    <h2 className="text-xl font-bold text-slate-800 tracking-tight">{comparisonEntity.name}</h2>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => setComparisonEntity(null)} className="h-8 w-8 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
                                    <X size={18} />
                                </Button>
                            </>
                        ) : (
                            <div className="flex items-center gap-3 w-full cursor-pointer hover:opacity-75 transition-opacity" onClick={() => setIsSearching(true)}>
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                    <Plus size={20} />
                                </div>
                                <div>
                                    <div className="font-semibold text-slate-600">Добавить сравнение</div>
                                    <div className="text-xs text-slate-400">Нажмите чтобы выбрать</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-6 pb-10">
                    {days.map(dayId => {
                        const primaryDay = getDayData(primarySchedule, dayId);
                        const comparisonDay = getDayData(comparisonSchedule, dayId);

                        // Skip rendering distinct empty row if neither has classes? 
                        // Or keep for structure? Keeping properly preserves the week structure visualization.
                        // Let's hide if BOTH are missing to save space, purely purely if user prefers density.
                        // But user asked for "alignment", implying they want to see "Monday vs Monday".
                        // If both are empty (e.g. Sunday or a holiday), maybe skip.
                        if (!primaryDay && !comparisonDay && dayId !== 7) {
                            // If it's a weekday and both empty, maybe show a "Free day" row or skip. 
                            // Let's render to be safe for now so they know it's empty.
                        }

                        // We need a date for the headers or inside DayColumn. 
                        // DayColumn controls its own date rendering usually but we pass it formatted.
                        // We need the week name to calculate date.
                        const weekName = primarySchedule?.schedule?.find((w: any) => w.week_id === activeWeekId)?.week || '';
                        const dateStr = getDateForDay(dayId, weekName).toLocaleDateString('ru-RU', { day: 'numeric', month: 'numeric' });

                        // We can't use DayColumn seamlessly if we want to enforce grid alignment strictly *inside* the layout easily
                        // unless we wrap them.

                        return (
                            <div key={dayId} className="grid grid-cols-2 gap-8 group">
                                {/* Primary Side */}
                                <div className="min-h-[100px]">
                                    {isPrimaryLoading ? (
                                        <div className="h-full flex items-center justify-center"><div className="animate-spin rounded-full h-6 w-6 border-b-2 border-slate-300"></div></div>
                                    ) : primaryDay ? (
                                        <DayColumn
                                            day={primaryDay}
                                            date={dateStr}
                                            isGroup={trackedEntity?.type === 'group'}
                                        />
                                    ) : (
                                        // Empty state for this day
                                        <div className="h-full rounded-2xl border-2 border-dashed border-slate-100 flex flex-col items-center justify-center p-6 text-slate-300">
                                            <span className="font-bold text-lg text-slate-200">{dateStr}</span>
                                            <span className="text-sm">Нет занятий</span>
                                        </div>
                                    )}
                                </div>

                                {/* Comparison Side */}
                                <div className="min-h-[100px]">
                                    {isComparisonLoading ? (
                                        <div className="h-full flex items-center justify-center"><div className="animate-spin rounded-full h-6 w-6 border-b-2 border-slate-300"></div></div>
                                    ) : comparisonEntity ? (
                                        comparisonDay ? (
                                            <DayColumn
                                                day={comparisonDay}
                                                date={dateStr}
                                                isGroup={comparisonEntity.type === 'group'}
                                            />
                                        ) : (
                                            <div className="h-full rounded-2xl border-2 border-dashed border-slate-100 flex flex-col items-center justify-center p-6 text-slate-300">
                                                <span className="font-bold text-lg text-slate-200">{dateStr}</span>
                                                <span className="text-sm">Нет занятий</span>
                                            </div>
                                        )
                                    ) : (
                                        // Placeholder for when no entity is selected
                                        <div className="h-full rounded-2xl bg-slate-50/50 border border-slate-100 flex items-center justify-center text-slate-300 opacity-50">
                                            Выберите для сравнения
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Search Modal/Overlay */}
            {isSearching && (
                <div className="absolute inset-0 z-50 bg-white/60 backdrop-blur-md flex items-start justify-center pt-32 transition-all duration-300">
                    <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden ring-1 ring-slate-900/5 animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-300">
                        <div className="p-4 border-b border-slate-50 flex items-center gap-4">
                            <Search className="text-slate-400" size={22} />
                            <Input
                                autoFocus
                                placeholder="Поиск группы или преподавателя..."
                                className="border-none shadow-none focus-visible:ring-0 text-lg px-0 h-auto placeholder:text-slate-300 font-medium"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Button variant="ghost" size="icon" onClick={() => setIsSearching(false)} className="rounded-full hover:bg-slate-100">
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

// Start of Verification
import { SplitSquareHorizontal } from 'lucide-react';

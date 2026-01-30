import React from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

interface CalendarHeaderProps {
    month: number;
    year: number;
    lectureCount: number;
    pairCount: number;
    loading: boolean;
    onPrevMonth: () => void;
    onNextMonth: () => void;
    onToday: () => void;
    trackedEntityName: string;
    onClearTrackedEntity: () => void;
}

const MONTHS = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];

export const CalendarHeader: React.FC<CalendarHeaderProps> = React.memo(({
    month,
    year,
    lectureCount,
    pairCount,
    loading,
    onPrevMonth,
    onNextMonth,
    onToday,
    trackedEntityName,
    onClearTrackedEntity
}) => {
    return (
        <div className="flex flex-col gap-6 pb-2">
            {/* Top Row: Title, Nav, Stats */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Left: Month/Year Title */}
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight flex items-baseline gap-2 min-w-[200px]">
                    <span className="capitalize">{MONTHS[month]}</span>
                    <span className="text-slate-400 dark:text-slate-600 font-medium text-2xl">{year}</span>
                </h1>

                {/* Center: Navigation Controls */}
                <div className="flex items-center gap-1 bg-slate-100/50 dark:bg-slate-800/50 p-1 rounded-xl backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50">
                    <button
                        onClick={onPrevMonth}
                        className="p-2 hover:bg-white dark:hover:bg-slate-700 hover:shadow-sm rounded-lg transition-all text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        aria-label="Previous Month"
                    >
                        <ChevronLeft size={20} strokeWidth={2.5} />
                    </button>
                    <button
                        onClick={onToday}
                        className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 hover:shadow-sm rounded-lg transition-all mx-1"
                    >
                        Сегодня
                    </button>
                    <button
                        onClick={onNextMonth}
                        className="p-2 hover:bg-white dark:hover:bg-slate-700 hover:shadow-sm rounded-lg transition-all text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        aria-label="Next Month"
                    >
                        <ChevronRight size={20} strokeWidth={2.5} />
                    </button>
                </div>

                {/* Right: Stats & Entity */}
                <div className="flex items-center gap-4 min-w-[200px] justify-end">
                    <div className="flex items-center gap-3 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Лекции</span>
                            <span className="text-lg font-bold text-slate-900 dark:text-white leading-none">{loading ? '-' : lectureCount}</span>
                        </div>
                        <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
                        <div className="flex flex-col items-start">
                            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Всего</span>
                            <span className="text-lg font-bold text-slate-900 dark:text-white leading-none">{loading ? '-' : pairCount}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sub-header: Current Entity Indicator */}
            <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full pl-1 pr-3 py-1 shadow-sm">
                    <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
                        <CalendarIcon size={12} />
                    </div>
                    <span className="font-medium text-slate-700 dark:text-slate-300">{trackedEntityName}</span>
                    <button
                        onClick={onClearTrackedEntity}
                        className="ml-2 text-xs font-medium text-blue-500 hover:underline"
                    >
                        Сменить
                    </button>
                </div>

                {/* Legend */}
                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-blue-500 shadow-sm shadow-blue-500/50"></div> Лекции
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-orange-500 shadow-sm shadow-orange-500/50"></div> Лаб.
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50"></div> Прак.
                    </div>
                </div>
            </div>
        </div>
    );
});


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
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-2">
            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-4">
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight flex items-baseline gap-3">
                        <span className="capitalize">{MONTHS[month]}</span>
                        <span className="text-slate-400 dark:text-slate-500 font-medium text-3xl">{year}</span>
                    </h1>
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                        <button
                            onClick={onPrevMonth}
                            className="p-1.5 hover:bg-white dark:hover:bg-slate-700 hover:shadow-sm rounded-md transition-all text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        >
                            <ChevronLeft size={20} strokeWidth={2.5} />
                        </button>
                        <button
                            onClick={onToday}
                            className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 hover:shadow-sm rounded-md transition-all mx-1"
                        >
                            Сегодня
                        </button>
                        <button
                            onClick={onNextMonth}
                            className="p-1.5 hover:bg-white dark:hover:bg-slate-700 hover:shadow-sm rounded-md transition-all text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        >
                            <ChevronRight size={20} strokeWidth={2.5} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-6 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="flex flex-col items-end pr-6 border-r border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Расписание для</span>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
                            <CalendarIcon size={14} />
                        </div>
                        <div className="flex flex-col items-start">
                            <span className="font-bold text-sm text-slate-800 dark:text-slate-200 leading-none mb-1">{trackedEntityName}</span>
                            <button
                                onClick={onClearTrackedEntity}
                                className="text-[10px] font-medium text-slate-400 hover:text-blue-500 transition-colors"
                            >
                                Сменить группу
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex gap-6">
                    <div className="flex flex-col items-start min-w-[80px]">
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Лекции
                        </span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold text-slate-900 dark:text-white leading-none">
                                {loading ? '-' : lectureCount}
                            </span>
                            <span className="text-xs font-medium text-slate-400">часов</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-start min-w-[80px]">
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-violet-500"></div> Занятия
                        </span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold text-slate-900 dark:text-white leading-none">
                                {loading ? '-' : pairCount}
                            </span>
                            <span className="text-xs font-medium text-slate-400">всего</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});


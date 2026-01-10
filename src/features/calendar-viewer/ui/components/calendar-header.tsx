import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
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
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 sticky top-0 z-10 backdrop-blur-xl">
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-1">
                    <button
                        onClick={onPrevMonth}
                        className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                    >
                        <ChevronLeft size={20} strokeWidth={2} />
                    </button>
                    <button
                        onClick={onToday}
                        className="px-3 py-1 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
                    >
                        Сегодня
                    </button>
                    <button
                        onClick={onNextMonth}
                        className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                    >
                        <ChevronRight size={20} strokeWidth={2} />
                    </button>
                </div>

                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-baseline gap-2">
                    {MONTHS[month]}
                    <span className="text-slate-400 dark:text-slate-500 font-medium text-2xl">{year}</span>
                </h1>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex flex-col items-end pr-4 border-r border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-0.5">Расписание для</span>
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-base text-slate-800 dark:text-slate-200">{trackedEntityName}</span>
                        <button
                            onClick={onClearTrackedEntity}
                            className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-md transition-colors"
                        >
                            Сменить
                        </button>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Лекций
                        </span>
                        <span className="text-xl font-bold text-slate-900 dark:text-slate-100 leading-none mt-1">
                            {loading ? <span className="opacity-50">-</span> : lectureCount}
                        </span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-bold text-violet-600 dark:text-violet-400 uppercase tracking-widest flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-violet-500"></div> Пар
                        </span>
                        <span className="text-xl font-bold text-slate-900 dark:text-slate-100 leading-none mt-1">
                            {loading ? <span className="opacity-50">-</span> : pairCount}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

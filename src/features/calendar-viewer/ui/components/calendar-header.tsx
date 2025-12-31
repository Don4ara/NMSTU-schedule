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
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 bg-white/95 sticky top-0 z-10 backdrop-blur-xl">
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-1">
                    <button
                        onClick={onPrevMonth}
                        className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-500 hover:text-slate-900"
                    >
                        <ChevronLeft size={20} strokeWidth={2} />
                    </button>
                    <button
                        onClick={onToday}
                        className="px-3 py-1 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
                    >
                        Сегодня
                    </button>
                    <button
                        onClick={onNextMonth}
                        className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-500 hover:text-slate-900"
                    >
                        <ChevronRight size={20} strokeWidth={2} />
                    </button>
                </div>

                <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-baseline gap-2">
                    {MONTHS[month]}
                    <span className="text-slate-400 font-medium text-2xl">{year}</span>
                </h1>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex flex-col items-end pr-4 border-r border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Расписание для</span>
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-base text-slate-800">{trackedEntityName}</span>
                        <button
                            onClick={onClearTrackedEntity}
                            className="text-xs text-blue-600 hover:text-blue-700 font-medium px-2 py-0.5 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
                        >
                            Сменить
                        </button>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Лекций
                        </span>
                        <span className="text-xl font-bold text-slate-900 leading-none mt-1">
                            {loading ? <span className="opacity-50">-</span> : lectureCount}
                        </span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-bold text-violet-600 uppercase tracking-widest flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-violet-500"></div> Пар
                        </span>
                        <span className="text-xl font-bold text-slate-900 leading-none mt-1">
                            {loading ? <span className="opacity-50">-</span> : pairCount}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

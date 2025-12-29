
import React from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Clock } from 'lucide-react';

interface CalendarHeaderProps {
    month: number;
    year: number;
    lectureCount: number;
    pairCount: number;
    loading: boolean;
    onPrevMonth: () => void;
    onNextMonth: () => void;
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
    trackedEntityName,
    onClearTrackedEntity
}) => {
    return (
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white/80 sticky top-0 z-10 backdrop-blur-md">
            <div className="flex items-center gap-3">
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    {MONTHS[month]} <span className="text-slate-400 font-medium ml-1">{year}</span>
                </h1>
                <div className="flex bg-slate-100/80 rounded-lg p-0.5">
                    <button onClick={onPrevMonth} className="p-1 hover:bg-white hover:shadow-sm rounded-md transition-all text-slate-500 hover:text-slate-900">
                        <ChevronLeft size={16} />
                    </button>
                    <button onClick={onNextMonth} className="p-1 hover:bg-white hover:shadow-sm rounded-md transition-all text-slate-500 hover:text-slate-900">
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            <div className="flex items-center gap-5">
                <div className="flex flex-col items-end">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Отслеживание</span>
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-700">{trackedEntityName}</span>
                        <button onClick={onClearTrackedEntity} className="text-[10px] text-blue-500 hover:text-blue-600 font-medium">Сменить</button>
                    </div>
                </div>

                <div className="h-6 w-px bg-slate-200 mx-1"></div>

                <div className="flex gap-3">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest flex items-center gap-1">
                            <BookOpen size={9} /> Лекций
                        </span>
                        <span className="text-lg font-black text-slate-800 leading-none mt-0.5">{loading ? '-' : lectureCount}</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-bold text-violet-600 uppercase tracking-widest flex items-center gap-1">
                            <Clock size={9} /> Пар
                        </span>
                        <span className="text-lg font-black text-slate-800 leading-none mt-0.5">{loading ? '-' : pairCount}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

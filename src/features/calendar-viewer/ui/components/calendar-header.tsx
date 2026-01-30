import React from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import {Button} from "@/shared/components/ui/button.tsx";

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
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <h1 className="text-3xl font-bold tracking-tight flex items-baseline gap-2 min-w-[200px]">
                    <span className="capitalize">{MONTHS[month]}</span>
                    <span className="font-medium text-2xl">{year}</span>
                </h1>
                <div className="flex items-center gap-1 p-1 rounded-xl border">
                    <Button
                        onClick={onPrevMonth}
                        aria-label="Previous Month"
                    >
                        <ChevronLeft size={20} strokeWidth={2.5} />
                    </Button>
                    <Button onClick={onToday} aria-label="Today">
                        Сегодня
                    </Button>
                    <Button onClick={onNextMonth} aria-label="Next Month"
                    >
                        <ChevronRight size={20} strokeWidth={2.5} />
                    </Button>
                </div>
                <div className="flex items-center gap-4 min-w-[200px] justify-end">
                    <div className="flex items-center gap-3 px-3 py-1.5 rounded-xl">
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] font-bold uppercase tracking-wider">Лекции</span>
                            <span className="text-lg font-bold leading-none">{loading ? '-' : lectureCount}</span>
                        </div>
                        <div className="flex flex-col items-start">
                            <span className="text-[10px] font-bold uppercase tracking-wider">Всего</span>
                            <span className="text-lg font-bold leading-none">{loading ? '-' : pairCount}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sub-header: Current Entity Indicator */}
            <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2 text-sm border rounded-full pl-1 pr-3 py-1 shadow-sm">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center">
                        <CalendarIcon size={12} />
                    </div>
                    <span className="font-medium">{trackedEntityName}</span>
                    <button
                        onClick={onClearTrackedEntity}
                        className="ml-2 text-xs font-medium text-blue-500 hover:underline"
                    >
                        Сменить
                    </button>
                </div>

                {/* Legend */}
                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-wider">
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


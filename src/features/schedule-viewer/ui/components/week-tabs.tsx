
import React from 'react';
import { Week } from '@/entities/schedule/model/types';

interface WeekTabsProps {
    weeks: Week[];
    activeWeekId: number | null;
    onWeekChange: (weekId: number) => void;
}

export const WeekTabs: React.FC<WeekTabsProps> = ({ weeks, activeWeekId, onWeekChange }) => {
    if (!weeks || weeks.length === 0) return null;

    return (
        <div className="flex bg-slate-100/80 p-1 rounded-xl">
            {weeks.map((week) => (
                <button
                    key={week.week_id}
                    onClick={() => onWeekChange(week.week_id)}
                    className={`
                        px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200
                        ${activeWeekId === week.week_id
                            ? "bg-white text-slate-900 shadow-sm ring-1 ring-black/5"
                            : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"}
                    `}
                >
                    {week.week}
                </button>
            ))}
        </div>
    );
};

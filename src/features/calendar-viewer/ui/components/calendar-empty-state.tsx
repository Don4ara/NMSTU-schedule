
import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Search } from '@/features/search/ui/search';
import { SearchResult } from '@/shared/api/timetable';

interface CalendarEmptyStateProps {
    onSelect: (entity: SearchResult) => void;
}

export const CalendarEmptyState: React.FC<CalendarEmptyStateProps> = ({ onSelect }) => {
    return (
        <div className="h-full flex flex-col items-center justify-center text-slate-400 p-8 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-slate-100 rotate-3">
                <CalendarIcon size={40} className="text-slate-300" />
            </div>
            <h2 className="text-2xl font-bold text-slate-700 mb-2">Календарь занятий</h2>
            <p className="text-sm text-slate-400 max-w-md text-center mb-8">
                Выберите группу или преподавателя, чтобы отслеживать расписание в формате календаря и видеть статистику.
            </p>

            <div className="w-full max-w-sm">
                <Search
                    onSelectResult={onSelect}
                    placeholder="Найти группу для отслеживания..."
                    className="w-full"
                />
            </div>
        </div>
    );
};


import React from 'react';
import { Users, User, WifiOff } from 'lucide-react';
import { ScheduleData } from '@/entities/schedule/model/types';
import { Search } from '@/features/search/ui/search';
import { useSchedule } from '@/app/provider/schedule-provider';

interface ScheduleHeaderProps {
    scheduleData: ScheduleData;
    isUsingMockData: boolean;
    children?: React.ReactNode; // For WeekTabs
}

export const ScheduleHeader: React.FC<ScheduleHeaderProps> = ({ scheduleData, isUsingMockData, children }) => {
    const { setSelectedEntity } = useSchedule();
    return (
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md pt-4 pb-4 mb-6 border-b border-slate-100 px-4 md:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">
                        {scheduleData.type === 'group' ? (
                            <>
                                <Users size={14} />
                                <span>Группа</span>
                            </>
                        ) : (
                            <>
                                <User size={14} />
                                <span>Преподаватель</span>
                            </>
                        )}
                    </div>
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                        {scheduleData.name}
                    </h1>
                </div>

                <div className="flex flex-col items-end gap-3 flex-1">
                    <div className="w-full max-w-[280px] mb-1">
                        <Search
                            placeholder="Найти другое..."
                            className="w-full bg-slate-50 border-slate-200/60 focus-within:bg-white transition-colors"
                            onSelectResult={setSelectedEntity}
                        />
                    </div>
                    {isUsingMockData && (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-50 border border-orange-100 text-orange-600 text-xs font-bold rounded-full select-none">
                            <WifiOff size={12} />
                            <span>OFFLINE MODE</span>
                        </div>
                    )}
                    {children}
                </div>
            </div>
        </div>
    );
};

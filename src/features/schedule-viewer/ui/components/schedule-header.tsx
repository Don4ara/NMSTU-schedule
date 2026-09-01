
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

export const ScheduleHeader: React.FC<ScheduleHeaderProps> = React.memo(({ scheduleData, isUsingMockData, children }) => {
    const { setSelectedEntity } = useSchedule();
    const entityLabel = scheduleData.type === 'group' ? 'Группа' : 'Преподаватель';
    const EntityIcon = scheduleData.type === 'group' ? Users : User;

    return (
        <div className="sticky top-0 z-20 bg-background pt-4 pb-4 mb-6 border-b px-4 md:px-8">
            <div className="grid grid-cols-[1fr_auto_auto] items-center gap-x-4 gap-y-3">
                <div className="min-w-0">
                    <div className="flex items-center gap-1.5 text-[11px] lg:text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">
                        <EntityIcon size={14} className="shrink-0 text-blue-500" />
                        <span>{entityLabel}</span>
                    </div>
                    <h1
                        title={scheduleData.name}
                        className="font-extrabold text-foreground tracking-tight leading-tight text-2xl lg:text-3xl xl:text-4xl overflow-hidden text-ellipsis whitespace-nowrap"
                    >
                        {scheduleData.name}
                    </h1>
                </div>

                <div className="w-[260px]">
                    <Search
                        placeholder="Найти другое..."
                        className="w-full"
                        onSelectResult={setSelectedEntity}
                    />
                </div>

                <div className="flex items-center gap-2">
                    {children}
                </div>
            </div>

            {isUsingMockData && (
                <div className="mt-3 flex w-fit items-center gap-2 px-3 py-2 bg-orange-50 border border-orange-200/60 text-orange-600 text-xs font-bold rounded-lg select-none dark:bg-orange-900/20 dark:border-orange-900/50 dark:text-orange-400">
                    <WifiOff size={12} /><span>OFFLINE</span>
                </div>
            )}
        </div>
    );
});


import React from 'react';
import { Week } from '@/entities/schedule/model/types';
import { getCurrentWeekName } from '../../lib/schedule-utils';
import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';

interface WeekTabsProps {
    weeks: Week[];
    activeWeekId: number | null;
    onWeekChange: (weekId: number) => void;
}

export const WeekTabs: React.FC<WeekTabsProps> = React.memo(({ weeks, activeWeekId, onWeekChange }) => {
    if (!weeks || weeks.length === 0) return null;

    const currentWeekName = getCurrentWeekName();

    return (
        <Tabs
            value={activeWeekId?.toString() || ''}
            onValueChange={(value) => onWeekChange(Number(value))}
            className="w-full md:w-auto"
        >
            <TabsList className="w-full flex md:w-auto h-10 p-1 bg-muted/50">
                {weeks.map((week) => {
                    const isCurrent = week.week.toLowerCase() === currentWeekName.toLowerCase();
                    return (
                        <TabsTrigger
                            key={week.week_id}
                            value={week.week_id.toString()}
                            className={`flex-1 text-xs font-semibold transition-all
                                ${isCurrent
                                    ? 'text-emerald-600 dark:text-emerald-400 data-[state=active]:bg-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-sm'
                                    : 'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm'
                                }`}
                        >
                            {week.week}
                        </TabsTrigger>
                    );
                })}
            </TabsList>
        </Tabs>
    );
});


import React from 'react';
import { Week } from '@/entities/schedule/model/types';
import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';

interface WeekTabsProps {
    weeks: Week[];
    activeWeekId: number | null;
    onWeekChange: (weekId: number) => void;
}

export const WeekTabs: React.FC<WeekTabsProps> = React.memo(({ weeks, activeWeekId, onWeekChange }) => {
    if (!weeks || weeks.length === 0) return null;

    return (
        <Tabs
            value={activeWeekId?.toString() || ''}
            onValueChange={(value) => onWeekChange(Number(value))}
            className="w-full"
        >
            <TabsList className="w-full grid grid-cols-2 h-10">
                {weeks.map((week) => (
                    <TabsTrigger
                        key={week.week_id}
                        value={week.week_id.toString()}
                        className="text-xs font-semibold"
                    >
                        {week.week}
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    );
});



import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/shared/components/ui/dialog";
import { Event as ScheduleEvent } from '@/entities/schedule/model/types';
import { ScheduleCard } from '@/features/schedule-viewer/ui/components/schedule-card';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface DayDetailsDialogProps {
    isOpen: boolean;
    onClose: () => void;
    date: Date | null;
    events: ScheduleEvent[];
    isGroup: boolean;
}

export const DayDetailsDialog: React.FC<DayDetailsDialogProps> = ({
    isOpen,
    onClose,
    date,
    events,
    isGroup
}) => {
    // console.log('DayDetailsDialog: render', { isOpen, date, eventsCount: events?.length });

    if (!date) {
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl capitalize">
                        {format(date, 'd MMMM, EEEE', { locale: ru })}
                    </DialogTitle>
                    <DialogDescription className="text-slate-500">
                        Список занятий на этот день
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-3 py-4">
                    {events.length > 0 ? (
                        events.map((event, index) => (
                            <ScheduleCard
                                key={`${event.event_index}-${index}`}
                                event={event}
                                isActive={false}
                                isGroup={isGroup}
                            />
                        ))
                    ) : (
                        <div className="text-center py-8 text-slate-400">
                            <p>Нет занятий в этот день</p>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

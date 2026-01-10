
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/shared/components/ui/dialog";
import { Event as ScheduleEvent } from '@/entities/schedule/model/types';
import { ScheduleCard } from '@/entities/schedule';
import { useSchedule } from '@/app/provider/schedule-provider';
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
    const navigate = useNavigate();
    const { setSelectedEntity } = useSchedule();

    const handleReverseClick = (id: number, name: string, type: 'group' | 'teacher') => {
        setSelectedEntity({
            id,
            name,
            type,
            url: ''
        });
        navigate('/schedule');
        onClose(); // Close dialog when jumping
    };

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
                                onReverseClick={handleReverseClick}
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

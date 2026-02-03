
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
import { groupEvents } from '@/features/schedule-viewer/lib/schedule-utils';

interface DayDetailsDialogProps {
    isOpen: boolean;
    onClose: () => void;
    date: Date | null;
    events: ScheduleEvent[];
}

export const DayDetailsDialog: React.FC<DayDetailsDialogProps> = ({
    isOpen,
    onClose,
    date,
    events
}) => {
    // console.log('DayDetailsDialog: render', { isOpen, date, eventsCount: events?.length });
    const navigate = useNavigate();
    const { setSelectedEntity, trackedEntity } = useSchedule();

    // Determine if we are viewing a group's schedule or a teacher's schedule.
    // If we are a teacher, 'isGroup' (for the card) implies the reverse is a group (student group).
    // isGroup prop passed to ScheduleCard usually means "Is the current user/view a Group?". 
    // If current view is Group, reverse is Teacher. If current view is Teacher, reverse is Group.
    // So if trackedEntity.type is teacher, isGroup for card should be false (to show Group icon)? 
    // Wait, let's check ScheduleCard logic:
    // isGroup ? <User /> (Teacher icon) : <Users /> (Group icon)
    // If I am a Group (isGroup=true), I want to see my Teacher (User icon).
    // If I am a Teacher (isGroup=false), I want to see my Groups (Users icon).
    // So 'isGroup' in ScheduleCard actually means "Are we in Student View?".
    const isStudentView = trackedEntity?.type === 'group';

    const renderEvents = () => {
        if (!trackedEntity) return events;
        // Group events only for teachers
        return trackedEntity.type === 'teacher' ? groupEvents(events) : events;
    };

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
            <DialogContent className="max-w-md max-h-[85vh] overflow-hidden flex flex-col p-0 gap-0 shadow-2xl">
                <DialogHeader className="p-6 pb-2 shrink-0">
                    <DialogTitle className="text-2xl font-bold capitalize tracking-tight">
                        {format(date, 'd MMMM, EEEE', { locale: ru })}
                    </DialogTitle>
                    <DialogDescription className="font-medium text-base">
                        Список занятий на этот день
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto p-6 pt-2">
                    <div className="flex flex-col gap-3">
                        {renderEvents().length > 0 ? (
                            renderEvents().map((event, index) => (
                                <ScheduleCard
                                    key={`${event.event_index}-${index}`}
                                    event={event}
                                    isActive={false}
                                    isGroup={isStudentView}
                                    onReverseClick={handleReverseClick}
                                />
                            ))
                        ) : (
                            <div className="text-center py-8">
                                <p>Нет занятий в этот день</p>
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

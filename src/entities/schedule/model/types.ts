export interface Event {
    event_index: number;
    course_id: number;
    course: string;
    type_id: number;
    subgroup: number;
    location: string;
    type: string;
    reverse_id: number;
    reverse: string;
}

export interface GroupedEvent extends Event {
    isGrouped?: boolean;
    groupNames?: string[];
    originalEvents?: Event[];
}

export interface Day {
    day_id: number;
    day: string;
    events: Event[];
}

export interface Week {
    week_id: number;
    week: string;
    days: Day[];
}

export interface ScheduleData {
    id: string;
    name: string;
    url: string;
    type: 'group' | 'teacher';
    schedule: Week[];
}

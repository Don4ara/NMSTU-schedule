import { MapPin } from 'lucide-react';
import { Event as ScheduleEvent } from '@/entities/schedule/model/types';
import { getEventTime } from '@/entities/schedule/lib/schedule-utils';

interface DailyScheduleTimelineProps {
    events: ScheduleEvent[];
    currentEvent?: ScheduleEvent | null;
}

export const DailyScheduleTimeline = ({ events: todayEvents, currentEvent }: DailyScheduleTimelineProps) => {
    return (
        <div
            className="lg:col-span-1 flex flex-col relative overflow-hidden h-fit">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg text-slate-900 dark:text-foreground">Сегодня</h3>
                <span
                    className="text-xs font-medium text-slate-600 dark:text-muted-foreground rounded-full">{todayEvents.length} пар</span>
            </div>

            <div className="flex-1 pr-2 custom-scrollbar relative">
                {/* Линия таймлайна — градиентная для мягкости */}
                <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-slate-200 to-transparent dark:via-white/10"></div>

                <div className="space-y-4 relative">
                    {todayEvents.length > 0 ? (
                        todayEvents.map((event, idx) => (
                            <div key={idx} className="relative pl-10 group">
                                {/* Точка (индикатор) — с анимацией для активного */}
                                <div className="absolute left-[10px] top-[22px] z-10">
                                    {event === currentEvent ? (
                                        <div className="relative flex items-center justify-center w-3 h-3">
                                            <span className="absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75 animate-ping"></span>
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500 ring-2 ring-white dark:ring-slate-900"></span>
                                        </div>
                                    ) : (
                                        <div className="w-3 h-3 rounded-full border-2 bg-slate-300 border-white dark:border-slate-900 group-hover:bg-blue-400 group-hover:scale-110 transition-all duration-300"></div>
                                    )}
                                </div>

                                {/* Карточка события */}
                                <div className={`rounded-xl p-3 transition-all duration-300 border backdrop-blur-sm
                ${event === currentEvent
                                        ? 'bg-blue-50/80 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 shadow-sm'
                                        : 'bg-transparent border-transparent hover:bg-slate-50/50 dark:hover:bg-white/5 hover:border-slate-200 dark:hover:border-white/10'
                                    }`}
                                >
                                    <div className="flex justify-between items-baseline mb-1.5">
                                        <span className={`text-[10px] font-extrabold uppercase tracking-widest ${event.type.toLowerCase().includes('лек') ? 'text-blue-600 dark:text-blue-400' :
                                            event.type.toLowerCase().includes('лаб') ? 'text-orange-600 dark:text-orange-400' :
                                                'text-emerald-600 dark:text-emerald-400'
                                            }`}>
                                            {event.type}
                                        </span>
                                        <span className={`text-xs font-mono font-medium ${event === currentEvent ? 'text-blue-700' : ''}`}>
                                            {getEventTime(event.event_index).split(' - ')[0]}
                                        </span>
                                    </div>

                                    <div
                                        className={`text-sm font-bold mb-1 leading-snug ${event === currentEvent ? 'text-blue-900 dark:text-white' : 'text-slate-800 dark:text-slate-100'
                                            }`}
                                    >
                                        {event.course}
                                    </div>

                                    <div className="flex justify-between items-center gap-2">
                                        <div className="text-[11px] font-medium text-slate-500 dark:text-slate-500 flex items-center gap-1.5">
                                            <MapPin size={12} className="opacity-70" />
                                            <span className="truncate">{event.location}</span>
                                        </div>
                                        {event.reverse && (
                                            <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 truncate max-w-[100px]">
                                                {event.reverse}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12 text-slate-400 dark:text-slate-500">
                            <p className="text-sm font-medium">Нет занятий сегодня</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

import { Event as ScheduleEvent } from '@/entities/schedule/model/types';
import { getEventTime, EVENT_RANGES } from '@/entities/schedule/lib/schedule-utils';
import { formatDuration } from '@/shared/lib/time-utils';
import { MapPin, User, GraduationCap, Clock } from 'lucide-react';

interface CurrentEventCardProps {
    currentEvent?: ScheduleEvent | null;
    nextEvent?: ScheduleEvent | null;
    currentTime: Date;
}

export const CurrentEventCard = ({ currentEvent, nextEvent, currentTime }: CurrentEventCardProps) => {
    const event = currentEvent || nextEvent;

    return (
        <div
            className={`rounded-3xl p-6 md:p-8 relative overflow-hidden flex flex-col justify-between min-h-[320px] group transition-colors border-l-[6px] mx-auto max-w-4xl ${event
                ? event.type.toLowerCase().includes('лек') ? 'border-l-blue-500'
                    : event.type.toLowerCase().includes('лаб') ? 'border-l-orange-500'
                        : 'border-l-emerald-500'
                : 'border-l-primary'
                }`}>
            <div
                className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-600/10 dark:to-indigo-600/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none opacity-60"></div>
            <div
                className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-tr from-emerald-50 to-teal-50 dark:from-emerald-600/10 dark:to-teal-600/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none opacity-60"></div>

            {currentEvent ? (
                <>
                    <div className="relative z-10 flex justify-between items-start gap-3 mb-6">
                        <span
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider border border-blue-200 dark:border-blue-700">
                            <span className="relative flex h-2 w-2">
                                <span
                                    className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span
                                    className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            Сейчас
                        </span>
                        <span className="font-mono text-sm font-semibold text-slate-900 dark:text-white px-3 py-1.5 bg-white/80 dark:bg-slate-800/80 rounded-lg backdrop-blur-sm border border-slate-200 dark:border-slate-700 whitespace-nowrap">
                            {getEventTime(currentEvent.event_index)}
                        </span>
                    </div>

                    <div className="relative z-10 flex-1 flex flex-col justify-center pb-2">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white leading-snug mb-4">
                            {currentEvent.course}
                        </h2>
                        <div className="flex flex-wrap gap-3 text-slate-600 dark:text-slate-400">
                            <div
                                className="flex items-center gap-2 bg-white/70 dark:bg-slate-800/70 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 backdrop-blur-sm">
                                <MapPin size={16} className="text-blue-500 dark:text-blue-400 flex-shrink-0" />
                                <span className="font-medium text-sm">{currentEvent.location}</span>
                            </div>
                            <div
                                className="flex items-center gap-2 bg-white/70 dark:bg-slate-800/70 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 backdrop-blur-sm">
                                <User size={16} className="text-violet-500 dark:text-violet-400 flex-shrink-0" />
                                <span className="font-medium text-sm">{currentEvent.reverse}</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
                        <div
                            className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
                            <span>До конца пары</span>
                        </div>
                        <div
                            className="text-3xl font-mono font-bold text-blue-600 dark:text-blue-400 tracking-tight">
                            {(() => {
                                const range = EVENT_RANGES[currentEvent.event_index];
                                if (!range) return '--:--';

                                const totalSeconds = (range[1] * 60) - (currentTime.getHours() * 3600 + currentTime.getMinutes() * 60 + currentTime.getSeconds());

                                return formatDuration(totalSeconds);
                            })()}
                        </div>
                    </div>
                </>
            ) : nextEvent ? (
                <div className="relative z-10 h-full flex flex-col justify-between">
                    <div className="flex flex-col items-center text-center mt-8">
                        <div
                            className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400 flex items-center justify-center mb-6">
                            <Clock size={32} />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Следующая
                            пара</h3>
                        <p className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-1 max-w-md mx-auto">{nextEvent.course}</p>
                        <p className="text-slate-500 dark:text-slate-400 mb-2">{nextEvent.location} • {getEventTime(nextEvent.event_index).split(' - ')[0]}</p>
                    </div>

                    <div className="text-center mb-4">
                        <div className="text-xs font-medium text-slate-400 dark:text-slate-500 mb-1">До
                            начала
                        </div>
                        <div
                            className="text-3xl font-mono font-bold text-slate-700 dark:text-slate-300 tracking-tight">
                            {(() => {
                                const range = EVENT_RANGES[nextEvent.event_index];
                                if (!range) return '--:--';

                                const totalSeconds = (range[0] * 60) - (currentTime.getHours() * 3600 + currentTime.getMinutes() * 60 + currentTime.getSeconds());

                                return formatDuration(totalSeconds);
                            })()}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center py-8">
                    <div
                        className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-500 dark:text-emerald-400 flex items-center justify-center mb-6">
                        <GraduationCap size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Занятия
                        окончены</h3>
                    <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">Отдыхайте и
                        набирайтесь сил перед следующим учебным днем!</p>
                </div>
            )}
        </div>
    );
};

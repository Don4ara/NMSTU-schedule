import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import {
    Calendar,
    WifiOff,
} from 'lucide-react';
import { useSchedule } from '@/app/provider/schedule-provider';
import { MOCK_DB } from '../lib/mock-data';
import { ScheduleData, Week } from '@/entities/schedule/model/types';
import { getSchedule } from '@/shared/api/timetable';
import { getCurrentWeekName, getDateForDay } from '../lib/schedule-utils';
import { ScheduleHeader } from './components/schedule-header';
import { WeekTabs } from './components/week-tabs';
import { DayColumn } from './components/day-column';


export const ScheduleViewer = () => {
    const { selectedEntity } = useSchedule();
    const [activeWeekId, setActiveWeekId] = useState<number | null>(null);

    const { data: apiData, isLoading, isError } = useQuery<ScheduleData | null>({
        queryKey: ['schedule', selectedEntity?.type, selectedEntity?.id],
        queryFn: () => getSchedule(selectedEntity!.type, selectedEntity!.id),
        enabled: !!selectedEntity,
        retry: 1,
        refetchOnWindowFocus: false
    });

    // Derived state
    const mockKey = selectedEntity ? `${selectedEntity.type}_${selectedEntity.id}` : '';
    // @ts-expect-error - Mock data structure mismatch for offline mode testing
    const mockData = (isError && selectedEntity) ? (MOCK_DB.schedules[mockKey] as ScheduleData | undefined) : null;
    const scheduleData: ScheduleData | null = apiData || mockData || null;
    const isUsingMockData = !!mockData;

    // Set active week
    useEffect(() => {
        if (scheduleData?.schedule && scheduleData.schedule.length > 0) {
            const currentWeekName = getCurrentWeekName();
            const matchingWeek = scheduleData.schedule.find((w: Week) => w.week.toLowerCase() === currentWeekName.toLowerCase());
            // Only set if not already set or if we switched entities (logic can be improved by checking scheduleData.id if available, but for now this runs on scheduleData change)
            setActiveWeekId(matchingWeek ? matchingWeek.week_id : scheduleData.schedule[0].week_id);
        }
    }, [scheduleData]);

    const [, setTick] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setTick(t => t + 1);
        }, 60000);
        return () => clearInterval(timer);
    }, []);

    if (!selectedEntity) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 p-8">
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
                    <Calendar size={48} strokeWidth={1.5} className="text-slate-300" />
                </div>
                <p className="text-xl font-medium text-slate-600">Выберите расписание</p>
                <p className="text-sm mt-2 text-slate-400 max-w-sm text-center">
                    Найдите группу или преподавателя в поиске слева, чтобы увидеть актуальное расписание занятий.
                </p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="h-full flex flex-col items-center justify-center gap-4">
                <div className="relative">
                    <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
                </div>
                <span className="text-sm font-medium text-slate-500 animate-pulse">Получаем данные...</span>
            </div>
        );
    }

    if (!scheduleData) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto p-6">
                <div className="text-6xl mb-4 opacity-50">📅</div>
                <h3 className="text-xl font-bold text-slate-800">Расписание не найдено</h3>
                <p className="text-slate-500 mt-3 leading-relaxed">
                    К сожалению, для <b>{selectedEntity.name}</b> нет данных о расписании.
                </p>
                {isError && (
                    <div className="mt-6 p-4 bg-orange-50 border border-orange-100 rounded-xl text-sm text-orange-700 flex items-start gap-3 text-left">
                        <WifiOff className="shrink-0 mt-0.5" size={16} />
                        <div>
                            <p className="font-semibold">Проблемы с подключением</p>
                            <p className="mt-1 opacity-90">Сервер университета недоступен. Проверьте соединение или попробуйте позже.</p>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <motion.div
            className="w-full max-w-[1920px] mx-auto animate-in fade-in duration-500 min-h-full flex flex-col justify-center p-4 md:p-8 relative"
            layout
            transition={{
                type: "spring" as const,
                stiffness: 300,
                damping: 30,
            }}
        >
            <ScheduleHeader scheduleData={scheduleData} isUsingMockData={isUsingMockData}>
                <div className="w-56">
                    <WeekTabs
                        weeks={scheduleData.schedule}
                        activeWeekId={activeWeekId}
                        onWeekChange={setActiveWeekId}
                    />
                </div>
            </ScheduleHeader>

            {/* Schedule Content */}
            {
                scheduleData.schedule && scheduleData.schedule.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 px-2 pb-12">
                        {scheduleData.schedule
                            .find(w => w.week_id === activeWeekId)
                            ?.days
                            .filter(day => day.day_id !== 7 && day.day.toLowerCase() !== 'воскресенье')
                            .map((day) => {
                                const targetWeek = scheduleData.schedule.find(w => w.week_id === activeWeekId)?.week || '';
                                const date = getDateForDay(day.day_id, targetWeek);
                                return (
                                    <DayColumn
                                        key={day.day_id}
                                        day={day}
                                        date={date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'numeric' })}
                                        isGroup={scheduleData.type === 'group'}
                                    />
                                );
                            })}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="inline-block p-4 rounded-full bg-slate-50 mb-4">
                            <Calendar size={40} className="text-slate-300" />
                        </div>
                        <p className="text-slate-500 font-medium">Расписание на эту неделю пустое</p>
                    </div>
                )
            }
        </motion.div >
    );
};

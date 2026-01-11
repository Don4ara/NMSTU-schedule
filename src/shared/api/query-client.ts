
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 15, // 15 minutes - расписание редко меняется
            gcTime: 1000 * 60 * 30, // 30 minutes - держим данные дольше в памяти
            retry: 1,
            refetchOnWindowFocus: false,
            refetchOnReconnect: 'always', // Обновляем при восстановлении соединения
        },
    },
});

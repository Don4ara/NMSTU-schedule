import { RouterProvider } from 'react-router-dom';
import { ScheduleProvider } from "@/app/provider/schedule-provider";
import { queryClient } from "@/shared/api/query-client";
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { ThemeProvider } from './provider/theme-provider';
import { appRouter } from '@/app/router/app-router';
import { WindowControls } from '@/shared/ui/window-controls';

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

function App() {
  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
      <WindowControls />
      <ScheduleProvider>
        <ThemeProvider>
          <RouterProvider router={appRouter} />
        </ThemeProvider>
      </ScheduleProvider>
    </PersistQueryClientProvider>
  )
}

export default App


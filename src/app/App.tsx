import { MainLayoutSide } from "@/shared/components/layout/MainLayoutSide";
import { ScheduleProvider, useSchedule } from "@/app/provider/schedule-provider";
import { ScheduleViewer } from "@/features/schedule-viewer/ui/schedule-viewer";
import { CalendarViewer } from "@/features/calendar-viewer/ui/calendar-viewer";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/shared/api/query-client";

import { Dashboard } from "@/features/dashboard/ui/dashboard";

const AppContent = () => {
  const { viewMode } = useSchedule();
  return (
    <MainLayoutSide>
      {viewMode === 'dashboard' ? <Dashboard /> : viewMode === 'calendar' ? <CalendarViewer /> : <ScheduleViewer />}
    </MainLayoutSide>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="absolute top-0 left-0 z-50 h-8 w-full titlebar" />
      <ScheduleProvider>
        <AppContent />
      </ScheduleProvider>
    </QueryClientProvider>
  )
}

export default App

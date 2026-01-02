import React, { Suspense } from 'react';
import { Loader2 } from "lucide-react";
import { MainLayoutSide } from "@/shared/components/layout/MainLayoutSide";
import { ScheduleProvider, useSchedule } from "@/app/provider/schedule-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/shared/api/query-client";

// Lazy load components to optimize RAM usage
const Dashboard = React.lazy(() => import("@/features/dashboard/ui/dashboard").then(module => ({ default: module.Dashboard })));
const CalendarViewer = React.lazy(() => import("@/features/calendar-viewer/ui/calendar-viewer").then(module => ({ default: module.CalendarViewer })));
const ScheduleComparisonPage = React.lazy(() => import("@/features/schedule-comparison/ui/schedule-comparison").then(module => ({ default: module.ScheduleComparisonPage })));
const ScheduleViewer = React.lazy(() => import("@/features/schedule-viewer/ui/schedule-viewer").then(module => ({ default: module.ScheduleViewer })));

const AppContent = () => {
  const { viewMode } = useSchedule();
  return (
    <MainLayoutSide>
      <Suspense fallback={<div className="flex h-full w-full items-center justify-center text-muted-foreground"><Loader2 className="h-10 w-10 animate-spin" /></div>}>
        {viewMode === 'dashboard' ? <Dashboard /> : viewMode === 'calendar' ? <CalendarViewer /> : viewMode === 'comparison' ? <ScheduleComparisonPage /> : <ScheduleViewer />}
      </Suspense>
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

import React, { Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from "lucide-react";
import { MainLayoutSide } from "@/shared/components/layout/MainLayoutSide";
import { ScheduleProvider, useSchedule } from "@/app/provider/schedule-provider";
import { queryClient } from "@/shared/api/query-client";
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

// Lazy load components to optimize RAM usage
const Dashboard = React.lazy(() => import("@/pages/home/ui").then(module => ({ default: module.Dashboard })));
const CalendarViewer = React.lazy(() => import("@/pages/calendar/ui").then(module => ({ default: module.CalendarViewer })));
const ScheduleComparisonPage = React.lazy(() => import("@/pages/comparison/ui").then(module => ({ default: module.ScheduleComparisonPage })));
const ScheduleViewer = React.lazy(() => import("@/pages/schedule/ui").then(module => ({ default: module.ScheduleViewer })));

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

const pageTransition = {
  duration: 0.15,
  ease: [0.4, 0, 0.2, 1] as const // easeInOut cubic bezier
};

const AppContent = () => {
  const { viewMode } = useSchedule();

  const renderView = () => {
    switch (viewMode) {
      case 'dashboard':
        return <Dashboard />;
      case 'calendar':
        return <CalendarViewer />;
      case 'comparison':
        return <ScheduleComparisonPage />;
      default:
        return <ScheduleViewer />;
    }
  };

  return (
    <MainLayoutSide>
      <Suspense fallback={<div className="flex h-full w-full items-center justify-center text-muted-foreground"><Loader2 className="h-10 w-10 animate-spin" /></div>}>
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
            className="h-full w-full"
            style={{ willChange: 'opacity' }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </Suspense>
    </MainLayoutSide>
  );
};

function App() {
  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
      <div className="absolute top-0 left-0 z-50 h-8 w-full titlebar" />
      <ScheduleProvider>
        <AppContent />
      </ScheduleProvider>
    </PersistQueryClientProvider>
  )
}

export default App

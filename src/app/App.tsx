import { IconFolderCode } from "@tabler/icons-react"
import { ArrowUpRightIcon } from "lucide-react"

import { Button } from "@/shared/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/shared/components/ui/empty"
import { MainLayoutSide } from "@/shared/components/layout/MainLayoutSide";

export function EmptyDemo() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconFolderCode />
        </EmptyMedia>
        <EmptyTitle>No Projects Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any projects yet. Get started by creating
          your first project.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button>Create Project</Button>
          <Button variant="outline">Import Project</Button>
        </div>
      </EmptyContent>
      <Button
        variant="link"
        asChild
        className="text-muted-foreground"
        size="sm"
      >
        <a href="#">
          Learn More <ArrowUpRightIcon />
        </a>
      </Button>
    </Empty>
  )
}


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
      <ScheduleProvider>
        <div className="titlebar h-5 w-full fixed top-0 left-0 z-50 bg-transparent" />
        <AppContent />
      </ScheduleProvider>
    </QueryClientProvider>
  )
}

export default App

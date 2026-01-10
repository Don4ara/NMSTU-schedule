import { createHashRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Loader2 } from "lucide-react";
import { MainLayoutSide } from "@/shared/components/layout/MainLayoutSide";

// Lazy load pages
const Dashboard = lazy(() => import("@/pages/home").then(module => ({ default: module.Dashboard })));
const ScheduleViewer = lazy(() => import("@/pages/schedule").then(module => ({ default: module.ScheduleViewer })));
const CalendarViewer = lazy(() => import("@/pages/calendar").then(module => ({ default: module.CalendarViewer })));
const ScheduleComparisonPage = lazy(() => import("@/pages/comparison").then(module => ({ default: module.ScheduleComparisonPage })));

const SuspenseLayout = ({ children }: { children: React.ReactNode }) => (
    <Suspense fallback={<div className="flex h-full w-full items-center justify-center text-muted-foreground"><Loader2 className="h-10 w-10 animate-spin" /></div>}>
        {children}
    </Suspense>
);

export const appRouter = createHashRouter([
    {
        path: "/",
        element: (
            <MainLayoutSide>
                <SuspenseLayout>
                    <Dashboard />
                </SuspenseLayout>
            </MainLayoutSide>
        ),
    },
    {
        path: "/schedule",
        element: (
            <MainLayoutSide>
                <SuspenseLayout>
                    <ScheduleViewer />
                </SuspenseLayout>
            </MainLayoutSide>
        ),
    },
    {
        path: "/calendar",
        element: (
            <MainLayoutSide>
                <SuspenseLayout>
                    <CalendarViewer />
                </SuspenseLayout>
            </MainLayoutSide>
        ),
    },
    {
        path: "/comparison",
        element: (
            <MainLayoutSide>
                <SuspenseLayout>
                    <ScheduleComparisonPage />
                </SuspenseLayout>
            </MainLayoutSide>
        ),
    },
]);

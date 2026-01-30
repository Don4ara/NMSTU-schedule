import { createHashRouter } from 'react-router-dom';
import { lazy } from 'react';

// Lazy load pages
const Dashboard = lazy(() => import("@/pages/home").then(module => ({ default: module.Dashboard })));
const ScheduleViewer = lazy(() => import("@/pages/schedule").then(module => ({ default: module.ScheduleViewer })));
const CalendarViewer = lazy(() => import("@/pages/calendar").then(module => ({ default: module.CalendarPage })));
const ScheduleComparisonPage = lazy(() => import("@/pages/comparison").then(module => ({ default: module.ScheduleComparisonPage })));
const SettingsPage = lazy(() => import("@/pages/settings").then(module => ({ default: module.SettingsPage })));
import MainLayout from "@/app/layouts/main-layout";



export const appRouter = createHashRouter([
    {
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Dashboard />,
            },
            {
                path: "/schedule",
                element: <ScheduleViewer />,
            },
            {
                path: "/calendar",
                element: <CalendarViewer />,
            },
            {
                path: "/comparison",
                element: <ScheduleComparisonPage />,
            },
            {
                path: "/settings",
                element: <SettingsPage />,
            },
        ]
    }
]);

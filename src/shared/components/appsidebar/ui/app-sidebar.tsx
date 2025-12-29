import * as React from "react"
import { Calendar, LayoutList, LayoutDashboard } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarFooter,
} from "@/shared/components/ui/sidebar"
import { TaskflowSwitcher } from "@/shared/components/team-switcher/ui/team-switcher"

import { RecentHistory } from "@/features/search/ui/recent-history"
import { useSchedule } from "@/app/provider/schedule-provider"
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { viewMode, setViewMode } = useSchedule();

    return (
        <Sidebar collapsible="none" {...props}>
            <SidebarHeader className="pt-10 gap-4">
                <TaskflowSwitcher />
                <div className="px-2 flex flex-col gap-1">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                isActive={viewMode === 'dashboard'}
                                onClick={() => setViewMode('dashboard')}
                                tooltip="Главная"
                            >
                                <LayoutDashboard />
                                <span>Главная</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                isActive={viewMode === 'schedule'}
                                onClick={() => setViewMode('schedule')}
                                tooltip="Расписание"
                            >
                                <LayoutList />
                                <span>Расписание</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                isActive={viewMode === 'calendar'}
                                onClick={() => setViewMode('calendar')}
                                tooltip="Календарь"
                            >
                                <Calendar />
                                <span>Календарь</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </div>
                {/* Search is now on the Dashboard page for initial setup */}
                {/* Search is now on the Dashboard page for initial setup */}
            </SidebarHeader>
            <SidebarContent>
                {viewMode === 'schedule' && <RecentHistory />}
            </SidebarContent>
            <SidebarFooter>
            </SidebarFooter>
        </Sidebar >
    )
}

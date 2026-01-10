import * as React from "react"
import { useLocation } from "react-router-dom";
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarFooter,
} from "@/shared/components/ui/sidebar"
import { TaskflowSwitcher } from "@/shared/components/team-switcher/ui/team-switcher"

import { RecentHistory } from "@/features/search/index"
import { SidebarNavigation } from "@/features/navigation"
import { ThemeSwitcher } from "@/features/theme-switcher"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const location = useLocation();

    return (
        <Sidebar collapsible="none" {...props}>
            <SidebarHeader className="pt-10 gap-4">
                <TaskflowSwitcher />
                <div className="px-2 flex flex-col gap-1">
                    <SidebarNavigation />
                </div>
            </SidebarHeader>
            <SidebarContent>
                {location.pathname === '/schedule' && <RecentHistory />}
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <ThemeSwitcher />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar >
    )
}

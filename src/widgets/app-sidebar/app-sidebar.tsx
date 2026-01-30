
"use client"

import * as React from "react"
import { useLocation, Link } from "react-router-dom"
import {
    Calendar,
    CalendarRange,
    Frame,
    GalleryVerticalEnd,
    GitCompare,
    GraduationCap,
    LayoutDashboard,
    Map,
    PieChart,
    Settings,
} from "lucide-react"

import { NavMain } from "./ui/nav-main"
import { TeamSwitcher } from "./ui/team-switcher"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/shared/components/ui/sidebar"
import { RecentHistory } from "@/features/search";
import { ThemeSwitcher } from "@/features/theme-switcher"

// This is sample data.
const data = {
    teams: [
        {
            name: "Acme Inc",
            logo: GraduationCap,
            plan: "Enterprise",
        },
    ],
    navMain: [
        {
            title: "Главная",
            url: "/",
            icon: LayoutDashboard,
        },
        {
            title: "Расписание",
            url: "/schedule",
            icon: CalendarRange,
        },
        {
            title: "Календарь",
            url: "/calendar",
            icon: Calendar,
        },
        {
            title: "Сравнение",
            url: "/comparison",
            icon: GitCompare,
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const location = useLocation();

    return (
        <Sidebar collapsible="icon" variant="floating" {...props} className="mt-8 !h-[calc(100svh-2rem)]">
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                {location.pathname.startsWith('/schedule') && <RecentHistory />}
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip="Настройки" isActive={location.pathname === "/settings"}>
                            <Link to="/settings">
                                <Settings />
                                <span>Настройки</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <ThemeSwitcher />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}


"use client"

import * as React from "react"
import { useLocation, Link } from "react-router-dom"
import {
    GraduationCap,
    Settings,
} from "lucide-react"

import { cn } from "@/shared/lib/utils"
import { NAV_ITEMS } from "@/shared/config"
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
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const location = useLocation();

    return (
        // top-10: сайдбар начинается под полосой вкладок (TabBar h-10)
        <Sidebar
            collapsible="offcanvas"
            variant="inset"
            {...props}
            className={cn(
                'top-10 bottom-0 h-auto',
                // микро-зазор: подсветка читается как пилюля, а не сплошная полоса
                '[&_[data-slot=sidebar-menu]]:gap-0.5',
                // плотнее: строка 28px и 13px текста вместо стоковых 32/14 —
                // data-size=default, чтобы не задеть крупные lg-кнопки
                '[&_[data-slot=sidebar-menu-button][data-size=default]]:h-7',
                '[&_[data-slot=sidebar-menu-button]]:text-[13px]',
                '[&_[data-slot=sidebar-menu-sub-button]]:text-[13px]',
                // пункты чуть плотнее по начертанию
                '[&_[data-slot=sidebar-menu-button]]:font-medium',
                '[&_[data-slot=sidebar-menu-sub-button]]:font-medium',
                // text-sidebar-foreground, а не белый литералом: в тёмной теме это
                // oklch(0.985) — тот же белый, в светлой не становится нечитаемым
                '[&_[data-slot=sidebar-menu-button]]:text-sidebar-foreground',
                '[&_[data-slot=sidebar-menu-sub-button]]:text-sidebar-foreground',
                '[&_[data-slot=sidebar-group-label]]:h-7',
            )}
        >
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={NAV_ITEMS} />
                {location.pathname.startsWith('/schedule') && <RecentHistory />}
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <ThemeSwitcher />
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip="Настройки" isActive={location.pathname === "/settings"}>
                            <Link to="/settings">
                                <Settings />
                                <span>Настройки</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}

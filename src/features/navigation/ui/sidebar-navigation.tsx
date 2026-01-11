import { Calendar, LayoutList, LayoutDashboard, SplitSquareHorizontal } from "lucide-react"
import {
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/shared/components/ui/sidebar"
import { NavLink } from "react-router-dom"

export function SidebarNavigation() {
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <NavLink to="/">
                    {({ isActive }) => (
                        <SidebarMenuButton isActive={isActive} tooltip="Главная">
                            <LayoutDashboard />
                            <span>Главная</span>
                        </SidebarMenuButton>
                    )}
                </NavLink>
            </SidebarMenuItem>

            <SidebarMenuItem>
                <NavLink to="/schedule">
                    {({ isActive }) => (
                        <SidebarMenuButton isActive={isActive} tooltip="Расписание">
                            <LayoutList />
                            <span>Расписание</span>
                        </SidebarMenuButton>
                    )}
                </NavLink>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <NavLink to="/calendar">
                    {({ isActive }) => (
                        <SidebarMenuButton isActive={isActive} tooltip="Календарь">
                            <Calendar />
                            <span>Календарь</span>
                        </SidebarMenuButton>
                    )}
                </NavLink>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <NavLink to="/comparison">
                    {({ isActive }) => (
                        <SidebarMenuButton isActive={isActive} tooltip="Сравнение">
                            <SplitSquareHorizontal />
                            <span>Сравнение</span>
                        </SidebarMenuButton>
                    )}
                </NavLink>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}


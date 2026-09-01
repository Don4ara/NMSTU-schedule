import { Link, useLocation } from "react-router-dom"
import { type LucideIcon } from "lucide-react"

import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/shared/components/ui/sidebar"

export function NavMain({
    items,
}: {
    items: {
        title: string
        path: string
        icon?: LucideIcon
    }[]
}) {
    const { pathname } = useLocation()
    return (
        <SidebarGroup>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.path}>
                        <SidebarMenuButton
                            asChild
                            tooltip={item.title}
                            isActive={item.path === "/" ? pathname === "/" : pathname.startsWith(item.path)}
                        >
                            <Link to={item.path}>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}

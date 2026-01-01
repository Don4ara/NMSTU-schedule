"use client"



import { GraduationCap } from "lucide-react"

import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/shared/components/ui/sidebar"

export function TaskflowSwitcher() {
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <div className="flex items-center gap-2 px-2 py-1.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                        <GraduationCap className="h-5 w-5" />
                    </div>
                    <span className="truncate text-base font-semibold text-slate-900">NMSTU</span>
                </div>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}

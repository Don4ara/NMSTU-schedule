import React from 'react';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarGroupAction
} from "@/shared/components/ui/sidebar";
import { useSchedule } from "@/app/provider/schedule-provider";
import { Users, User, Trash2 } from "lucide-react";

export const RecentHistory = React.memo(function RecentHistory() {
    const { recentEntities, setSelectedEntity, clearHistory } = useSchedule();

    if (recentEntities.length === 0) return null;

    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Недавние</SidebarGroupLabel>
            <SidebarGroupAction title="Очистить историю" onClick={clearHistory}>
                <Trash2 />
            </SidebarGroupAction>
            <SidebarMenu>
                {recentEntities.map((item) => (
                    <SidebarMenuItem key={`${item.type}-${item.id}`}>
                        <SidebarMenuButton
                            onClick={() => setSelectedEntity(item)}
                            tooltip={item.name}
                        >
                            {item.type === 'group' ? <Users className="text-slate-500" /> : <User className="text-slate-500" />}
                            <span>{item.name}</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
});


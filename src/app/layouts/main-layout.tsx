import { AppSidebar } from "@/widgets/app-sidebar"
import {
    SidebarInset,
    SidebarProvider,
} from "@/shared/components/ui/sidebar"
import { Outlet } from "react-router-dom"
import React, { useState } from "react";

export default function MainLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(() => {
        const stored = localStorage.getItem("sidebar_state");
        return stored !== null ? stored === "true" : true;
    });

    const handleOpenChange = (open: boolean) => {
        setSidebarOpen(open);
        localStorage.setItem("sidebar_state", String(open));
    };

    return (
        <SidebarProvider
            open={sidebarOpen}
            onOpenChange={handleOpenChange}
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 45)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AppSidebar />
            <SidebarInset>
                <div className="flex flex-1 w-full flex-col justify-center gap-2 p-2">
                    <Outlet />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

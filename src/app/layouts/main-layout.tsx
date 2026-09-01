import { AppSidebar } from "@/widgets/app-sidebar"
import {
    SidebarInset,
    SidebarProvider,
} from "@/shared/components/ui/sidebar"
import { Outlet } from "react-router-dom"
import React, { useEffect, useState } from "react";
import { DataSourceInfo } from "@/features/data-source-info";
import { TabBar } from "@/widgets/tab-bar";
import { TOGGLE_SIDEBAR_EVENT } from "@/shared/lib/ui-events";
import { cn } from "@/shared/lib/utils";

export default function MainLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(() => {
        const stored = localStorage.getItem("sidebar_state");
        return stored !== null ? stored === "true" : true;
    });

    const handleOpenChange = (open: boolean) => {
        setSidebarOpen(open);
        localStorage.setItem("sidebar_state", String(open));
    };

    // кнопка в полосе вкладок сигналит событием — состояние живёт здесь
    useEffect(() => {
        const toggle = () => handleOpenChange(!sidebarOpen);
        window.addEventListener(TOGGLE_SIDEBAR_EVENT, toggle);
        return () => window.removeEventListener(TOGGLE_SIDEBAR_EVENT, toggle);
    }, [sidebarOpen]);

    return (
        <div
            className={cn(
                "flex h-svh flex-col overflow-hidden",
                // стоковые 200ms ease-linear идут механически. Кривая ниже мягко
                // трогается, разгоняется в середине и мягко тормозит в конце —
                // задаём её всем участникам сразу, чтобы шли в такт
                "[&_[data-slot=sidebar-container]]:duration-200 [&_[data-slot=sidebar-container]]:ease-[cubic-bezier(0.4,0,0.2,1)]",
                "[&_[data-slot=sidebar-gap]]:duration-200 [&_[data-slot=sidebar-gap]]:ease-[cubic-bezier(0.4,0,0.2,1)]",
                "[&_[data-slot=tabbar-spacer]]:duration-200 [&_[data-slot=tabbar-spacer]]:ease-[cubic-bezier(0.4,0,0.2,1)]",
            )}
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 45)",
                } as React.CSSProperties
            }
        >
            {/* полоса вкладок на всю ширину — сайдбар начинается под ней */}
            <TabBar sidebarOpen={sidebarOpen} />
            <SidebarProvider
                open={sidebarOpen}
                onOpenChange={handleOpenChange}
                className="min-h-0 flex-1"
                style={
                    {
                        "--sidebar-width": "inherit",
                        "--header-height": "calc(var(--spacing) * 12)",
                    } as React.CSSProperties
                }
            >
                <AppSidebar />
                <SidebarInset className="relative min-w-0 overflow-hidden transition-[margin] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] md:peer-data-[variant=inset]:mt-0">
                    {/* скроллится этот контейнер, а не окно: полоса вкладок и
                        сайдбар остаются на месте */}
                    <main className="min-h-0 flex-1 overflow-y-auto">
                        <div className="flex min-h-full w-full flex-col justify-center gap-2 p-2">
                            <Outlet />
                        </div>
                    </main>
                    <DataSourceInfo />
                </SidebarInset>
            </SidebarProvider>
        </div>
    )
}

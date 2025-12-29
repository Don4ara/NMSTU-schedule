import * as React from "react";
import { SidebarInset, SidebarProvider } from "@/shared/components/ui/sidebar";
import { AppSidebar } from "@/shared/components/appsidebar/ui/app-sidebar";
import { SiteHeader } from "@/widgets/header/ui/Header";

export function MainLayoutSide({
    children,
    defaultOpen,
}: React.PropsWithChildren<{ defaultOpen?: boolean }>) {
    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 45)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
            defaultOpen={defaultOpen ?? true}
        >
            <AppSidebar variant="sidebar" />
            <SidebarInset className="pt-4">
                <SiteHeader />
                <div className="flex flex-1 flex-col overflow-y-auto">
                    <div className="flex-1">{children}</div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}

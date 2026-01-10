import * as React from "react";
import { SidebarInset, SidebarProvider } from "@/shared/components/ui/sidebar";
import { AppSidebar } from "@/widgets/sidebar";

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
            <SidebarInset>
                <div className="flex flex-1 flex-col overflow-y-auto bg-background">
                    <div className="flex-1">{children}</div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}

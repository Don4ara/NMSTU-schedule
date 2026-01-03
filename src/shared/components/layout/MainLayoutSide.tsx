import * as React from "react";
import { motion } from "framer-motion";
import { SidebarInset, SidebarProvider } from "@/shared/components/ui/sidebar";
import { AppSidebar } from "@/shared/components/appsidebar/ui/app-sidebar";

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
                <motion.div
                    className="flex flex-1 flex-col overflow-y-auto"
                    layout
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                    }}
                >
                    <div className="flex-1">{children}</div>
                </motion.div>
            </SidebarInset>
        </SidebarProvider>
    );
}

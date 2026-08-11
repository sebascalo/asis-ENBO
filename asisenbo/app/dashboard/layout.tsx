"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import NavBarDashboard from "@/components/NavBarDashboard";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full flex-col">
                <NavBarDashboard />
                <div className="flex flex-1">
                    <AppSidebar />
                    <div className="flex-1">
                        <SidebarTrigger />
                        <main className="p-4 bg-green-50">
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </SidebarProvider>
    );
}
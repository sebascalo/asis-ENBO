'use client';

import {
    Sidebar,
    SidebarContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
    Users,
    ClipboardList,
} from "lucide-react";
import { useRouter, usePathname } from 'next/navigation';

export function AppSidebar() {
    const router = useRouter();
    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname === path || pathname?.startsWith(path);
    };

    return (
        <Sidebar variant="inset" collapsible="icon" className="relative flex flex-col h-full w-64 border-r bg-[#fef9e7]">
            <SidebarContent className="bg-[#fef9e7]">

                {/* ================= SECCIÓN 1: GESTIÓN DE APRENDICES ================= */}
                <div className="px-3 py-2 mt-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-yellow-700 uppercase tracking-wider group-data-[collapsible=icon]:justify-center">
                        <Users size={14} />
                        <span className="group-data-[collapsible=icon]:hidden">Gestión de Aprendices</span>
                    </div>
                </div>

                {/* Opciones de Estudiantes */}
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            className={`hover:bg-yellow-100 cursor-pointer py-2.5 px-3 rounded-lg transition-colors text-green-800 hover:text-green-800 group-data-[collapsible=icon]:justify-center ${
                                isActive('/dashboard/students/create') ? 'bg-yellow-200 text-green-800 hover:bg-yellow-200 hover:text-green-800' : ''
                            }`}
                            onClick={() => router.push('/dashboard/students/formStudents')}
                        >
                            <Users size={20} />
                            <span className="group-data-[collapsible=icon]:hidden">Crear Aprendiz</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            className={`hover:bg-yellow-100 cursor-pointer py-2.5 px-3 rounded-lg transition-colors text-green-800 hover:text-green-800 group-data-[collapsible=icon]:justify-center ${
                                isActive('/dashboard/students/list') ? 'bg-yellow-200 text-green-800 hover:bg-yellow-200 hover:text-green-800' : ''
                            }`}
                            onClick={() => router.push('/dashboard/students/listStudents')}
                        >
                            <Users size={20} />
                            <span className="group-data-[collapsible=icon]:hidden">Listar Aprendices</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>

                {/* Separador */}
                <div className="my-2 border-t border-yellow-200/30 mx-3" />

                {/* ================= SECCIÓN 2: ASISTENCIAS ================= */}
                <div className="px-3 py-2 mt-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-yellow-700 uppercase tracking-wider group-data-[collapsible=icon]:justify-center">
                        <ClipboardList size={14} />
                        <span className="group-data-[collapsible=icon]:hidden">Gestión de Asistencias</span>
                    </div>
                </div>

                {/* Opciones de Asistencias */}
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            className={`hover:bg-yellow-100 cursor-pointer py-2.5 px-3 rounded-lg transition-colors text-green-800 hover:text-green-800 group-data-[collapsible=icon]:justify-center ${
                                isActive('/dashboard/attendances/register') ? 'bg-yellow-200 text-green-800 hover:bg-yellow-200 hover:text-green-800' : ''
                            }`}
                            onClick={() => router.push('/dashboard/attendance/formAttendances')}
                        >
                            <ClipboardList size={20} />
                            <span className="group-data-[collapsible=icon]:hidden">Crear asistencia</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            className={`hover:bg-yellow-100 cursor-pointer py-2.5 px-3 rounded-lg transition-colors text-green-800 hover:text-green-800 group-data-[collapsible=icon]:justify-center ${
                                isActive('/dashboard/attendances/list') ? 'bg-yellow-200 text-green-800 hover:bg-yellow-200 hover:text-green-800' : ''
                            }`}
                            onClick={() => router.push('/dashboard/attendance/listAttendances')}
                        >
                            <ClipboardList size={20} />
                            <span className="group-data-[collapsible=icon]:hidden">Listar asistencias</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    );
}
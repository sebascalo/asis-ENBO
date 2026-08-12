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
    BarChart3,
    User,
    LogOut
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
                            <span className="group-data-[collapsible=icon]:hidden">Crear estudiante</span>
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
                            <span className="group-data-[collapsible=icon]:hidden">Listar estudiantes</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>

                {/* Separador */}
                <div className="my-2 border-t border-yellow-200/30 mx-3" />

                {/* ================= SECCIÓN 2: ASISTENCIAS ================= */}
                <div className="px-3 py-2 mt-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-yellow-700 uppercase tracking-wider group-data-[collapsible=icon]:justify-center">
                        <ClipboardList size={14} />
                        <span className="group-data-[collapsible=icon]:hidden">Asistencias</span>
                    </div>
                </div>

                {/* Opciones de Asistencias */}
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            className={`hover:bg-yellow-100 cursor-pointer py-2.5 px-3 rounded-lg transition-colors text-green-800 hover:text-green-800 group-data-[collapsible=icon]:justify-center ${
                                isActive('/dashboard/attendances/register') ? 'bg-yellow-200 text-green-800 hover:bg-yellow-200 hover:text-green-800' : ''
                            }`}
                            onClick={() => router.push('/dashboard/attendances/register')}
                        >
                            <ClipboardList size={20} />
                            <span className="group-data-[collapsible=icon]:hidden">Registrar asistencia</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            className={`hover:bg-yellow-100 cursor-pointer py-2.5 px-3 rounded-lg transition-colors text-green-800 hover:text-green-800 group-data-[collapsible=icon]:justify-center ${
                                isActive('/dashboard/attendances/list') ? 'bg-yellow-200 text-green-800 hover:bg-yellow-200 hover:text-green-800' : ''
                            }`}
                            onClick={() => router.push('/dashboard/attendances/list')}
                        >
                            <ClipboardList size={20} />
                            <span className="group-data-[collapsible=icon]:hidden">Listar asistencias</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>

                {/* Separador */}
                <div className="my-2 border-t border-yellow-200/30 mx-3" />

                {/* ================= SECCIÓN 3: REPORTES ================= */}
                <div className="px-3 py-2 mt-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-yellow-700 uppercase tracking-wider group-data-[collapsible=icon]:justify-center">
                        <BarChart3 size={14} />
                        <span className="group-data-[collapsible=icon]:hidden">Reportes</span>
                    </div>
                </div>

                {/* Opciones de Reportes */}
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            className={`hover:bg-yellow-100 cursor-pointer py-2.5 px-3 rounded-lg transition-colors text-green-800 hover:text-green-800 group-data-[collapsible=icon]:justify-center ${
                                isActive('/dashboard/reports/attendance') ? 'bg-yellow-200 text-green-800 hover:bg-yellow-200 hover:text-green-800' : ''
                            }`}
                            onClick={() => router.push('/dashboard/reports/attendance')}
                        >
                            <BarChart3 size={20} />
                            <span className="group-data-[collapsible=icon]:hidden">Reporte de asistencias</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            className={`hover:bg-yellow-100 cursor-pointer py-2.5 px-3 rounded-lg transition-colors text-green-800 hover:text-green-800 group-data-[collapsible=icon]:justify-center ${
                                isActive('/dashboard/reports/students') ? 'bg-yellow-200 text-green-800 hover:bg-yellow-200 hover:text-green-800' : ''
                            }`}
                            onClick={() => router.push('/dashboard/reports/students')}
                        >
                            <BarChart3 size={20} />
                            <span className="group-data-[collapsible=icon]:hidden">Reporte de estudiantes</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>

                {/* Separador */}
                <div className="my-2 border-t border-yellow-200/30 mx-3" />

                {/* ================= OPCIONES DE USUARIO ================= */}
                <div className="px-3 mt-auto">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                className={`hover:bg-yellow-100 cursor-pointer py-2.5 px-3 rounded-lg transition-colors text-green-800 hover:text-green-800 ${
                                    isActive('/dashboard/profile') ? 'bg-yellow-200 text-green-800 hover:bg-yellow-200 hover:text-green-800' : ''
                                }`}
                                onClick={() => router.push('/dashboard/profile')}
                            >
                                <User size={20} />
                                <span className="font-medium">Perfil</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                className="hover:bg-yellow-100 cursor-pointer py-2.5 px-3 rounded-lg transition-colors text-green-800 hover:text-green-800"
                                onClick={() => router.push('/login')}
                            >
                                <LogOut size={20} />
                                <span className="font-medium">Cerrar sesión</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </div>

            </SidebarContent>
        </Sidebar>
    );
}   
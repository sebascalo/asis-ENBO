'use client';

import {
    Sidebar,
    SidebarContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarMenuSubButton
} from "@/components/ui/sidebar";
import {
    ChevronDown,
    Users,
    ClipboardList,
    BarChart3,
    User,
    LogOut
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
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

                {/* Módulo Estudiantes */}
                <Collapsible defaultOpen={isActive('/dashboard/students')} className="group/collapsible">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <CollapsibleTrigger asChild className="text-green-800 hover:text-green-800 hover:bg-yellow-100">
                                <SidebarMenuButton className={`hover:bg-yellow-100 cursor-pointer group-data-[collapsible=icon]:justify-center ${
                                    isActive('/dashboard/students') ? 'bg-yellow-200 text-green-800 hover:bg-yellow-200 hover:text-green-800' : 'text-green-800'
                                }`}>
                                    <Users size={20} />
                                    <span className="group-data-[collapsible=icon]:hidden">Estudiantes</span>
                                    <ChevronDown className="ml-auto transition-transform group-data-[collapsible=icon]:hidden group-data-[state=open]/collapsible:rotate-180" />
                                </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="group-data-[collapsible=icon]:hidden">
                                <SidebarMenuSub>
                                    <SidebarMenuSubItem>
                                        <SidebarMenuSubButton
                                            className={`hover:bg-yellow-100 text-green-800 hover:text-green-800 cursor-pointer ${
                                                isActive('/dashboard/students/create') ? 'bg-yellow-200 text-green-800 hover:bg-yellow-200 hover:text-green-800' : ''
                                            }`}
                                            onClick={() => router.push('/dashboard/students/create')}
                                        >
                                            <span>Crear estudiante</span>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                    <SidebarMenuSubItem>
                                        <SidebarMenuSubButton
                                            className={`hover:bg-yellow-100 text-green-800 hover:text-green-800 cursor-pointer ${
                                                isActive('/dashboard/students/list') ? 'bg-yellow-200 text-green-800 hover:bg-yellow-200 hover:text-green-800' : ''
                                            }`}
                                            onClick={() => router.push('/dashboard/students/list')}
                                        >
                                            <span>Listar estudiantes</span>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </Collapsible>

                {/* Separador */}
                <div className="my-2 border-t border-yellow-200/30 mx-3" />

                {/* ================= SECCIÓN 2: ASISTENCIAS ================= */}
                <div className="px-3 py-2 mt-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-yellow-700 uppercase tracking-wider group-data-[collapsible=icon]:justify-center">
                        <ClipboardList size={14} />
                        <span className="group-data-[collapsible=icon]:hidden">Asistencias</span>
                    </div>
                </div>

                {/* Módulo Asistencias */}
                <Collapsible defaultOpen={isActive('/dashboard/attendances')} className="group/collapsible">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <CollapsibleTrigger asChild className="text-green-800 hover:text-green-800 hover:bg-yellow-100">
                                <SidebarMenuButton className={`hover:bg-yellow-100 cursor-pointer group-data-[collapsible=icon]:justify-center ${
                                    isActive('/dashboard/attendances') ? 'bg-yellow-200 text-green-800 hover:bg-yellow-200 hover:text-green-800' : 'text-green-800'
                                }`}>
                                    <ClipboardList size={20} />
                                    <span className="group-data-[collapsible=icon]:hidden">Asistencias</span>
                                    <ChevronDown className="ml-auto transition-transform group-data-[collapsible=icon]:hidden group-data-[state=open]/collapsible:rotate-180" />
                                </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="group-data-[collapsible=icon]:hidden">
                                <SidebarMenuSub>
                                    <SidebarMenuSubItem>
                                        <SidebarMenuSubButton
                                            className={`hover:bg-yellow-100 text-green-800 hover:text-green-800 cursor-pointer ${
                                                isActive('/dashboard/attendances/register') ? 'bg-yellow-200 text-green-800 hover:bg-yellow-200 hover:text-green-800' : ''
                                            }`}
                                            onClick={() => router.push('/dashboard/attendances/register')}
                                        >
                                            <span>Registrar asistencia</span>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                    <SidebarMenuSubItem>
                                        <SidebarMenuSubButton
                                            className={`hover:bg-yellow-100 text-green-800 hover:text-green-800 cursor-pointer ${
                                                isActive('/dashboard/attendances/list') ? 'bg-yellow-200 text-green-800 hover:bg-yellow-200 hover:text-green-800' : ''
                                            }`}
                                            onClick={() => router.push('/dashboard/attendances/list')}
                                        >
                                            <span>Listar asistencias</span>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </Collapsible>

                {/* Separador */}
                <div className="my-2 border-t border-yellow-200/30 mx-3" />

                {/* ================= SECCIÓN 3: REPORTES ================= */}
                <div className="px-3 py-2 mt-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-yellow-700 uppercase tracking-wider group-data-[collapsible=icon]:justify-center">
                        <BarChart3 size={14} />
                        <span className="group-data-[collapsible=icon]:hidden">Reportes</span>
                    </div>
                </div>

                {/* Módulo Reportes */}
                <Collapsible defaultOpen={isActive('/dashboard/reports')} className="group/collapsible">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <CollapsibleTrigger asChild className="text-green-800 hover:text-green-800 hover:bg-yellow-100">
                                <SidebarMenuButton className={`hover:bg-yellow-100 cursor-pointer group-data-[collapsible=icon]:justify-center ${
                                    isActive('/dashboard/reports') ? 'bg-yellow-200 text-green-800 hover:bg-yellow-200 hover:text-green-800' : 'text-green-800'
                                }`}>
                                    <BarChart3 size={20} />
                                    <span className="group-data-[collapsible=icon]:hidden">Reportes</span>
                                    <ChevronDown className="ml-auto transition-transform group-data-[collapsible=icon]:hidden group-data-[state=open]/collapsible:rotate-180" />
                                </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="group-data-[collapsible=icon]:hidden">
                                <SidebarMenuSub>
                                    <SidebarMenuSubItem>
                                        <SidebarMenuSubButton
                                            className={`hover:bg-yellow-100 text-green-800 hover:text-green-800 cursor-pointer ${
                                                isActive('/dashboard/reports/attendance') ? 'bg-yellow-200 text-green-800 hover:bg-yellow-200 hover:text-green-800' : ''
                                            }`}
                                            onClick={() => router.push('/dashboard/reports/attendance')}
                                        >
                                            <span>Reporte de asistencias</span>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                    <SidebarMenuSubItem>
                                        <SidebarMenuSubButton
                                            className={`hover:bg-yellow-100 text-green-800 hover:text-green-800 cursor-pointer ${
                                                isActive('/dashboard/reports/students') ? 'bg-yellow-200 text-green-800 hover:bg-yellow-200 hover:text-green-800' : ''
                                            }`}
                                            onClick={() => router.push('/dashboard/reports/students')}
                                        >
                                            <span>Reporte de estudiantes</span>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </Collapsible>

                {/* Separador */}
                <div className="my-2 border-t border-yellow-200/30 mx-3" />

                {/* ================= OPCIONES DE USUARIO ================= */}
                <div className="px-3">
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
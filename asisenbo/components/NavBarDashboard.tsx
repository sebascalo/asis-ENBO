"use client";

import logo from "@/public/LOGOasisENBO.png";
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
    User,
    Bell,
    LogOut,
    ChevronDown
} from "lucide-react";

export default function NavBarDashboard() {
    return (
        <nav className="h-[60px] relative w-full px-2 md:px-6 lg:px-10 xl:px-16 flex items-center justify-between z-30 shadow-md transition-all" style={{ backgroundColor: '#f4db02' }}>
            {/* Logo - Izquierda */}
            <div className="flex items-center gap-2">
                <Image src={logo} alt="Logo AsisENBO" width={50} height={50} />
                <span className="text-green-900 font-bold text-2xl tracking-wide">
                    asisENBO
                </span>
            </div>
        </nav>
    );
}
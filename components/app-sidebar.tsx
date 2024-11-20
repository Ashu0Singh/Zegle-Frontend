import * as React from "react";
import { ChevronRight, File, Folder } from "lucide-react";
import { SidebarRoutes } from "@/data";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { AdelleSansExtraBold } from "@/app/layout";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar {...props}>
            <SidebarHeader className={"zegle"}>Zegle</SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {SidebarRoutes.routes.map((item, index) => (
                                <SidebarMenuItem key={index}>
                                    <Link href={item.route}>
                                        <SidebarMenuButton>
                                            <File />
                                            {item.text}
                                        </SidebarMenuButton>
                                    </Link>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}

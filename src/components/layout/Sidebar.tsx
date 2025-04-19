import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, ClipboardList, Share2, UserCircle } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Logo from "./Logo";
import LogoutButton from "@/components/auth/LogoutButton";

const MainSidebar = () => {
  const location = useLocation();

  // Navigation items
  const navItems = [{
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard"
  }, {
    label: "Order Form",
    icon: ClipboardList,
    path: "/order-form"
  }, {
    label: "Orders",
    icon: ClipboardList,
    path: "/orders"
  }, {
    label: "Share",
    icon: Share2,
    path: "/share"
  }];

  const isActive = (path: string) => {
    // Special case for the root path
    if (path === "/" && location.pathname === "/") {
      return true;
    }
    // For other paths, check if the current path starts with the menu path
    // This will highlight parent routes when on child routes
    return path !== "/" && location.pathname.startsWith(path);
  };

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="flex items-center justify-center py-4 border-b">
              <Logo />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map(item => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild isActive={isActive(item.path)} tooltip={item.label}>
                    <Link to={item.path}>
                      <item.icon size={20} />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-white border-t border-gray-200">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton asChild isActive={isActive("/account")} tooltip="Account Settings">
                      <div className="flex items-center gap-2 cursor-pointer w-full">
                        <UserCircle size={20} />
                        <span>Account Settings</span>
                      </div>
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" align="start" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link to="/account" className="flex items-center gap-2">
                        <UserCircle className="h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <LogoutButton variant="ghost" className="w-full justify-start" />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
};

export default MainSidebar;

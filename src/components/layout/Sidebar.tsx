
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, ClipboardList, Share2, UserCircle, FileText } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

const MainSidebar = () => {
  const location = useLocation();

  // Navigation items - removed Login/Register item
  const navItems = [{
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard"
  }, {
    label: "Order Form",
    icon: ClipboardList,
    path: "/"
  }, {
    label: "Orders",
    icon: ClipboardList,
    path: "/orders"
  }, {
    label: "Share",
    icon: Share2,
    path: "/share"
  }];

  // Account items (at bottom) - removed Login/Register
  const accountItems = [{
    label: "Account",
    icon: UserCircle,
    path: "/account"
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

  return <Sidebar className="border-r border-gray-200">
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="flex items-center justify-center py-4 border-b">
              <div className="flex items-center space-x-2">
                <FileText size={24} className="text-primary" />
                <span className="text-lg font-semibold">Roster Form</span>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map(item => <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild isActive={isActive(item.path)} tooltip={item.label}>
                    <Link to={item.path}>
                      <item.icon size={20} />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-white">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountItems.map(item => <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild isActive={isActive(item.path)} tooltip={item.label}>
                    <Link to={item.path}>
                      <item.icon size={20} />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>;
};

export default MainSidebar;


import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, ClipboardList, Share2, UserCircle } from "lucide-react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem 
} from "@/components/ui/sidebar";
import Logo from "./Logo";
import { useIsMobile } from "@/hooks/use-mobile";

const MainSidebar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();

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

  // Use different class name for mobile
  const sidebarClassName = isMobile 
    ? "bg-white h-full w-full" 
    : "border-r border-gray-200";

  return (
    <Sidebar className={sidebarClassName}>
      <SidebarContent className="bg-white">
        {isMobile && (
          <SidebarGroup>
            <SidebarGroupContent>
              <div className="flex items-center justify-center py-4 border-b">
                <Logo />
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map(item => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild isActive={isActive(item.path)} tooltip={item.label}>
                    <Link to={item.path} className="flex items-center gap-3 py-2">
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
                <SidebarMenuButton asChild isActive={isActive("/account")} tooltip="Account Settings">
                  <Link to="/account" className="flex items-center gap-3 py-2">
                    <UserCircle size={20} />
                    <span>Account Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
};

export default MainSidebar;

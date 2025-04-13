
import React from "react";
import { SidebarProvider, SidebarRail } from "@/components/ui/sidebar";
import MainSidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <MainSidebar />
        <SidebarRail />
        <main className="flex-1 overflow-x-hidden bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;

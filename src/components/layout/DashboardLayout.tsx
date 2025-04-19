
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import MobileHeader from "./MobileHeader";
import MainSidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full flex-col">
        <MobileHeader />
        <div className="flex flex-1">
          <MainSidebar />
          <main className="flex-1 overflow-x-hidden p-4 md:p-6 lg:p-8 bg-gray-50/0">
            <div className="mx-auto max-w-7xl">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;


import React from "react";
import { useLayout } from "@/context/LayoutContext";
import DashboardLayout from "./DashboardLayout";
import MobileHeader from "./MobileHeader";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { isDashboardLayout } = useLayout();

  if (isDashboardLayout) {
    return <DashboardLayout>{children}</DashboardLayout>;
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <MobileHeader />
      <div className="flex-1">
        <div className="container mx-auto p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;

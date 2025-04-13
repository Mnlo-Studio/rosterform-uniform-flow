import React from "react";
import { useLayout } from "@/context/LayoutContext";
import DashboardLayout from "./DashboardLayout";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { isDashboardLayout } = useLayout();

  // If it's a dashboard route, use the dashboard layout
  if (isDashboardLayout) {
    return <DashboardLayout>{children}</DashboardLayout>;
  }

  // Otherwise use a clean layout with just the content
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
};

export default MainLayout;

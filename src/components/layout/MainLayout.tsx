
import React from "react";
import { useLayout } from "@/context/LayoutContext";
import DashboardLayout from "./DashboardLayout";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { isDashboardLayout } = useLayout();

  // If it's a dashboard route, use the dashboard layout with sidebar
  if (isDashboardLayout) {
    return <DashboardLayout>{children}</DashboardLayout>;
  }

  // Otherwise use a clean layout with just the content
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;

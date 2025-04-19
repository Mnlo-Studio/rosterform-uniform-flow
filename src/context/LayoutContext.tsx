
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type LayoutContextType = {
  isDashboardLayout: boolean;
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
  closeSidebar: () => void;
};

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function useLayout() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
}

const PUBLIC_ROUTES = ['/success'];
const PUBLIC_PARAMS = ['share=true', 'embed=true'];

export const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDashboardLayout, setIsDashboardLayout] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  
  useEffect(() => {
    const isPublicRoute = PUBLIC_ROUTES.includes(location.pathname);
    const hasPublicParam = PUBLIC_PARAMS.some(param => location.search.includes(param));
    const isSharePath = location.pathname.startsWith('/share/');
    
    const shouldUseDashboardLayout = !isPublicRoute && !hasPublicParam && !isSharePath;
    
    setIsDashboardLayout(shouldUseDashboardLayout);
    
    // Close the sidebar when changing routes on mobile
    if (window.innerWidth < 768) {
      closeSidebar();
    }
  }, [location]);

  return (
    <LayoutContext.Provider value={{ isDashboardLayout, toggleSidebar, isSidebarOpen, closeSidebar }}>
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutContext;

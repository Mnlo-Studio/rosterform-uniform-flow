
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type LayoutContextType = {
  isDashboardLayout: boolean;
};

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function useLayout() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
}

// These are pages that should always use the clean layout (no sidebar)
const PUBLIC_ROUTES = ['/', '/success'];

// URLs with these parameters should use the clean layout
const PUBLIC_PARAMS = ['share=true', 'embed=true'];

export const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [isDashboardLayout, setIsDashboardLayout] = useState(false);
  
  useEffect(() => {
    // Check if current path should use dashboard layout
    const isPublicRoute = PUBLIC_ROUTES.includes(location.pathname);
    const hasPublicParam = PUBLIC_PARAMS.some(param => location.search.includes(param));
    const isSharePath = location.pathname.startsWith('/share/');
    
    // Show dashboard layout unless it's a public route, has public parameters, or is a share path
    const shouldUseDashboardLayout = !isPublicRoute && !hasPublicParam && !isSharePath;
    
    setIsDashboardLayout(shouldUseDashboardLayout);
  }, [location]);

  return (
    <LayoutContext.Provider value={{ isDashboardLayout }}>
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutContext;


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
const PUBLIC_ROUTES = ['/', '/success', '/share/embed'];

export const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [isDashboardLayout, setIsDashboardLayout] = useState(false);
  
  useEffect(() => {
    // Check if current path should use dashboard layout
    const shouldUseDashboardLayout = !PUBLIC_ROUTES.includes(location.pathname) && 
      // If the URL has a share parameter or is explicitly a shared view, don't show dashboard
      !location.search.includes('share=true') && 
      !location.pathname.startsWith('/share/');
    
    setIsDashboardLayout(shouldUseDashboardLayout);
  }, [location]);

  return (
    <LayoutContext.Provider value={{ isDashboardLayout }}>
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutContext;

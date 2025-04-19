
import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLayout } from '@/context/LayoutContext';
import { useIsMobile } from '@/hooks/use-mobile';
import Logo from './Logo';

const MobileHeader = () => {
  const { toggleSidebar } = useLayout();
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4">
        <div className="flex flex-1 items-center justify-between">
          <Logo />
          <Button 
            variant="ghost" 
            size="icon"
            className="ml-auto"
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;

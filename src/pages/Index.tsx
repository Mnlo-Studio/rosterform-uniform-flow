
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import CustomerInfoForm from '@/components/CustomerInfoForm';
import ProductInfoForm from '@/components/ProductInfoForm';
import { BulkOptionsToolbar } from '@/components/bulk-options';
import RosterTable from '@/components/RosterTable';
import OrderSummary from '@/components/OrderSummary';
import BackToSuccessLink from '@/components/BackToSuccessLink';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { ClipboardList } from 'lucide-react';
import { useLayout } from '@/context/LayoutContext';

const Index = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const [showBackLink, setShowBackLink] = useState(false);
  const { isDashboardLayout } = useLayout();
  
  useEffect(() => {
    // Check if user came from success page (has state)
    const fromSuccess = location.state && location.state.fromSuccess;
    setShowBackLink(fromSuccess || location.key !== 'default');
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-center text-gray-800">Rosterform</h1>
          {!isDashboardLayout && (
            <Link to="/orders">
              <Button variant="outline" className="flex items-center gap-2">
                <ClipboardList className="h-4 w-4" />
                View Orders
              </Button>
            </Link>
          )}
        </div>
        
        {showBackLink && <BackToSuccessLink />}
        
        <div className="space-y-6">
          <CustomerInfoForm />
          <ProductInfoForm />
          <BulkOptionsToolbar />
          <RosterTable />
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default Index;

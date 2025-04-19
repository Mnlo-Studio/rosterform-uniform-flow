
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import CustomerInfoForm from '@/components/CustomerInfoForm';
import ProductInfoForm from '@/components/ProductInfoForm';
import { BulkOptionsToolbar } from '@/components/bulk-options';
import RosterTable from '@/components/RosterTable';
import OrderSummary from '@/components/OrderSummary';
import BackToSuccessLink from '@/components/BackToSuccessLink';
import { Button } from '@/components/ui/button';
import { ClipboardList } from 'lucide-react';
import { useLayout } from '@/context/LayoutContext';
import { RosterProvider } from '@/context/RosterContext';

const Index = () => {
  const location = useLocation();
  const [showBackLink, setShowBackLink] = useState(false);
  const { isDashboardLayout } = useLayout();

  useEffect(() => {
    // Only show back link if explicitly navigated from success page
    const fromSuccess = location.state && location.state.fromSuccess;
    setShowBackLink(!!fromSuccess);
  }, [location]);

  return (
    <div className="pb-8 bg-white">
      <div className="max-w-4xl mx-auto bg-white/[0.99]">
        <div className="flex justify-between items-center mb-6">
          <h1>Order Form</h1>
          {!isDashboardLayout && (
            <Link to="/orders">
              <Button variant="outline" className="flex items-center gap-2 border-neutral-200">
                <ClipboardList className="h-4 w-4" />
                View Orders
              </Button>
            </Link>
          )}
        </div>
        
        {showBackLink && <BackToSuccessLink />}
        
        <RosterProvider>
          <div className="space-y-6">
            <CustomerInfoForm />
            <ProductInfoForm />
            <BulkOptionsToolbar />
            <RosterTable />
            <OrderSummary />
          </div>
        </RosterProvider>
      </div>
    </div>
  );
};

export default Index;

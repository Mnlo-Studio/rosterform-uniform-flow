
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CustomerInfoForm from '@/components/CustomerInfoForm';
import ProductInfoForm from '@/components/ProductInfoForm';
import { BulkOptionsToolbar } from '@/components/bulk-options';
import RosterTable from '@/components/RosterTable';
import OrderSummary from '@/components/OrderSummary';
import BackToSuccessLink from '@/components/BackToSuccessLink';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const [showBackLink, setShowBackLink] = useState(false);
  
  useEffect(() => {
    // Check if user came from success page (has state)
    const fromSuccess = location.state && location.state.fromSuccess;
    setShowBackLink(fromSuccess || location.key !== 'default');
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      <div className="container mx-auto px-4 py-8">
        {showBackLink && <BackToSuccessLink />}
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Rosterform</h1>
        
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

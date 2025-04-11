
import React from 'react';
import { RosterProvider } from '@/context/RosterContext';
import CustomerInfoForm from '@/components/CustomerInfoForm';
import ProductInfoForm from '@/components/ProductInfoForm';
import { BulkOptionsToolbar } from '@/components/bulk-options';
import RosterTable from '@/components/RosterTable';
import OrderSummary from '@/components/OrderSummary';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();

  return (
    <RosterProvider>
      <div className="min-h-screen bg-gray-100 pb-20">
        <div className="container mx-auto px-4 py-8">
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
    </RosterProvider>
  );
};

export default Index;

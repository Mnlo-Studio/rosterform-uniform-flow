
import React from 'react';
import { RosterProvider } from '@/context/RosterContext';
import CustomerInfoForm from '@/components/CustomerInfoForm';
import ProductInfoForm from '@/components/ProductInfoForm';
import BulkOptionsToolbar from '@/components/BulkOptionsToolbar';
import RosterTable from '@/components/RosterTable';
import OrderSummary from '@/components/OrderSummary';
import SubmitOrderButton from '@/components/SubmitOrderButton';

const Index = () => {
  return (
    <RosterProvider>
      <div className="min-h-screen bg-gray-100 pb-20">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Rosterform</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <CustomerInfoForm />
              <ProductInfoForm />
              <BulkOptionsToolbar />
              <RosterTable />
            </div>
            
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <OrderSummary />
              </div>
            </div>
          </div>
        </div>
        
        <SubmitOrderButton />
      </div>
    </RosterProvider>
  );
};

export default Index;

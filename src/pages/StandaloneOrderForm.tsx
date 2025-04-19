
import React, { useState } from 'react';
import CustomerInfoForm from '@/components/CustomerInfoForm';
import ProductInfoForm from '@/components/ProductInfoForm';
import { BulkOptionsToolbar } from '@/components/bulk-options';
import RosterTable from '@/components/RosterTable';
import OrderSummary from '@/components/OrderSummary';

const StandaloneOrderForm: React.FC = () => {
  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white/[0.99]">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Order Form</h1>
        </div>
        
        <div className="space-y-6">
          <CustomerInfoForm isPublic={true} />
          <ProductInfoForm />
          <BulkOptionsToolbar />
          <RosterTable />
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default StandaloneOrderForm;

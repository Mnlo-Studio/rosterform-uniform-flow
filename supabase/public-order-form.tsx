import React from 'react';
import CustomerInfoForm from '@/components/CustomerInfoForm';
import ProductInfoForm from '@/components/ProductInfoForm';
import BulkOptionsToolbar from '@/components/bulk-options';
import RosterTable from '@/components/RosterTable';
import OrderSummary from '@/components/OrderSummary';
import { RosterProvider } from '@/context/RosterContext';

const PublicOrderForm = () => {
  return (
    <div className="pb-8 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-xl font-bold mb-4">Team Order Form</h1>
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

export default PublicOrderForm;

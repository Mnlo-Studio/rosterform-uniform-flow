
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RosterProvider } from '@/context/RosterProvider';
import CustomerInfoForm from '@/components/CustomerInfoForm';
import ProductInfoForm from '@/components/ProductInfoForm';
import { BulkOptionsToolbar } from '@/components/bulk-options';
import RosterTable from '@/components/RosterTable';
import OrderSummary from '@/components/OrderSummary';

const PublicOrderForm: React.FC = () => {
  const { formId } = useParams<{ formId: string }>();
  
  useEffect(() => {
    // You could load specific form data based on formId here
    console.log(`Loading public form with ID: ${formId}`);
  }, [formId]);

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white/[0.99]">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Order Form</h1>
        </div>
        
        <RosterProvider>
          <div className="space-y-6">
            <CustomerInfoForm isPublic={true} />
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

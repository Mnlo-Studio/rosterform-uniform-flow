
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CustomerInfoForm from '@/components/CustomerInfoForm';
import ProductInfoForm from '@/components/ProductInfoForm';
import { BulkOptionsToolbar } from '@/components/bulk-options';
import RosterTable from '@/components/RosterTable';
import OrderSummary from '@/components/OrderSummary';

const PublicOrderForm: React.FC = () => {
  const { formId } = useParams<{ formId: string }>();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // You could load specific form data based on formId here
    console.log(`Loading public form with ID: ${formId}`);
    // Simulate fetching data
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [formId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-lg">Loading form...</p>
      </div>
    );
  }

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

export default PublicOrderForm;

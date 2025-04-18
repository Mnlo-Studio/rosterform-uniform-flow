
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CustomerInfoForm from '@/components/CustomerInfoForm';
import ProductInfoForm from '@/components/ProductInfoForm';
import { BulkOptionsToolbar } from '@/components/bulk-options';
import RosterTable from '@/components/RosterTable';
import OrderSummary from '@/components/OrderSummary';
import { ArrowLeft } from 'lucide-react';

const PublicOrderForm: React.FC = () => {
  const { userId, formId } = useParams<{ userId?: string; formId?: string }>();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    console.log(`Loading public form for: ${userId || formId || 'standalone'}`);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [formId, userId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-lg">Loading form...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-50 w-full border-b bg-white px-4 py-3 md:py-4">
        <div className="mx-auto max-w-4xl flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Uniform Order Form</h1>
          <a href="https://rosterform.com" className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden md:inline">Back to home</span>
          </a>
        </div>
      </div>
      
      <div className="px-4 py-6 md:py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-4 md:p-6">
          <div className="space-y-6">
            <CustomerInfoForm isPublic={true} />
            <ProductInfoForm />
            <BulkOptionsToolbar />
            <RosterTable />
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicOrderForm;

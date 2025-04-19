
import React from 'react';
import CustomerInfoForm from '@/components/CustomerInfoForm';
import ProductInfoForm from '@/components/ProductInfoForm';
import { BulkOptionsToolbar } from '@/components/bulk-options';
import RosterTable from '@/components/RosterTable';
import OrderSummary from '@/components/OrderSummary';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const StandaloneOrderForm: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Uniform Order Form</h1>
          <Link to="/" className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to dashboard
          </Link>
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

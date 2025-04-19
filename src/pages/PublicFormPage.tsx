
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { usePublicForm } from '@/hooks/usePublicForm';
import { RosterProvider } from '@/context/RosterContext';
import CustomerInfoForm from '@/components/CustomerInfoForm';
import ProductInfoForm from '@/components/ProductInfoForm';
import { BulkOptionsToolbar } from '@/components/bulk-options';
import RosterTable from '@/components/RosterTable';
import OrderSummary from '@/components/OrderSummary';
import { Skeleton } from '@/components/ui/skeleton';

const PublicFormPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { getFormBySlug } = usePublicForm();
  const { data: formData, isLoading, error } = getFormBySlug(slug);

  useEffect(() => {
    if (error) {
      console.error('Error loading form:', error);
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-full max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
            <div className="flex items-center mb-6">
              <Skeleton className="h-8 w-40" />
            </div>
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-full max-w-4xl mx-auto p-4">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Form Not Found</h1>
            <p className="text-gray-600 mb-6">
              The form you're looking for doesn't exist or has been removed.
            </p>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go to Homepage
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm py-4">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center">
            <a
              href="/"
              className="inline-flex items-center text-gray-500 hover:text-gray-700 mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Back</span>
            </a>
            <h1 className="text-xl font-semibold text-gray-800 truncate">
              {formData.form_title || `${formData.team_name} Order Form`}
            </h1>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 md:p-8">
          <RosterProvider>
            <div className="space-y-6">
              <CustomerInfoForm isPublic={true} prefillData={{
                teamName: formData.team_name,
                email: formData.email || '',
                formId: formData.id
              }} />
              <ProductInfoForm />
              <BulkOptionsToolbar />
              <RosterTable />
              <OrderSummary isPublic={true} />
            </div>
          </RosterProvider>
        </div>
      </div>
    </div>
  );
};

export default PublicFormPage;

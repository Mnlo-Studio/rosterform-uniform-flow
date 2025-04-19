
import React, { useState } from 'react';
import OrderToolbar from './OrderToolbar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import FormGenerator from './FormGenerator';

interface OrdersHeaderProps {
  searchQuery: string;
  onSearch: (query: string) => void;
  statusFilter: string;
  onStatusFilter: (status: string) => void;
}

const OrdersHeader: React.FC<OrdersHeaderProps> = ({
  searchQuery,
  onSearch,
  statusFilter,
  onStatusFilter
}) => {
  const [showFormGenerator, setShowFormGenerator] = useState(false);

  return (
    <div className="bg-white border-b border-gray-100 py-4 md:py-6 px-4 sm:px-6 lg:px-8 w-full">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center">
            <h1 className="text-xl md:text-2xl font-semibold text-gray-800">Orders</h1>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <FormGenerator 
              showFormGenerator={showFormGenerator} 
              setShowFormGenerator={setShowFormGenerator} 
            />
            
            <Button asChild>
              <Link to="/order-form" className="whitespace-nowrap">
                <Plus className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">New Order</span>
                <span className="sm:hidden">New</span>
              </Link>
            </Button>
          </div>
        </div>

        <OrderToolbar 
          searchQuery={searchQuery}
          onSearch={onSearch}
          statusFilter={statusFilter}
          onStatusFilter={onStatusFilter}
        />
      </div>
    </div>
  );
};

export default OrdersHeader;

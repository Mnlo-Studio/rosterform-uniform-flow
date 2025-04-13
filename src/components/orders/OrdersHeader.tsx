
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

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
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0">Orders</h1>
      
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search team name or order ID"
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            className="pl-10 w-full sm:w-[250px] rounded-md"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={onStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="All Orders" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default OrdersHeader;

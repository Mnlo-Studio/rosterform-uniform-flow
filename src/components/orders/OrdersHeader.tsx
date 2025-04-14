
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
    <div className="flex flex-wrap items-center justify-between gap-4">
      <h1 className="text-2xl font-semibold text-gray-800">Orders</h1>
      
      <div className="flex items-center gap-3 w-full md:w-auto">
        <div className="relative flex-1 md:flex-none md:w-[250px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search team name or order ID"
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            className="pl-10 w-full h-10"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={onStatusFilter}>
          <SelectTrigger className="w-[180px] h-10">
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

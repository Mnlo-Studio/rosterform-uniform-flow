
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface OrderToolbarProps {
  searchQuery: string;
  onSearch: (query: string) => void;
  statusFilter: string;
  onStatusFilter: (status: string) => void;
}

const OrderToolbar: React.FC<OrderToolbarProps> = ({
  searchQuery,
  onSearch,
  statusFilter,
  onStatusFilter
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search orders or team names"
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          className="pl-9 w-full"
        />
      </div>
      
      <Select value={statusFilter} onValueChange={onStatusFilter}>
        <SelectTrigger className="w-full sm:w-[150px]">
          <SelectValue placeholder="All statuses" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default OrderToolbar;

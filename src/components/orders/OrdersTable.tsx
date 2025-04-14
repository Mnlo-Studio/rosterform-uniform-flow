
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatCurrency } from '@/utils/calculations';
import { Order } from '@/types/orders';
import { ChevronDown } from 'lucide-react';
import { StatusBadge } from '@/components/ui/status-badge';

interface OrdersTableProps {
  orders: Order[];
  onStatusChange?: (orderId: string, status: 'Pending' | 'Completed' | 'Cancelled') => void;
  onPaymentChange?: (orderId: string, isPaid: boolean) => void;
}

const OrdersTable: React.FC<OrdersTableProps> = ({
  orders,
  onStatusChange,
  onPaymentChange
}) => {
  const navigate = useNavigate();
  
  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentBadgeClass = (isPaid: boolean) => {
    return isPaid 
      ? 'bg-green-100 text-green-800' 
      : 'bg-orange-100 text-orange-800';
  };

  const handleOrderClick = (orderId: string, event: React.MouseEvent) => {
    // Only navigate if the click is not on a dropdown
    if (!(event.target as HTMLElement).closest('.dropdown-area')) {
      navigate(`/orders/${orderId}`);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
      <ScrollArea className="h-[500px] w-full">
        <Table>
          <TableHeader className="bg-gray-50 sticky top-0 z-10">
            <TableRow>
              <TableHead className="w-[120px]">Order ID</TableHead>
              <TableHead>Team Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-center">Players</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center h-24 text-gray-500">
                  No orders found.
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order, index) => (
                <TableRow 
                  key={order.orderId}
                  className={`cursor-pointer hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                  onClick={(e) => handleOrderClick(order.orderId, e)}
                >
                  <TableCell className="font-medium">{order.orderId}</TableCell>
                  <TableCell>{order.teamName}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell className="text-center">{order.players.length}</TableCell>
                  <TableCell>{formatCurrency(order.total)}</TableCell>
                  <TableCell>
                    <div className="dropdown-area">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 p-0 flex items-center gap-1">
                            <StatusBadge 
                              status={order.status.toLowerCase() as any} 
                              label={order.status}
                            />
                            <ChevronDown className="h-3 w-3 opacity-50" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-[120px]">
                          <DropdownMenuItem 
                            onClick={() => onStatusChange?.(order.orderId, 'Pending')}
                            className="cursor-pointer"
                          >
                            <StatusBadge status="pending" />
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => onStatusChange?.(order.orderId, 'Completed')}
                            className="cursor-pointer"
                          >
                            <StatusBadge status="success" label="Completed" />
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => onStatusChange?.(order.orderId, 'Cancelled')}
                            className="cursor-pointer"
                          >
                            <StatusBadge status="error" label="Cancelled" />
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="dropdown-area">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 p-0 flex items-center gap-1">
                            <StatusBadge 
                              status={order.isPaid ? "paid" : "unpaid"} 
                              label={order.isPaid ? "Paid" : "Unpaid"}
                            />
                            <ChevronDown className="h-3 w-3 opacity-50" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-[120px]">
                          <DropdownMenuItem 
                            onClick={() => onPaymentChange?.(order.orderId, true)}
                            className="cursor-pointer"
                          >
                            <StatusBadge status="paid" />
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => onPaymentChange?.(order.orderId, false)}
                            className="cursor-pointer"
                          >
                            <StatusBadge status="unpaid" />
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default OrdersTable;

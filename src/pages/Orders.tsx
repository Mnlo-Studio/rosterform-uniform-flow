
import React, { useState } from 'react';
import { toast } from "sonner";
import OrdersHeader from '@/components/orders/OrdersHeader';
import OrdersSummaryCards from '@/components/orders/OrdersSummaryCards';
import OrdersTable from '@/components/orders/OrdersTable';
import { useOrders } from '@/hooks/useOrders';
import { Skeleton } from '@/components/ui/skeleton';
import { ClipboardIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const { orders, isLoading, error, updateOrder } = useOrders();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const navigate = useNavigate();

  // Filter orders based on search query and status
  const filteredOrders = orders?.filter(order => {
    const matchesSearch = !searchQuery || 
      order.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.orderId.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
      order.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  }) || [];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
  };

  const handleStatusChange = async (orderId: string, newStatus: 'Pending' | 'Completed' | 'Cancelled') => {
    try {
      await updateOrder.mutateAsync({
        id: orderId,
        status: newStatus
      });
      
      toast.success(`Order ${orderId} status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handlePaymentChange = async (orderId: string, isPaid: boolean) => {
    try {
      await updateOrder.mutateAsync({
        id: orderId,
        isPaid
      });
      
      toast.success(`Order ${orderId} payment status updated to ${isPaid ? 'Paid' : 'Unpaid'}`);
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };

  const getTotalPlayers = () => {
    return filteredOrders.reduce((total, order) => 
      total + order.players.length, 0);
  };

  const getTotalRevenue = () => {
    return filteredOrders.reduce((total, order) => total + (order.total || 0), 0);
  };

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        Error loading orders: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-white p-4 md:p-6 lg:p-8 min-h-screen text-gray-800">
      <OrdersHeader 
        searchQuery={searchQuery} 
        onSearch={handleSearch} 
        statusFilter={statusFilter} 
        onStatusFilter={handleStatusFilter} 
      />
      
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-[200px] w-full" />
          <Skeleton className="h-[400px] w-full" />
        </div>
      ) : (
        <>
          <OrdersSummaryCards 
            totalOrders={filteredOrders.length} 
            totalRevenue={getTotalRevenue()} 
            totalPlayers={getTotalPlayers()} 
          />
          
          {filteredOrders.length > 0 ? (
            <OrdersTable 
              orders={filteredOrders} 
              onStatusChange={handleStatusChange}
              onPaymentChange={handlePaymentChange}
            />
          ) : (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 p-10 text-center">
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="bg-gray-50 rounded-full p-4">
                  <ClipboardIcon className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium">No orders found</h3>
                <p className="text-gray-500 max-w-md">
                  {!orders || orders.length === 0 
                    ? "You haven't created any orders yet. Create your first order to get started." 
                    : "No orders match your current search or filter criteria."}
                </p>
                {!orders || orders.length === 0 && (
                  <Button 
                    onClick={() => navigate('/roster')} 
                    className="mt-2"
                  >
                    Create New Order
                  </Button>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Orders;


import React, { useState } from 'react';
import { toast } from "sonner";
import OrdersHeader from '@/components/orders/OrdersHeader';
import OrdersSummaryCards from '@/components/orders/OrdersSummaryCards';
import OrdersTable from '@/components/orders/OrdersTable';
import { useOrders } from '@/hooks/useOrders';
import { Skeleton } from '@/components/ui/skeleton';

const Orders = () => {
  const { orders, isLoading, error, updateOrder } = useOrders();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

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
          
          <OrdersTable 
            orders={filteredOrders} 
            onStatusChange={handleStatusChange}
            onPaymentChange={handlePaymentChange}
          />
        </>
      )}
    </div>
  );
};

export default Orders;

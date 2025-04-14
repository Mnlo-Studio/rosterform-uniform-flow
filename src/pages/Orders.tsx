
import React, { useState } from 'react';
import OrdersHeader from '@/components/orders/OrdersHeader';
import OrdersSummaryCards from '@/components/orders/OrdersSummaryCards';
import OrdersTable from '@/components/orders/OrdersTable';
import { Order } from '@/types/orders';
import { mockOrders } from '@/data/mockOrders';

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(mockOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterOrders(query, statusFilter);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    filterOrders(searchQuery, status);
  };

  const filterOrders = (query: string, status: string) => {
    let filtered = orders;
    
    if (query) {
      const lowercaseQuery = query.toLowerCase();
      filtered = filtered.filter(order => 
        order.teamName.toLowerCase().includes(lowercaseQuery) || 
        order.orderId.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    if (status !== 'all') {
      filtered = filtered.filter(order => order.status.toLowerCase() === status.toLowerCase());
    }
    
    setFilteredOrders(filtered);
  };

  const getTotalPlayers = () => {
    return orders.reduce((total, order) => total + order.players.length, 0);
  };

  const getTotalRevenue = () => {
    return orders.reduce((total, order) => total + order.total, 0);
  };

  return (
    <div className="space-y-6 bg-white p-4 md:p-6 lg:p-8 min-h-screen text-gray-800">
      <OrdersHeader 
        searchQuery={searchQuery} 
        onSearch={handleSearch} 
        statusFilter={statusFilter} 
        onStatusFilter={handleStatusFilter} 
      />
      
      <OrdersSummaryCards 
        totalOrders={orders.length} 
        totalRevenue={getTotalRevenue()} 
        totalPlayers={getTotalPlayers()} 
      />
      
      <OrdersTable orders={filteredOrders} />
    </div>
  );
};

export default Orders;

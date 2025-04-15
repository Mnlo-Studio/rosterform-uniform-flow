
import { useState, useEffect } from 'react';
import { Order } from '@/types/orders';
import { mockOrders } from '@/data/mockOrders';

export const useOrderFetch = (orderId: string | undefined) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    setError(null);
    
    try {
      // Find the order from mockOrders based on orderId
      const foundOrder = mockOrders.find(o => o.orderId === orderId);
      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        throw new Error(`Order ${orderId} not found`);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setIsLoading(false);
    }
  }, [orderId]);

  return {
    order,
    setOrder,
    isLoading,
    error
  };
};

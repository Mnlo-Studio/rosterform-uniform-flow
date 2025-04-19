
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { mapDbOrderToOrder } from '@/types/orders';
import { useAuth } from '@/context/AuthContext';

export const useOrderQueries = () => {
  const { user } = useAuth();
  const userId = user?.id;

  const { data: orders, isLoading, error } = useQuery({
    queryKey: ['orders', userId],
    queryFn: async () => {
      if (!userId) return [];
      
      console.log('Fetching orders for user ID:', userId);
      
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          customer_info (*),
          order_products (*),
          order_players (*)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching orders:', error);
        throw error;
      }
      
      console.log('Orders fetched:', data ? data.length : 0, 'orders');
      
      if (!data || data.length === 0) {
        return [];
      }
      
      return data.map(order => {
        const orderData = {
          ...order,
          customer_info: Array.isArray(order.customer_info) && order.customer_info.length > 0 
            ? order.customer_info[0] 
            : order.customer_info || null,
          order_products: Array.isArray(order.order_products) ? order.order_products : [],
          order_players: Array.isArray(order.order_players) ? order.order_players : []
        };
        return mapDbOrderToOrder(orderData);
      });
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    enabled: !!userId,
  });

  return {
    orders: orders || [],
    isLoading,
    error
  };
};

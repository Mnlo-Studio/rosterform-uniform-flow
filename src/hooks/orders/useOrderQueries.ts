
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
        .select('*')
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
      
      return data.map(order => mapDbOrderToOrder({
        ...order,
        customer_info: null,
        order_products: [],
        order_players: []
      }));
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

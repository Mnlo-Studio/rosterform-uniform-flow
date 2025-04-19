
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { 
  Order, 
  mapDbOrderToOrder,
  mapOrderToDbOrder 
} from '@/types/orders';

export const useOrder = (orderId: string) => {
  const queryClient = useQueryClient();

  const { data: order, isLoading, error } = useQuery({
    queryKey: ['order', orderId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          customer_info (*),
          order_products (*),
          order_players (*)
        `)
        .eq('id', orderId)
        .single();

      if (error) throw error;
      
      // Handle the case where relations might not be properly set up yet
      return mapDbOrderToOrder({
        ...data,
        customer_info: Array.isArray(data.customer_info) ? data.customer_info : null,
        order_products: Array.isArray(data.order_products) ? data.order_products : [],
        order_players: Array.isArray(data.order_players) ? data.order_players : []
      });
    },
    enabled: !!orderId,
  });

  const updateOrder = useMutation({
    mutationFn: async (orderData: Partial<Order>) => {
      // Convert frontend order to database format
      const dbOrderData = mapOrderToDbOrder(orderData);
      
      // Start a transaction to update the orders table
      const { data, error } = await supabase
        .from('orders')
        .update(dbOrderData)
        .eq('id', orderId)
        .select();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['order', orderId] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast({
        title: "Order updated",
        description: "Order details have been successfully updated.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error updating order",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    order,
    isLoading,
    error,
    updateOrder,
  };
};

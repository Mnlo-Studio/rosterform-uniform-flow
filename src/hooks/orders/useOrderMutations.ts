
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Order, mapOrderToDbOrder, mapDbOrderToOrder } from '@/types/orders';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';

export const useOrderMutations = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const userId = user?.id;

  const createOrder = useMutation({
    mutationFn: async (orderData: Partial<Order>) => {
      if (!userId) throw new Error("User not authenticated");
      
      const dbOrderData = mapOrderToDbOrder(orderData);
      
      const preparedData = {
        ...dbOrderData,
        order_id: dbOrderData.order_id || `ORD-${Date.now()}`,
        team_name: dbOrderData.team_name || 'Untitled Team',
        user_id: userId
      };
      
      console.log('Creating order with data:', preparedData);
      
      const { data, error } = await supabase
        .from('orders')
        .insert(preparedData)
        .select()
        .single();

      if (error) {
        console.error('Error creating order:', error);
        throw error;
      }
      
      console.log('Order created successfully:', data);
      
      return mapDbOrderToOrder({
        ...data,
        customer_info: null,
        order_products: [],
        order_players: []
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders', userId] });
      toast({
        title: "Order created",
        description: "Your order has been successfully created.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error creating order",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateOrder = useMutation({
    mutationFn: async ({ id, ...orderData }: Partial<Order> & { id: string }) => {
      if (!userId) throw new Error("User not authenticated");
      
      const dbOrderData = mapOrderToDbOrder(orderData);
      
      console.log('Updating order:', id, 'with data:', dbOrderData);
      
      const { data, error } = await supabase
        .from('orders')
        .update(dbOrderData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating order:', error);
        throw error;
      }
      
      console.log('Order updated successfully:', data);
      
      return mapDbOrderToOrder({
        ...data,
        customer_info: null,
        order_products: [],
        order_players: []
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders', userId] });
      toast({
        title: "Order updated",
        description: "Your order has been successfully updated.",
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

  const addSampleOrder = useMutation({
    mutationFn: async () => {
      if (!userId) throw new Error("User not authenticated");
      
      const sampleOrder = {
        order_id: `ORD-SAMPLE-${Date.now()}`,
        team_name: 'Sample Team',
        total: 299.99,
        status: 'Pending',
        is_paid: false,
        user_id: userId,
        date: new Date().toISOString()
      };
      
      console.log('Creating sample order:', sampleOrder);
      
      const { data, error } = await supabase
        .from('orders')
        .insert(sampleOrder)
        .select()
        .single();

      if (error) {
        console.error('Error creating sample order:', error);
        throw error;
      }
      
      console.log('Sample order created:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders', userId] });
      toast({
        title: "Sample order created",
        description: "A sample order has been added to your account.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error creating sample order",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  return {
    createOrder,
    updateOrder,
    addSampleOrder
  };
};

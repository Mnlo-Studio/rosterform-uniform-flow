
import { useOrderQueries } from './useOrderQueries';
import { useOrderMutations } from './useOrderMutations';

export const useOrders = () => {
  const { orders, isLoading, error } = useOrderQueries();
  const { createOrder, updateOrder, addSampleOrder } = useOrderMutations();

  return {
    // Queries
    orders,
    isLoading,
    error,
    
    // Mutations
    createOrder,
    updateOrder,
    addSampleOrder,
  };
};

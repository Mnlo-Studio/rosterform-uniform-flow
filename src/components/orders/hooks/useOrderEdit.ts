
import { useState } from 'react';
import { Order } from '@/types/orders';
import { useToast } from '@/hooks/use-toast';

export const useOrderEdit = (
  initialOrder: Order | null,
  setOriginalOrder: (order: Order) => void
) => {
  const [editedOrder, setEditedOrder] = useState<Order | null>(initialOrder);
  const [isEditMode, setIsEditMode] = useState(false);
  const { toast } = useToast();

  // Update both states when initialOrder changes
  if (initialOrder !== null && JSON.stringify(initialOrder) !== JSON.stringify(editedOrder)) {
    setEditedOrder(initialOrder);
  }

  const updateOrder = (updatedOrder: Order) => {
    setOriginalOrder(updatedOrder);
    setEditedOrder(updatedOrder);
    
    // In a real app, this would be an API call
    console.log('Order updated:', updatedOrder);
  };

  const handleCustomerInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedOrder(prev => {
      if (!prev) return null;
      return {
        ...prev,
        customerInfo: {
          ...prev.customerInfo,
          [name]: value
        }
      };
    });
  };

  const handleProductInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedOrder(prev => {
      if (!prev || !prev.productInfo.products[0]) return null;
      
      // For now, we'll just update the first product for compatibility
      // In a future update, this could be enhanced to handle multiple products
      return {
        ...prev,
        productInfo: {
          ...prev.productInfo,
          products: prev.productInfo.products.map((product, index) => {
            if (index === 0) { // Update only the first product
              if (name === 'pricePerItem') {
                return { ...product, [name]: parseFloat(value) || 0 };
              }
              return { ...product, [name]: value };
            }
            return product;
          })
        }
      };
    });
  };

  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleSaveChanges = () => {
    if (editedOrder) {
      updateOrder(editedOrder);
      toast({
        title: "Changes saved",
        description: "Your changes have been successfully saved.",
      });
      setIsEditMode(false);
    }
  };

  const handleStatusChange = (status: 'Pending' | 'Completed' | 'Cancelled') => {
    setEditedOrder(prev => {
      if (!prev) return null;
      return { ...prev, status };
    });
  };

  const handlePaymentChange = (isPaid: boolean) => {
    setEditedOrder(prev => {
      if (!prev) return null;
      return { ...prev, isPaid };
    });
  };

  return {
    editedOrder,
    isEditMode,
    updateOrder,
    handleCustomerInfoChange,
    handleProductInfoChange,
    handleToggleEditMode,
    handleSaveChanges,
    handleStatusChange,
    handlePaymentChange
  };
};


import { useState } from 'react';
import { Order } from '@/types/orders';
import { useOrderFetch } from './useOrderFetch';
import { useOrderEdit } from './useOrderEdit';
import { useOrderMedia } from './useOrderMedia';

export const useOrderDetails = (orderId: string | undefined) => {
  const { order, setOrder, isLoading, error } = useOrderFetch(orderId);
  const [editedOrder, setEditedOrder] = useState<Order | null>(order);
  
  // When order changes, update editedOrder to match
  if (order !== null && JSON.stringify(order) !== JSON.stringify(editedOrder)) {
    setEditedOrder(order);
  }
  
  const {
    isEditMode,
    updateOrder,
    handleCustomerInfoChange,
    handleProductInfoChange,
    handleToggleEditMode,
    handleSaveChanges,
    handleStatusChange,
    handlePaymentChange
  } = useOrderEdit(order, setOrder);
  
  const {
    handleImageUpload,
    handleImageRemove,
    handleDownloadOriginal,
    handleDownloadUpdated,
    handleSendInvoice
  } = useOrderMedia(editedOrder, setEditedOrder);

  return {
    order,
    editedOrder,
    isEditMode,
    isLoading,
    error,
    updateOrder,
    handleCustomerInfoChange,
    handleProductInfoChange,
    handleToggleEditMode,
    handleSaveChanges,
    handleStatusChange,
    handlePaymentChange,
    handleDownloadOriginal,
    handleDownloadUpdated,
    handleSendInvoice,
    handleImageUpload,
    handleImageRemove
  };
};

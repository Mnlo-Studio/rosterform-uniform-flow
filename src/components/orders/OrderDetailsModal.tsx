
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';
import { useOrderDetails } from './hooks/useOrderDetails';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import OrderDetailsContent from './modal/OrderDetailsContent';
import OrderDetailsLoading from './modal/OrderDetailsLoading';
import OrderDetailsError from './modal/OrderDetailsError';

const OrderDetailsModal = () => {
  const [open, setOpen] = useState(true);
  const { orderId } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  const { 
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
    handleDownloadOriginal,
    handleDownloadUpdated,
    handleSendInvoice,
    handleImageUpload,
    handleImageRemove
  } = useOrderDetails(orderId || '');
  
  const handleClose = () => {
    setOpen(false);
    setTimeout(() => navigate('/orders'), 300); // Delay navigation for animation
  };
  
  const handleEdit = () => {
    handleToggleEditMode();
  };
  
  const handleCancel = () => {
    if (order) {
      updateOrder(order);
    }
    handleToggleEditMode();
  };
  
  const handleSave = () => {
    handleSaveChanges();
  };
  
  const handleStatusChange = (status: 'Pending' | 'Completed' | 'Cancelled') => {
    if (!editedOrder) return;
    
    const updatedOrder = {
      ...editedOrder,
      status
    };
    
    // Auto-save status changes
    updateOrder(updatedOrder);
    
    toast({
      title: "Status updated",
      description: `Order status changed to ${status}.`,
    });
  };
  
  const handlePaymentChange = (isPaid: boolean) => {
    if (!editedOrder) return;
    
    const updatedOrder = {
      ...editedOrder,
      isPaid
    };
    
    // Auto-save payment changes
    updateOrder(updatedOrder);
    
    toast({
      title: "Payment status updated",
      description: isPaid ? "Order marked as paid." : "Order marked as unpaid.",
    });
  };
  
  const renderContent = () => {
    if (isLoading) {
      return <OrderDetailsLoading isMobile={isMobile} />;
    }
    
    if (error || !editedOrder) {
      return <OrderDetailsError error={error} isMobile={isMobile} />;
    }
    
    return (
      <OrderDetailsContent 
        editedOrder={editedOrder}
        isEditMode={isEditMode}
        handleEdit={handleEdit}
        handleCancel={handleCancel}
        handleSave={handleSave}
        handleCustomerInfoChange={handleCustomerInfoChange}
        handleProductInfoChange={handleProductInfoChange}
        handleStatusChange={handleStatusChange}
        handlePaymentChange={handlePaymentChange}
        handleDownloadOriginal={handleDownloadOriginal}
        handleDownloadUpdated={handleDownloadUpdated}
        handleSendInvoice={handleSendInvoice}
        handleImageUpload={handleImageUpload}
        handleImageRemove={handleImageRemove}
      />
    );
  };
  
  // Render as Drawer on mobile, Dialog on desktop
  return isMobile ? (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <div className="p-4 max-w-4xl mx-auto">
          {renderContent()}
        </div>
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[95vw] max-h-[90vh] overflow-y-auto">
        <div className="p-2">
          {renderContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsModal;

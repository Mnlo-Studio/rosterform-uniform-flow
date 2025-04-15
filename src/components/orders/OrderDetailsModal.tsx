
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { Order } from '@/types/orders';
import { useToast } from '@/hooks/use-toast';
import { useOrderDetails } from './hooks/useOrderDetails';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import OrderDetailsHeader from './OrderDetailsHeader';
import CustomerInfoCard from './CustomerInfoCard';
import ProductInfoCard from './ProductInfoCard';
import RosterTableCard from './RosterTableCard';
import OrderImagesCard from './OrderImagesCard';
import OrderDetailsFooter from './OrderDetailsFooter';

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
  
  if (isLoading) {
    return isMobile ? (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <div className="p-4">Loading order details...</div>
        </DrawerContent>
      </Drawer>
    ) : (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <div className="p-4">Loading order details...</div>
        </DialogContent>
      </Dialog>
    );
  }
  
  if (error || !editedOrder) {
    return isMobile ? (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <div className="p-4 text-red-500">Error loading order: {error?.message || 'Order not found'}</div>
        </DrawerContent>
      </Drawer>
    ) : (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <div className="p-4 text-red-500">Error loading order: {error?.message || 'Order not found'}</div>
        </DialogContent>
      </Dialog>
    );
  }
  
  const modalContent = (
    <>
      <OrderDetailsHeader 
        orderId={editedOrder.orderId}
        isEditMode={isEditMode}
        onToggleEditMode={handleToggleEditMode}
        onEdit={handleEdit}
        onCancel={handleCancel}
        onSave={handleSave}
        onStatusChange={handleStatusChange}
        onPaymentChange={handlePaymentChange}
      />
      
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <CustomerInfoCard 
          customerInfo={editedOrder.customerInfo}
          isEditMode={isEditMode}
          onCustomerInfoChange={handleCustomerInfoChange}
        />
        
        <ProductInfoCard 
          productInfo={{
            name: editedOrder.productInfo.products[0]?.name || '',
            pricePerItem: editedOrder.productInfo.products[0]?.pricePerItem || 0,
            notes: editedOrder.productInfo.products[0]?.notes || '',
            images: editedOrder.productInfo.products[0]?.images || []
          }}
          isEditMode={isEditMode}
          onProductInfoChange={handleProductInfoChange}
        />
      </div>
      
      <div className="grid md:grid-cols-3 gap-4 mb-4">
        <div className="md:col-span-2">
          <RosterTableCard players={editedOrder.players} />
        </div>
        
        <div>
          <OrderImagesCard 
            images={editedOrder.productInfo.products.flatMap(p => p.images)}
            onImageUpload={isEditMode ? handleImageUpload : undefined}
            onImageRemove={isEditMode ? handleImageRemove : undefined}
          />
        </div>
      </div>
      
      <OrderDetailsFooter 
        isEditMode={isEditMode}
        onSaveChanges={handleSaveChanges}
        onDownloadOriginal={handleDownloadOriginal}
        onDownloadUpdated={handleDownloadUpdated}
        onSendInvoice={handleSendInvoice}
      />
    </>
  );
  
  // Render as Drawer on mobile, Dialog on desktop
  return isMobile ? (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <div className="p-4 max-w-4xl mx-auto">
          {modalContent}
        </div>
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[95vw] max-h-[90vh] overflow-y-auto">
        <div className="p-2">
          {modalContent}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsModal;

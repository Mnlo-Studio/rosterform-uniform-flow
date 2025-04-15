
import React from 'react';
import { useParams } from 'react-router-dom';
import { useOrderDetails } from '@/components/orders/hooks/useOrderDetails';
import OrderDetailsHeader from '@/components/orders/OrderDetailsHeader';
import OrderImagesCard from '@/components/orders/OrderImagesCard';
import CustomerInfoCard from '@/components/orders/CustomerInfoCard';
import ProductInfoCard from '@/components/orders/ProductInfoCard';
import RosterTableCard from '@/components/orders/RosterTableCard';
import OrderDetailsFooter from '@/components/orders/OrderDetailsFooter';

const OrderDetails = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const {
    order,
    editedOrder,
    isEditMode,
    isLoading,
    error,
    handleCustomerInfoChange,
    handleProductInfoChange,
    handleToggleEditMode,
    handleSaveChanges,
    handleDownloadOriginal,
    handleDownloadUpdated,
    handleSendInvoice,
    handleImageUpload,
    handleImageRemove
  } = useOrderDetails(orderId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Loading order details...</p>
      </div>
    );
  }

  if (error || !order || !editedOrder) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Order not found</p>
      </div>
    );
  }

  // Get all images from all products
  const allImages = editedOrder.productInfo.products.flatMap(product => product.images);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <OrderDetailsHeader 
          orderId={orderId || ''} 
          isEditMode={isEditMode} 
          onToggleEditMode={handleToggleEditMode} 
        />

        <div className="space-y-6">
          <OrderImagesCard 
            images={allImages} 
            onImageUpload={handleImageUpload} 
            onImageRemove={handleImageRemove} 
          />

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

          <RosterTableCard players={editedOrder.players} />
        </div>

        <OrderDetailsFooter 
          isEditMode={isEditMode} 
          onSaveChanges={handleSaveChanges} 
          onDownloadOriginal={handleDownloadOriginal} 
          onDownloadUpdated={handleDownloadUpdated} 
          onSendInvoice={handleSendInvoice} 
        />
      </div>
    </div>
  );
};

export default OrderDetails;

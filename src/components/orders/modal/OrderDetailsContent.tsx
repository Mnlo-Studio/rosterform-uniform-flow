
import React from 'react';
import OrderDetailsHeader from '../OrderDetailsHeader';
import CustomerInfoCard from '../CustomerInfoCard';
import ProductInfoCard from '../ProductInfoCard';
import RosterTableCard from '../RosterTableCard';
import OrderImagesCard from '../OrderImagesCard';
import OrderDetailsFooter from '../OrderDetailsFooter';
import { Order } from '@/types/orders';

interface OrderDetailsContentProps {
  editedOrder: Order;
  isEditMode: boolean;
  handleEdit: () => void;
  handleCancel: () => void;
  handleSave: () => void;
  handleCustomerInfoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleProductInfoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleStatusChange: (status: 'Pending' | 'Completed' | 'Cancelled') => void;
  handlePaymentChange: (isPaid: boolean) => void;
  handleDownloadOriginal: () => void;
  handleDownloadUpdated: () => void;
  handleSendInvoice: () => void;
  handleImageUpload: (index: number, base64: string) => void;
  handleImageRemove: (index: number) => void;
}

const OrderDetailsContent: React.FC<OrderDetailsContentProps> = ({
  editedOrder,
  isEditMode,
  handleEdit,
  handleCancel,
  handleSave,
  handleCustomerInfoChange,
  handleProductInfoChange,
  handleStatusChange,
  handlePaymentChange,
  handleDownloadOriginal,
  handleDownloadUpdated,
  handleSendInvoice,
  handleImageUpload,
  handleImageRemove
}) => {
  return (
    <>
      <OrderDetailsHeader 
        orderId={editedOrder.orderId}
        isEditMode={isEditMode}
        onToggleEditMode={handleEdit}
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
        onSaveChanges={handleSave}
        onDownloadOriginal={handleDownloadOriginal}
        onDownloadUpdated={handleDownloadUpdated}
        onSendInvoice={handleSendInvoice}
      />
    </>
  );
};

export default OrderDetailsContent;

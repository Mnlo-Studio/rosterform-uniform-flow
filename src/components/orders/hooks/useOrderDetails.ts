
import { useState, useEffect } from 'react';
import { Order } from '@/types/orders';
import { useToast } from '@/hooks/use-toast';
import { mockOrders } from '@/data/mockOrders';

export const useOrderDetails = (orderId: string | undefined) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [editedOrder, setEditedOrder] = useState<Order | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Find the order from mockOrders based on orderId
    const foundOrder = mockOrders.find(o => o.orderId === orderId);
    if (foundOrder) {
      setOrder(foundOrder);
      setEditedOrder(foundOrder);
    }
  }, [orderId]);

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
      if (!prev) return null;
      return {
        ...prev,
        productInfo: {
          ...prev.productInfo,
          [name]: value
        }
      };
    });
  };

  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleSaveChanges = () => {
    console.log("Saving changes:", editedOrder);
    // Implementation for saving changes would go here
    toast({
      title: "Changes saved",
      description: "Your changes have been successfully saved.",
    });
    setIsEditMode(false);
  };

  const handleDownloadOriginal = () => {
    console.log("Downloading original files");
    toast({
      title: "Download started",
      description: "Original files are being prepared for download.",
    });
    // Implementation for downloading original files would go here
  };

  const handleDownloadUpdated = () => {
    console.log("Downloading updated files");
    toast({
      title: "Download started",
      description: "Updated files are being prepared for download.",
    });
    // Implementation for downloading updated files would go here
  };

  const handleSendInvoice = () => {
    console.log("Sending invoice for order:", orderId);
    toast({
      title: "Invoice sent",
      description: "The invoice has been sent to the customer.",
    });
    // Implementation for sending invoice would go here
  };
  
  const handleImageUpload = (index: number, base64: string) => {
    setEditedOrder(prev => {
      if (!prev) return null;
      const newImages = [...prev.productInfo.images];
      newImages[index] = base64;
      return {
        ...prev,
        productInfo: {
          ...prev.productInfo,
          images: newImages
        }
      };
    });
  };
  
  const handleImageRemove = (index: number) => {
    setEditedOrder(prev => {
      if (!prev) return null;
      const newImages = [...prev.productInfo.images];
      newImages.splice(index, 1);
      return {
        ...prev,
        productInfo: {
          ...prev.productInfo,
          images: newImages
        }
      };
    });
  };

  return {
    order,
    editedOrder,
    isEditMode,
    handleCustomerInfoChange,
    handleProductInfoChange,
    handleToggleEditMode,
    handleSaveChanges,
    handleDownloadOriginal,
    handleDownloadUpdated,
    handleSendInvoice,
    handleImageUpload,
    handleImageRemove
  };
};

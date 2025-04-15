
import { useState, useEffect } from 'react';
import { Order } from '@/types/orders';
import { useToast } from '@/hooks/use-toast';
import { mockOrders } from '@/data/mockOrders';

export const useOrderDetails = (orderId: string | undefined) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [editedOrder, setEditedOrder] = useState<Order | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    setError(null);
    
    try {
      // Find the order from mockOrders based on orderId
      const foundOrder = mockOrders.find(o => o.orderId === orderId);
      if (foundOrder) {
        setOrder(foundOrder);
        setEditedOrder(foundOrder);
      } else {
        throw new Error(`Order ${orderId} not found`);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setIsLoading(false);
    }
  }, [orderId]);

  const updateOrder = (updatedOrder: Order) => {
    setOrder(updatedOrder);
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
      if (!prev || !prev.productInfo.products[0]) return null;
      
      // Create a copy of products array
      const updatedProducts = [...prev.productInfo.products];
      
      // Update the images for the first product (for compatibility)
      const newImages = [...(updatedProducts[0].images || [])];
      newImages[index] = base64;
      
      updatedProducts[0] = {
        ...updatedProducts[0],
        images: newImages
      };
      
      return {
        ...prev,
        productInfo: {
          ...prev.productInfo,
          products: updatedProducts
        }
      };
    });
  };
  
  const handleImageRemove = (index: number) => {
    setEditedOrder(prev => {
      if (!prev || !prev.productInfo.products[0]) return null;
      
      // Create a copy of products array
      const updatedProducts = [...prev.productInfo.products];
      
      // Remove the image from the first product (for compatibility)
      const newImages = [...(updatedProducts[0].images || [])];
      newImages.splice(index, 1);
      
      updatedProducts[0] = {
        ...updatedProducts[0],
        images: newImages
      };
      
      return {
        ...prev,
        productInfo: {
          ...prev.productInfo,
          products: updatedProducts
        }
      };
    });
  };

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
    handleDownloadOriginal,
    handleDownloadUpdated,
    handleSendInvoice,
    handleImageUpload,
    handleImageRemove
  };
};

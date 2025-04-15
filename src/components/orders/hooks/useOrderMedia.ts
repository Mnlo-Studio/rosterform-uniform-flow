
import { useState } from 'react';
import { Order } from '@/types/orders';
import { useToast } from '@/hooks/use-toast';

export const useOrderMedia = (
  editedOrder: Order | null, 
  setEditedOrder: React.Dispatch<React.SetStateAction<Order | null>>
) => {
  const { toast } = useToast();

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
    console.log("Sending invoice for order:", editedOrder?.orderId);
    toast({
      title: "Invoice sent",
      description: "The invoice has been sent to the customer.",
    });
    // Implementation for sending invoice would go here
  };

  return {
    handleImageUpload,
    handleImageRemove,
    handleDownloadOriginal,
    handleDownloadUpdated,
    handleSendInvoice
  };
};

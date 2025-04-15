
import JSZip from 'jszip';
import { Player, CustomerInfo, ProductInfo } from '@/types';
import { addCSVFilesToZip, addPDFToZip, addImagesToZip } from './zip/fileAddUtils';
import { generateAndDownloadZip } from './zip/zipGenerator';

// Main function to generate and download the zip
export const generateOrderZip = async (
  customerInfo: CustomerInfo,
  players: Player[],
  productInfo: ProductInfo
): Promise<void> => {
  try {
    console.log('Starting zip generation with:', { customerInfo, players, productInfo });
    const zip = new JSZip();
    
    // Add CSV files to zip
    addCSVFilesToZip(zip, customerInfo, players, productInfo);
    
    // Add PDF to zip
    await addPDFToZip(zip, customerInfo, players, productInfo);
    
    // Add images folder with images from all products
    const allImages: string[] = productInfo.products.flatMap(product => product.images);
    if (allImages.length > 0) {
      await addImagesToZip(zip, allImages);
    }
    
    // Generate zip file and trigger download
    await generateAndDownloadZip(zip, customerInfo.teamName);
    
    return Promise.resolve();
  } catch (error) {
    console.error('Error generating zip:', error);
    throw error;
  }
};

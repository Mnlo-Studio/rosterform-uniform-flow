
import JSZip from 'jszip';
import { Player, CustomerInfo, ProductInfo } from '@/types';
import { generateCustomerInfoCSV, generateRosterCSV, generateOrderSummaryCSV } from '../csvUtils';
import { generatePDF } from '../pdfUtils';
import { fetchImageAsBlob } from '../imageUtils';

// Add CSV files to the zip
export const addCSVFilesToZip = (
  zip: JSZip,
  customerInfo: CustomerInfo,
  players: Player[],
  productInfo: ProductInfo
): void => {
  // Add customer info CSV
  zip.file("customer_info.csv", generateCustomerInfoCSV(customerInfo));
  
  // Add roster CSV
  zip.file("roster.csv", generateRosterCSV(players));
  
  // Add order summary CSV
  zip.file("order_summary.csv", generateOrderSummaryCSV(players, productInfo));
};

// Add PDF file to the zip
export const addPDFToZip = async (
  zip: JSZip,
  customerInfo: CustomerInfo,
  players: Player[],
  productInfo: ProductInfo
): Promise<void> => {
  const pdfBlob = await generatePDF(customerInfo, players, productInfo);
  zip.file("order_details.pdf", pdfBlob);
};

// Add images to the zip
export const addImagesToZip = async (
  zip: JSZip,
  images: string[]
): Promise<void> => {
  if (!images || images.length === 0) return;
  
  const imagesFolder = zip.folder("images");
  
  for (let i = 0; i < images.length; i++) {
    const imageUrl = images[i];
    const imageData = await fetchImageAsBlob(imageUrl);
    
    if (imageData) {
      imagesFolder?.file(`image_${i + 1}.${imageData.extension}`, imageData.blob);
    }
  }
};

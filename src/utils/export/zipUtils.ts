
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { Player, CustomerInfo, ProductInfo } from '@/types';
import { generateCustomerInfoCSV, generateRosterCSV, generateOrderSummaryCSV } from './csvUtils';
import { generatePDF } from './pdfUtils';
import { fetchImageAsBlob } from './imageUtils';

// Main function to generate and download the zip
export const generateOrderZip = async (
  customerInfo: CustomerInfo,
  players: Player[],
  productInfo: ProductInfo
): Promise<void> => {
  try {
    console.log('Starting zip generation with:', { customerInfo, players, productInfo });
    const zip = new JSZip();
    
    // Add customer info CSV
    zip.file("customer_info.csv", generateCustomerInfoCSV(customerInfo));
    
    // Add roster CSV
    zip.file("roster.csv", generateRosterCSV(players));
    
    // Add order summary CSV
    zip.file("order_summary.csv", generateOrderSummaryCSV(players, productInfo));
    
    // Add PDF
    const pdfBlob = await generatePDF(customerInfo, players, productInfo);
    zip.file("order_details.pdf", pdfBlob);
    
    // Add images folder with images
    const imagesFolder = zip.folder("images");
    if (productInfo.images && productInfo.images.length > 0) {
      for (let i = 0; i < productInfo.images.length; i++) {
        const imageUrl = productInfo.images[i];
        const imageData = await fetchImageAsBlob(imageUrl);
        
        if (imageData) {
          imagesFolder?.file(`image_${i + 1}.${imageData.extension}`, imageData.blob);
        }
      }
    }
    
    // Generate the zip file and trigger download
    const zipBlob = await zip.generateAsync({ type: "blob" });
    console.log('Zip blob generated successfully');
    saveAs(zipBlob, `${customerInfo.teamName.replace(/\s+/g, '_')}_uniform_order.zip`);
    console.log('File saved');
    return Promise.resolve();
  } catch (error) {
    console.error('Error generating zip:', error);
    throw error;
  }
};


import { jsPDF } from 'jspdf';
import { CustomerInfo, Player, ProductInfo } from '@/types';
import { 
  createPdfDocument, 
  addTitle,
  addFooter,
  addSignatureLine
} from './documentUtils';
import { addProductImages } from './imageUtils';
import { 
  addCustomerInfoTable, 
  addProductInfoTable, 
  addRosterTable, 
  addOrderSummaryTable 
} from './tableUtils';

// Generate PDF with all information
export const generatePDF = async (
  customerInfo: CustomerInfo,
  players: Player[],
  productInfo: ProductInfo
): Promise<Blob> => {
  return new Promise(async (resolve) => {
    // Create document
    const doc = createPdfDocument();
    
    // Set consistent margins
    const margin = 15;
    let yOffset = margin;
    
    // Add title
    yOffset = addTitle(doc, yOffset);
    
    // Add product images if available
    if (productInfo.images && productInfo.images.length > 0) {
      yOffset = await addProductImages(doc, yOffset, productInfo.images);
    }
    
    // Add Customer Info Section
    yOffset = addCustomerInfoTable(doc, yOffset, customerInfo);
    
    // Add Product Info
    yOffset = addProductInfoTable(doc, yOffset, productInfo);
    
    // Add Roster Table
    yOffset = addRosterTable(doc, yOffset, players);
    
    // Add Order Summary
    yOffset = addOrderSummaryTable(doc, yOffset, players, productInfo);
    
    // Add signature line
    addSignatureLine(doc, yOffset);
    
    // Add footer
    addFooter(doc);
    
    // Generate the PDF blob
    resolve(doc.output('blob'));
  });
};

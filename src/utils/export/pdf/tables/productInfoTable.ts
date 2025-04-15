
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ProductInfo } from '@/types';
import { formatCurrency } from '../../../calculations';

// Add product information table to PDF
export const addProductInfoTable = (
  doc: jsPDF, 
  yOffset: number, 
  productInfo: ProductInfo
): number => {
  const margin = 15;
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Product Information', margin, yOffset);
  yOffset += 8;
  
  // Create table data for all products
  const productData: string[][] = [];
  
  // Add header row for product table
  productData.push(['Product Name', 'Price', 'Notes']);
  
  // Add data for each product
  productInfo.products.forEach(product => {
    productData.push([
      product.name || 'N/A',
      formatCurrency(product.pricePerItem),
      product.notes || 'N/A'
    ]);
  });
  
  autoTable(doc, {
    startY: yOffset,
    head: [['Product Name', 'Price', 'Notes']],
    body: productInfo.products.map(product => [
      product.name || 'N/A',
      formatCurrency(product.pricePerItem),
      product.notes || 'N/A'
    ]),
    theme: 'grid',
    styles: { 
      fontSize: 10,
      cellPadding: 3
    },
    headStyles: { 
      fillColor: [240, 240, 240],
      textColor: [50, 50, 50],
      fontStyle: 'bold'
    },
    alternateRowStyles: {
      fillColor: [248, 248, 248]
    },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 'auto' },
      1: { cellWidth: 40, halign: 'right' },
      2: { cellWidth: 'auto' }
    },
    margin: { left: margin, right: margin }
  });
  
  return (doc as any).lastAutoTable.finalY + 10;
};

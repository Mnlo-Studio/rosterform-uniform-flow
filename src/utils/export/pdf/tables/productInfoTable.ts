
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
  
  const productData = [
    ['Product Name', productInfo.name],
    ['Price Per Item', formatCurrency(productInfo.pricePerItem)],
    ['Notes', productInfo.notes || 'N/A']
  ];
  
  autoTable(doc, {
    startY: yOffset,
    head: [['Field', 'Value']],
    body: productData,
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
      0: { fontStyle: 'bold', cellWidth: 40 }
    },
    margin: { left: margin, right: margin }
  });
  
  return (doc as any).lastAutoTable.finalY + 10;
};

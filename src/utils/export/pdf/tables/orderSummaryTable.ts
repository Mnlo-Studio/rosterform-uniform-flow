
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Player, ProductInfo } from '@/types';
import { formatCurrency } from '../../../calculations';

// Add order summary table to PDF
export const addOrderSummaryTable = (
  doc: jsPDF, 
  yOffset: number, 
  players: Player[], 
  productInfo: ProductInfo
): number => {
  const margin = 15;
  
  // Check if we need to add a new page for the summary
  if (yOffset > doc.internal.pageSize.height - 80) {
    doc.addPage();
    yOffset = margin;
  }
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Order Summary', margin, yOffset);
  yOffset += 8;
  
  const totalCost = players.length * productInfo.pricePerItem;
  
  const summaryData = [
    ['Total Players', players.length.toString()],
    ['Price Per Item', formatCurrency(productInfo.pricePerItem)],
    ['Total Cost', formatCurrency(totalCost)]
  ];
  
  autoTable(doc, {
    startY: yOffset,
    head: [['Item', 'Value']],
    body: summaryData,
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
      0: { fontStyle: 'bold', cellWidth: 40 },
      1: { halign: 'right' }
    },
    margin: { left: margin, right: margin }
  });
  
  return (doc as any).lastAutoTable.finalY + 15;
};

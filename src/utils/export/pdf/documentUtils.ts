
import { jsPDF } from 'jspdf';
import { CustomerInfo, Player, ProductInfo } from '@/types';

// Set up PDF document with consistent settings
export const createPdfDocument = (): jsPDF => {
  // Create document with US Letter size (8.5" x 11")
  return new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'letter'
  });
};

// Add footer to the PDF document
export const addFooter = (doc: jsPDF, pageNumber: number = 1): void => {
  const footerYPos = doc.internal.pageSize.height - 10;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(150, 150, 150);
  doc.text('Generated on ' + new Date().toLocaleString(), 15, footerYPos);
  doc.text('Page ' + pageNumber + ' of ' + doc.getNumberOfPages(), doc.internal.pageSize.width - 15, footerYPos, { align: 'right' });
};

// Add title to the PDF document
export const addTitle = (doc: jsPDF, yOffset: number): number => {
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(50, 50, 50);
  doc.text('Uniform Order Summary', doc.internal.pageSize.width / 2, yOffset, { align: 'center' });
  yOffset += 8;
  
  // Add horizontal line below title
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.5);
  doc.line(15, yOffset, doc.internal.pageSize.width - 15, yOffset);
  
  return yOffset + 10;
};

// Add signature line
export const addSignatureLine = (doc: jsPDF, yOffset: number): void => {
  if (yOffset < doc.internal.pageSize.height - 40) {
    doc.setDrawColor(150, 150, 150);
    doc.setLineWidth(0.5);
    doc.line(15, yOffset, 15 + 70, yOffset);
    
    yOffset += 5;
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text('Authorized Signature', 15, yOffset);
    
    const date = new Date().toLocaleDateString();
    doc.setDrawColor(150, 150, 150);
    doc.line(doc.internal.pageSize.width - 15 - 40, yOffset - 5, doc.internal.pageSize.width - 15, yOffset - 5);
    doc.text('Date: ' + date, doc.internal.pageSize.width - 15 - 40, yOffset);
  }
};

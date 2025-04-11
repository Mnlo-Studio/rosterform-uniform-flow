
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CustomerInfo, Player, ProductInfo } from '@/types';
import { formatCurrency } from '../../calculations';

// Add customer information table to PDF
export const addCustomerInfoTable = (
  doc: jsPDF, 
  yOffset: number, 
  customerInfo: CustomerInfo
): number => {
  const margin = 15;
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(80, 80, 80);
  doc.text('Customer Information', margin, yOffset);
  yOffset += 8;
  
  // Format the customer data as a two-column table
  const customerData = [
    ['Team Name', customerInfo.teamName],
    ['Contact Name', customerInfo.contactName],
    ['Email', customerInfo.email],
    ['Phone', customerInfo.phone],
    ['Address', customerInfo.address],
    ['City, State, Zip', `${customerInfo.city}, ${customerInfo.state} ${customerInfo.zipCode}`]
  ];
  
  autoTable(doc, {
    startY: yOffset,
    head: [['Field', 'Value']],
    body: customerData,
    theme: 'grid',
    styles: { 
      fontSize: 10,
      cellPadding: 3,
    },
    headStyles: { 
      fillColor: [240, 240, 240],
      textColor: [50, 50, 50],
      fontStyle: 'bold',
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

// Add roster table to PDF
export const addRosterTable = (
  doc: jsPDF, 
  yOffset: number, 
  players: Player[]
): number => {
  const margin = 15;
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Roster', margin, yOffset);
  yOffset += 8;
  
  // Check if we need to add a new page for the roster
  if (yOffset > doc.internal.pageSize.height - 120) {
    doc.addPage();
    yOffset = margin;
  }
  
  const headers = ['#', 'Name', 'Number', 'Size', 'Gender', 'Shorts', 'Socks', 'Initials'];
  const rosterData = players.map((player, index) => [
    index + 1,
    player.name,
    player.number,
    player.size,
    player.gender,
    player.shortsSize || '-',
    player.sockSize || '-',
    player.initials || '-'
  ]);
  
  autoTable(doc, {
    startY: yOffset,
    head: [headers],
    body: rosterData,
    theme: 'grid',
    styles: { 
      fontSize: 9,
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
    margin: { left: margin, right: margin }
  });
  
  return (doc as any).lastAutoTable.finalY + 10;
};

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

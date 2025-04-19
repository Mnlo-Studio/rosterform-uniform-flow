
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CustomerInfo } from '@/types';

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
    ['City', customerInfo.city],
    ['State', customerInfo.state],
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

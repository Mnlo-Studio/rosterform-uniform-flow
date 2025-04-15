
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Player } from '@/types';
import { Product } from '@/types';

// Add roster table to PDF
export const addRosterTable = (
  doc: jsPDF, 
  yOffset: number, 
  players: Player[],
  products?: Product[]
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
  
  const headers = ['#', 'Name', 'Number', 'Size', 'Gender', 'Product', 'Shorts', 'Socks', 'Initials'];
  const rosterData = players.map((player, index) => {
    // Find the product name if available
    let productName = '-';
    if (player.productId && products) {
      const product = products.find(p => p.id === player.productId);
      if (product) {
        productName = product.name;
      }
    }
    
    return [
      index + 1,
      player.name,
      player.number,
      player.size,
      player.gender,
      productName,
      player.shortsSize || '-',
      player.sockSize || '-',
      player.initials || '-'
    ];
  });
  
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

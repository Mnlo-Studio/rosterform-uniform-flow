
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Player, CustomerInfo, ProductInfo } from '@/types';
import { formatCurrency } from '../calculations';
import { fetchImageAsBlob } from './imageUtils';

// Generate PDF with all information
export const generatePDF = async (
  customerInfo: CustomerInfo,
  players: Player[],
  productInfo: ProductInfo
): Promise<Blob> => {
  return new Promise(async (resolve) => {
    // Create document with US Letter size (8.5" x 11")
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'letter'
    });
    
    // Set consistent margins
    const margin = 15;
    let yOffset = margin;
    
    // Add title
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(50, 50, 50);
    doc.text('Uniform Order Summary', doc.internal.pageSize.width / 2, yOffset, { align: 'center' });
    yOffset += 8;
    
    // Add horizontal line below title
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.line(margin, yOffset, doc.internal.pageSize.width - margin, yOffset);
    yOffset += 10;
    
    // Add product images if available
    if (productInfo.images && productInfo.images.length > 0) {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(80, 80, 80);
      doc.text('Product Images', margin, yOffset);
      yOffset += 8;
      
      // Calculate image placement
      const maxImagesPerRow = Math.min(productInfo.images.length, 2);
      const imageWidth = (doc.internal.pageSize.width - 2 * margin - (maxImagesPerRow - 1) * 5) / maxImagesPerRow;
      const imageHeight = imageWidth * 0.75; // 4:3 aspect ratio
      
      // Add images to PDF
      const promises = [];
      
      for (let i = 0; i < Math.min(productInfo.images.length, 4); i++) {
        const row = Math.floor(i / maxImagesPerRow);
        const col = i % maxImagesPerRow;
        
        const xPos = margin + col * (imageWidth + 5);
        const yPos = yOffset + row * (imageHeight + 5);
        
        try {
          const imageUrl = productInfo.images[i];
          promises.push(
            fetchImageAsBlob(imageUrl)
              .then(imageData => {
                if (imageData) {
                  return new Promise<void>((res) => {
                    const reader = new FileReader();
                    reader.onloadend = function() {
                      const base64data = reader.result;
                      
                      if (typeof base64data === 'string') {
                        // Draw border around image
                        doc.setDrawColor(200, 200, 200);
                        doc.setLineWidth(0.5);
                        doc.rect(xPos, yPos, imageWidth, imageHeight);
                        
                        // Add image
                        doc.addImage(
                          base64data, 
                          imageData.extension.toUpperCase(), 
                          xPos, 
                          yPos, 
                          imageWidth, 
                          imageHeight
                        );
                      }
                      res();
                    };
                    reader.readAsDataURL(imageData.blob);
                  });
                }
                return Promise.resolve();
              })
          );
        } catch (error) {
          console.error(`Error adding image ${i} to PDF:`, error);
        }
      }
      
      // Wait for all images to be processed
      await Promise.all(promises);
      
      // Update yOffset to account for images
      const rowsNeeded = Math.ceil(Math.min(productInfo.images.length, 4) / maxImagesPerRow);
      yOffset += rowsNeeded * (imageHeight + 5) + 10;
    }
    
    // Customer Info Section
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
    
    yOffset = (doc as any).lastAutoTable.finalY + 10;
    
    // Product Info
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
    
    yOffset = (doc as any).lastAutoTable.finalY + 10;
    
    // Roster Table
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
    
    yOffset = (doc as any).lastAutoTable.finalY + 10;
    
    // Order Summary
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
    
    yOffset = (doc as any).lastAutoTable.finalY + 15;
    
    // Add signature line
    if (yOffset < doc.internal.pageSize.height - 40) {
      doc.setDrawColor(150, 150, 150);
      doc.setLineWidth(0.5);
      doc.line(margin, yOffset, margin + 70, yOffset);
      
      yOffset += 5;
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      doc.text('Authorized Signature', margin, yOffset);
      
      const date = new Date().toLocaleDateString();
      doc.setDrawColor(150, 150, 150);
      doc.line(doc.internal.pageSize.width - margin - 40, yOffset - 5, doc.internal.pageSize.width - margin, yOffset - 5);
      doc.text('Date: ' + date, doc.internal.pageSize.width - margin - 40, yOffset);
    }
    
    // Add footer
    const footerYPos = doc.internal.pageSize.height - 10;
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(150, 150, 150);
    doc.text('Generated on ' + new Date().toLocaleString(), margin, footerYPos);
    doc.text('Page 1 of ' + doc.getNumberOfPages(), doc.internal.pageSize.width - margin, footerYPos, { align: 'right' });
    
    // Generate the PDF blob
    resolve(doc.output('blob'));
  });
};


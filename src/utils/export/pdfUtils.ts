
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
    const doc = new jsPDF();
    let yOffset = 10;
    
    // Add title
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Uniform Order', 105, yOffset, { align: 'center' });
    yOffset += 10;
    
    // Add product images if available
    if (productInfo.images && productInfo.images.length > 0) {
      doc.setFontSize(14);
      doc.text('Product Images', 14, yOffset);
      yOffset += 10;
      
      // Calculate image placement
      const maxImagesPerRow = 2;
      const imageWidth = 80; // Width in mm
      const imageHeight = 60; // Height in mm
      const xMargin = 14; // Left margin
      const xGap = 10; // Gap between images horizontally
      
      // Add images to PDF
      for (let i = 0; i < Math.min(productInfo.images.length, 4); i++) {
        const row = Math.floor(i / maxImagesPerRow);
        const col = i % maxImagesPerRow;
        
        const xPos = xMargin + col * (imageWidth + xGap);
        const yPos = yOffset + row * (imageHeight + 10);
        
        try {
          const imageUrl = productInfo.images[i];
          const imageData = await fetchImageAsBlob(imageUrl);
          
          if (imageData) {
            // Convert blob to base64
            const reader = new FileReader();
            reader.onloadend = function() {
              const base64data = reader.result;
              
              // Add image to PDF
              if (typeof base64data === 'string') {
                doc.addImage(
                  base64data, 
                  imageData.extension.toUpperCase(), 
                  xPos, 
                  yPos, 
                  imageWidth, 
                  imageHeight
                );
                
                // If this is the last image, continue with rest of PDF
                if (i === Math.min(productInfo.images.length, 4) - 1) {
                  continueWithPDF();
                }
              }
            };
            reader.readAsDataURL(imageData.blob);
          } else {
            // If image failed to load, continue with rest of PDF
            if (i === Math.min(productInfo.images.length, 4) - 1) {
              continueWithPDF();
            }
          }
        } catch (error) {
          console.error(`Error adding image ${i} to PDF:`, error);
          // If there's an error with this image, continue with rest of PDF
          if (i === Math.min(productInfo.images.length, 4) - 1) {
            continueWithPDF();
          }
        }
      }
      
      // Update yOffset to account for images (2 rows maximum)
      const rowsNeeded = Math.ceil(Math.min(productInfo.images.length, 4) / maxImagesPerRow);
      yOffset += rowsNeeded * (imageHeight + 10);
    } else {
      // No images, continue with PDF
      continueWithPDF();
    }
    
    function continueWithPDF() {
      // Customer Info Section
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Customer Information', 14, yOffset);
      yOffset += 10;
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      
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
        styles: { fontSize: 10 },
        headStyles: { fillColor: [66, 139, 202] }
      });
      
      yOffset = (doc as any).lastAutoTable.finalY + 10;
      
      // Product Info
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Product Information', 14, yOffset);
      yOffset += 10;
      
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
        styles: { fontSize: 10 },
        headStyles: { fillColor: [66, 139, 202] }
      });
      
      yOffset = (doc as any).lastAutoTable.finalY + 10;
      
      // Roster Table
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Roster', 14, yOffset);
      yOffset += 10;
      
      // Check if we need to add a new page for the roster
      if (yOffset > 180) {
        doc.addPage();
        yOffset = 20;
      }
      
      const headers = ['#', 'Name', 'Number', 'Size', 'Gender', 'Shorts', 'Socks', 'Initials'];
      const rosterData = players.map((player, index) => [
        index + 1,
        player.name,
        player.number,
        player.size,
        player.gender,
        player.shortsSize || '',
        player.sockSize || '',
        player.initials || ''
      ]);
      
      autoTable(doc, {
        startY: yOffset,
        head: [headers],
        body: rosterData,
        theme: 'grid',
        styles: { fontSize: 9 },
        headStyles: { fillColor: [66, 139, 202] }
      });
      
      yOffset = (doc as any).lastAutoTable.finalY + 10;
      
      // Order Summary
      // Check if we need to add a new page for the summary
      if (yOffset > 180) {
        doc.addPage();
        yOffset = 20;
      }
      
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Order Summary', 14, yOffset);
      yOffset += 10;
      
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
        styles: { fontSize: 10 },
        headStyles: { fillColor: [66, 139, 202] }
      });
      
      // Generate the PDF blob
      resolve(doc.output('blob'));
    }
  });
};

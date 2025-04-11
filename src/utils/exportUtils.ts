
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import Papa from 'papaparse';
import { Player, CustomerInfo, ProductInfo } from '@/types';
import { formatCurrency } from './calculations';

// Generate CSV for customer info
export const generateCustomerInfoCSV = (customerInfo: CustomerInfo): string => {
  const data = [
    ['Team Name', customerInfo.teamName],
    ['Contact Name', customerInfo.contactName],
    ['Email', customerInfo.email],
    ['Phone', customerInfo.phone],
    ['Address', customerInfo.address],
    ['City', customerInfo.city],
    ['State', customerInfo.state],
    ['Zip Code', customerInfo.zipCode]
  ];
  
  return Papa.unparse(data);
};

// Generate CSV for roster
export const generateRosterCSV = (players: Player[]): string => {
  const headers = ['#', 'Name', 'Number', 'Size', 'Gender', 'Shorts Size', 'Sock Size', 'Initials'];
  
  const data = players.map((player, index) => [
    index + 1,
    player.name,
    player.number,
    player.size,
    player.gender,
    player.shortsSize || '',
    player.sockSize || '',
    player.initials || ''
  ]);
  
  return Papa.unparse([headers, ...data]);
};

// Generate CSV for order summary
export const generateOrderSummaryCSV = (
  players: Player[], 
  productInfo: ProductInfo
): string => {
  const totalCost = players.length * productInfo.pricePerItem;
  
  // Group by size
  const sizeCount: Record<string, number> = {};
  players.forEach(player => {
    const size = player.size;
    if (size) {
      sizeCount[size] = (sizeCount[size] || 0) + 1;
    }
  });
  
  // Group by gender
  const genderCount: Record<string, number> = {};
  players.forEach(player => {
    const gender = player.gender;
    if (gender) {
      genderCount[gender] = (genderCount[gender] || 0) + 1;
    }
  });
  
  const data = [
    ['Total Players', players.length.toString()],
    ['Price Per Item', formatCurrency(productInfo.pricePerItem)],
    ['Total Cost', formatCurrency(totalCost)],
    ['', ''],
    ['Size Breakdown', '']
  ];
  
  Object.entries(sizeCount).forEach(([size, count]) => {
    data.push([size, count.toString()]);
  });
  
  data.push(['', '']);
  data.push(['Gender Breakdown', '']);
  
  Object.entries(genderCount).forEach(([gender, count]) => {
    data.push([gender, count.toString()]);
  });
  
  return Papa.unparse(data);
};

// Generate PDF with all information
export const generatePDF = (
  customerInfo: CustomerInfo,
  players: Player[],
  productInfo: ProductInfo
): Promise<Blob> => {
  return new Promise((resolve) => {
    const doc = new jsPDF();
    let yOffset = 10;
    
    // Add title
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Uniform Order', 105, yOffset, { align: 'center' });
    yOffset += 10;
    
    // Customer Info Section
    doc.setFontSize(14);
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
  });
};

// Main function to generate and download the zip
export const generateOrderZip = async (
  customerInfo: CustomerInfo,
  players: Player[],
  productInfo: ProductInfo
): Promise<void> => {
  const zip = new JSZip();
  
  // Add customer info CSV
  zip.file("customer_info.csv", generateCustomerInfoCSV(customerInfo));
  
  // Add roster CSV
  zip.file("roster.csv", generateRosterCSV(players));
  
  // Add order summary CSV
  zip.file("order_summary.csv", generateOrderSummaryCSV(players, productInfo));
  
  // Add PDF
  const pdfBlob = await generatePDF(customerInfo, players, productInfo);
  zip.file("order_details.pdf", pdfBlob);
  
  // Add images folder with images
  const imagesFolder = zip.folder("images");
  if (productInfo.images && productInfo.images.length > 0) {
    for (let i = 0; i < productInfo.images.length; i++) {
      try {
        const imageUrl = productInfo.images[i];
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        imagesFolder?.file(`image_${i + 1}.${getImageExtension(imageUrl)}`, blob);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    }
  }
  
  // Generate the zip file and trigger download
  const zipBlob = await zip.generateAsync({ type: "blob" });
  saveAs(zipBlob, `${customerInfo.teamName.replace(/\s+/g, '_')}_uniform_order.zip`);
};

// Helper to determine image extension
const getImageExtension = (url: string): string => {
  const extension = url.split('.').pop()?.toLowerCase() || 'jpg';
  // Only allow common image extensions
  return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension) ? extension : 'jpg';
};

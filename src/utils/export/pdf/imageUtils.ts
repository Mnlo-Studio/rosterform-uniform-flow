
import { jsPDF } from 'jspdf';
import { fetchImageAsBlob } from '../imageUtils';

// Add product images to the PDF
export const addProductImages = async (
  doc: jsPDF, 
  yOffset: number, 
  images: string[]
): Promise<number> => {
  if (!images || images.length === 0) {
    return yOffset;
  }
  
  const margin = 15;
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(80, 80, 80);
  doc.text('Product Images', margin, yOffset);
  yOffset += 8;
  
  // Calculate image placement
  const maxImagesPerRow = Math.min(images.length, 2);
  const imageWidth = (doc.internal.pageSize.width - 2 * margin - (maxImagesPerRow - 1) * 5) / maxImagesPerRow;
  const imageHeight = imageWidth * 0.75; // 4:3 aspect ratio
  
  // Add images to PDF
  const promises = [];
  
  for (let i = 0; i < Math.min(images.length, 4); i++) {
    const row = Math.floor(i / maxImagesPerRow);
    const col = i % maxImagesPerRow;
    
    const xPos = margin + col * (imageWidth + 5);
    const yPos = yOffset + row * (imageHeight + 5);
    
    try {
      const imageUrl = images[i];
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
  const rowsNeeded = Math.ceil(Math.min(images.length, 4) / maxImagesPerRow);
  return yOffset + rowsNeeded * (imageHeight + 5) + 10;
};

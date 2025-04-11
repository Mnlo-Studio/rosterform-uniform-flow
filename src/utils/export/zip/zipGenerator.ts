
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { CustomerInfo } from '@/types';

// Generate the zip file and trigger download
export const generateAndDownloadZip = async (
  zipContent: JSZip,
  teamName: string
): Promise<void> => {
  try {
    console.log('Generating zip blob...');
    const zipBlob = await zipContent.generateAsync({ type: "blob" });
    console.log('Zip blob generated successfully');
    
    // Create a sanitized filename from team name
    const safeFileName = teamName.replace(/\s+/g, '_');
    saveAs(zipBlob, `${safeFileName}_uniform_order.zip`);
    console.log('File saved');
    return Promise.resolve();
  } catch (error) {
    console.error('Error generating zip file:', error);
    throw error;
  }
};

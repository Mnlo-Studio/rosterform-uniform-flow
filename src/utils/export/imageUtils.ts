
// Helper to determine image extension
export const getImageExtension = (url: string): string => {
  const extension = url.split('.').pop()?.toLowerCase() || 'jpg';
  // Only allow common image extensions
  return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension) ? extension : 'jpg';
};

// Fetch an image from a URL and convert it to a blob
export const fetchImageAsBlob = async (imageUrl: string): Promise<{blob: Blob, extension: string} | null> => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const extension = getImageExtension(imageUrl);
    return { blob, extension };
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
};


import { Product, Player } from '@/types';
import { v4 as uuidv4 } from 'uuid';

// Create an empty product with default values
export const createEmptyProduct = (): Product => ({
  id: uuidv4(),
  name: '',
  pricePerItem: 0,
  notes: '',
  images: [],
});

// Handle product list operations (moving up/down)
export const moveProductInList = (
  products: Product[],
  productId: string,
  direction: 'up' | 'down'
): Product[] => {
  const productsCopy = [...products];
  const index = productsCopy.findIndex(p => p.id === productId);
  
  if (direction === 'up' && index > 0) {
    const temp = productsCopy[index];
    productsCopy[index] = productsCopy[index - 1];
    productsCopy[index - 1] = temp;
  } else if (direction === 'down' && index < productsCopy.length - 1) {
    const temp = productsCopy[index];
    productsCopy[index] = productsCopy[index + 1];
    productsCopy[index + 1] = temp;
  }
  
  return productsCopy;
};

// Check if all players have products assigned
export const areAllPlayersAssignedProducts = (
  players: Player[],
  productsExist: boolean
): boolean => {
  if (players.length === 0 || !productsExist) return true;
  return players.every(player => player.productId !== undefined);
};

// Image related utility functions
export const addProductImage = (
  products: Product[],
  productId: string,
  image: string
): Product[] => {
  return products.map(product => 
    product.id === productId 
      ? { ...product, images: [...product.images, image] } 
      : product
  );
};

export const removeProductImage = (
  products: Product[],
  productId: string,
  imageIndex: number
): Product[] => {
  return products.map(product => {
    if (product.id === productId) {
      const newImages = [...product.images];
      newImages.splice(imageIndex, 1);
      return { ...product, images: newImages };
    }
    return product;
  });
};

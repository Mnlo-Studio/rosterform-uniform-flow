
import React, { useState, useCallback } from 'react';
import { Player, CustomerInfo, ProductInfo, BulkOptions, Product } from '@/types';
import { 
  createPlayers, 
  applyBulkOptionsToPlayers 
} from './rosterPlayerUtils';
import { 
  createEmptyProduct, 
  moveProductInList, 
  areAllPlayersAssignedProducts,
  addProductImage,
  removeProductImage
} from './rosterProductUtils';
import {
  initialCustomerInfo,
  initialProductInfo,
  initialBulkOptions
} from './initialState';
import { RosterContextType } from '../RosterContextTypes';

export const useRosterState = (): RosterContextType => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>(initialCustomerInfo);
  const [productInfo, setProductInfo] = useState<ProductInfo>(initialProductInfo);
  const [bulkOptions, setBulkOptions] = useState<BulkOptions>(initialBulkOptions);

  // Player management functions
  const addPlayers = useCallback((count: number): Player[] => {
    console.log(`useRosterState: Adding ${count} players with default product ID`);
    const defaultProductId = productInfo.products.length === 1 ? productInfo.products[0].id : undefined;
    console.log('Default product ID:', defaultProductId);
    
    const newPlayers = createPlayers(count, players.length, bulkOptions, defaultProductId);
    console.log('Created new players:', newPlayers);
    
    setPlayers(prevPlayers => {
      const updatedPlayers = [...prevPlayers, ...newPlayers];
      console.log('Updated players array:', updatedPlayers);
      return updatedPlayers;
    });
    
    return newPlayers; // Return the newly created players
  }, [players.length, bulkOptions, productInfo.products]);

  const removePlayer = (id: string) => {
    setPlayers(players.filter(player => player.id !== id));
  };

  const updatePlayer = (id: string, data: Partial<Player>) => {
    setPlayers(players.map(player => 
      player.id === id ? { ...player, ...data } : player
    ));
  };

  // Customer info management
  const updateCustomerInfo = (data: Partial<CustomerInfo>) => {
    setCustomerInfo({ ...customerInfo, ...data });
  };

  // Product management functions
  const addProduct = () => {
    setProductInfo({
      ...productInfo,
      products: [...productInfo.products, createEmptyProduct()]
    });
  };

  const updateProduct = (id: string, data: Partial<Product>) => {
    setProductInfo({
      ...productInfo,
      products: productInfo.products.map(product => 
        product.id === id ? { ...product, ...data } : product
      )
    });
  };

  const removeProduct = (id: string) => {
    setProductInfo({
      ...productInfo,
      products: productInfo.products.filter(product => product.id !== id)
    });
    
    setPlayers(players.map(player => 
      player.productId === id ? { ...player, productId: undefined } : player
    ));
  };

  const moveProductUp = (id: string) => {
    const updatedProducts = moveProductInList(productInfo.products, id, 'up');
    setProductInfo({ ...productInfo, products: updatedProducts });
  };

  const moveProductDown = (id: string) => {
    const updatedProducts = moveProductInList(productInfo.products, id, 'down');
    setProductInfo({ ...productInfo, products: updatedProducts });
  };

  // Product assignment functions
  const assignProductToPlayer = (playerId: string, productId: string | undefined) => {
    setPlayers(players.map(player => 
      player.id === playerId ? { ...player, productId } : player
    ));
  };

  const bulkAssignProductToPlayers = (productId: string) => {
    console.log(`Bulk assigning product ${productId} to all ${players.length} players`);
    setPlayers(players.map(player => ({ ...player, productId })));
  };

  // Bulk options management
  const updateBulkOptions = (data: Partial<BulkOptions>) => {
    setBulkOptions({ ...bulkOptions, ...data });
  };

  const applyBulkOptions = () => {
    const updatedPlayers = applyBulkOptionsToPlayers(players, bulkOptions);
    setPlayers(updatedPlayers);
  };

  // Image management
  const addImage = (productId: string, image: string) => {
    const updatedProducts = addProductImage(productInfo.products, productId, image);
    setProductInfo({ ...productInfo, products: updatedProducts });
  };

  const removeImage = (productId: string, index: number) => {
    const updatedProducts = removeProductImage(productInfo.products, productId, index);
    setProductInfo({ ...productInfo, products: updatedProducts });
  };

  // Reset functions
  const resetRoster = () => {
    setPlayers([]);
  };

  const resetCustomerInfo = () => {
    setCustomerInfo(initialCustomerInfo);
  };

  const resetProductInfo = () => {
    setProductInfo(initialProductInfo);
  };

  // Add resetRosterState function that combines all resets
  const resetRosterState = () => {
    resetRoster();
    resetCustomerInfo();
    resetProductInfo();
  };

  // Add calculateTotalPrice function
  const calculateTotalPrice = () => {
    let total = 0;
    
    // Sum up the price of each product for each player
    players.forEach(player => {
      if (player.productId) {
        const product = productInfo.products.find(p => p.id === player.productId);
        if (product) {
          total += product.pricePerItem;
        }
      }
    });
    
    return total;
  };

  return {
    players,
    customerInfo,
    productInfo,
    products: productInfo.products, // Add the products property
    bulkOptions,
    addPlayers,
    removePlayer,
    updatePlayer,
    updateCustomerInfo,
    addProduct,
    updateProduct,
    removeProduct,
    moveProductUp,
    moveProductDown,
    assignProductToPlayer,
    bulkAssignProductToPlayers,
    updateBulkOptions,
    addImage,
    removeImage,
    applyBulkOptions,
    resetRoster,
    resetCustomerInfo,
    resetProductInfo,
    resetRosterState, // Add the resetRosterState function
    calculateTotalPrice, // Add the calculateTotalPrice function
    areAllPlayersAssignedProducts: () => areAllPlayersAssignedProducts(
      players, 
      productInfo.products.length > 0
    )
  };
};


import React, { useState, ReactNode } from 'react';
import { Player, CustomerInfo, ProductInfo, BulkOptions, Product } from '@/types';
import { RosterContext } from './RosterContext';
import { 
  createPlayers, 
  applyBulkOptionsToPlayers 
} from './roster/rosterPlayerUtils';
import { 
  createEmptyProduct, 
  moveProductInList, 
  areAllPlayersAssignedProducts,
  addProductImage,
  removeProductImage
} from './roster/rosterProductUtils';
import {
  initialCustomerInfo,
  initialProductInfo,
  initialBulkOptions
} from './roster/initialState';

interface RosterProviderProps {
  children: ReactNode;
}

export const RosterProvider: React.FC<RosterProviderProps> = ({ children }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>(initialCustomerInfo);
  const [productInfo, setProductInfo] = useState<ProductInfo>(initialProductInfo);
  const [bulkOptions, setBulkOptions] = useState<BulkOptions>(initialBulkOptions);

  // Player management functions
  const addPlayers = (count: number) => {
    const defaultProductId = productInfo.products.length === 1 ? productInfo.products[0].id : undefined;
    const newPlayers = createPlayers(count, players.length, bulkOptions, defaultProductId);
    setPlayers([...players, ...newPlayers]);
  };

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
    // Remove the product
    setProductInfo({
      ...productInfo,
      products: productInfo.products.filter(product => product.id !== id)
    });
    
    // Remove this product from any players who had it assigned
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

  return (
    <RosterContext.Provider value={{
      players,
      customerInfo,
      productInfo,
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
      areAllPlayersAssignedProducts: () => areAllPlayersAssignedProducts(
        players, 
        productInfo.products.length > 0
      )
    }}>
      {children}
    </RosterContext.Provider>
  );
};

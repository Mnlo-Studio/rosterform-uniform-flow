
import React, { useState, ReactNode } from 'react';
import { Player, CustomerInfo, ProductInfo, BulkOptions } from '@/types';
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
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);

  // Player management functions
  const addPlayers = (count: number) => {
    const defaultProductId = productInfo.products.length === 1 ? productInfo.products[0].id : undefined;
    const newPlayers = createPlayers(count, players.length, bulkOptions, defaultProductId);
    setPlayers([...players, ...newPlayers]);
  };

  const removePlayer = (id: string) => {
    setPlayers(players.filter(player => player.id !== id));
    if (selectedPlayers.includes(id)) {
      setSelectedPlayers(selectedPlayers.filter(playerId => playerId !== id));
    }
  };

  const updatePlayer = (id: string, data: Partial<Player>) => {
    setPlayers(players.map(player => 
      player.id === id ? { ...player, ...data } : player
    ));
  };

  // Player selection functions
  const selectPlayer = (playerId: string) => {
    if (!selectedPlayers.includes(playerId)) {
      setSelectedPlayers([...selectedPlayers, playerId]);
    }
  };

  const deselectPlayer = (playerId: string) => {
    setSelectedPlayers(selectedPlayers.filter(id => id !== playerId));
  };

  const togglePlayerSelection = (playerId: string) => {
    if (selectedPlayers.includes(playerId)) {
      deselectPlayer(playerId);
    } else {
      selectPlayer(playerId);
    }
  };

  const selectAllPlayers = () => {
    setSelectedPlayers(players.map(player => player.id));
  };

  const deselectAllPlayers = () => {
    setSelectedPlayers([]);
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

  return {
    players,
    customerInfo,
    productInfo,
    bulkOptions,
    selectedPlayers,
    addPlayers,
    removePlayer,
    updatePlayer,
    selectPlayer,
    deselectPlayer,
    togglePlayerSelection,
    selectAllPlayers,
    deselectAllPlayers,
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
  };
};

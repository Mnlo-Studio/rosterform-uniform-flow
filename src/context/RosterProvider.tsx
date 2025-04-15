
import React, { useState, ReactNode } from 'react';
import { Player, CustomerInfo, ProductInfo, BulkOptions, Product } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { generateNumber, generateName } from '@/utils/rosterHelpers';
import { RosterContext } from './RosterContext';

interface RosterProviderProps {
  children: ReactNode;
}

export const RosterProvider: React.FC<RosterProviderProps> = ({ children }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    teamName: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });
  const [productInfo, setProductInfo] = useState<ProductInfo>({
    products: [],
  });
  const [bulkOptions, setBulkOptions] = useState<BulkOptions>({
    defaultGender: 'Male',
    defaultSize: 'M',
    numberFillType: 'custom',
    numberPrefix: '',
    namePrefixType: 'custom',
    namePrefix: '',
    nameCaseType: 'normal',
    showName: true,
    showNumber: true,
    showShortsSize: false,
    showSockSize: false,
    showInitials: false,
  });

  const addPlayers = (count: number) => {
    const newPlayers = Array.from({ length: count }, (_, index) => {
      const existingCount = players.length;
      return {
        id: uuidv4(),
        name: generateName(
          bulkOptions.namePrefixType, 
          bulkOptions.namePrefix, 
          existingCount + index,
          bulkOptions.nameCaseType
        ),
        number: bulkOptions.numberFillType !== 'custom' 
          ? generateNumber(bulkOptions.numberFillType, existingCount + index, bulkOptions.numberPrefix) 
          : '',
        size: bulkOptions.defaultSize,
        gender: bulkOptions.defaultGender,
        shortsSize: bulkOptions.defaultSize,
        sockSize: bulkOptions.defaultSize,
        initials: '',
        productId: productInfo.products.length === 1 ? productInfo.products[0].id : undefined,
      };
    });

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

  const updateCustomerInfo = (data: Partial<CustomerInfo>) => {
    setCustomerInfo({ ...customerInfo, ...data });
  };

  // Create an empty product with default values
  const createEmptyProduct = (): Product => ({
    id: uuidv4(),
    name: '',
    pricePerItem: 0,
    notes: '',
    images: [],
  });

  // Add a new product
  const addProduct = () => {
    setProductInfo({
      ...productInfo,
      products: [...productInfo.products, createEmptyProduct()]
    });
  };

  // Update an existing product
  const updateProduct = (id: string, data: Partial<Product>) => {
    setProductInfo({
      ...productInfo,
      products: productInfo.products.map(product => 
        product.id === id ? { ...product, ...data } : product
      )
    });
  };

  // Remove a product
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

  // Move a product up in the list
  const moveProductUp = (id: string) => {
    const products = [...productInfo.products];
    const index = products.findIndex(p => p.id === id);
    if (index > 0) {
      const temp = products[index];
      products[index] = products[index - 1];
      products[index - 1] = temp;
      setProductInfo({ ...productInfo, products });
    }
  };

  // Move a product down in the list
  const moveProductDown = (id: string) => {
    const products = [...productInfo.products];
    const index = products.findIndex(p => p.id === id);
    if (index < products.length - 1) {
      const temp = products[index];
      products[index] = products[index + 1];
      products[index + 1] = temp;
      setProductInfo({ ...productInfo, products });
    }
  };

  // Assign a product to a player
  const assignProductToPlayer = (playerId: string, productId: string | undefined) => {
    setPlayers(players.map(player => 
      player.id === playerId ? { ...player, productId } : player
    ));
  };

  // Bulk assign a product to all players
  const bulkAssignProductToPlayers = (productId: string) => {
    setPlayers(players.map(player => ({ ...player, productId })));
  };

  const updateBulkOptions = (data: Partial<BulkOptions>) => {
    setBulkOptions({ ...bulkOptions, ...data });
  };

  const addImage = (productId: string, image: string) => {
    updateProduct(productId, {
      images: [...(productInfo.products.find(p => p.id === productId)?.images || []), image]
    });
  };

  const removeImage = (productId: string, index: number) => {
    const product = productInfo.products.find(p => p.id === productId);
    if (product) {
      const newImages = [...product.images];
      newImages.splice(index, 1);
      updateProduct(productId, { images: newImages });
    }
  };

  const applyBulkOptions = () => {
    if (players.length === 0) return;
    
    setPlayers(players.map((player, index) => {
      const updatedPlayer = { ...player };
      
      updatedPlayer.gender = bulkOptions.defaultGender;
      
      updatedPlayer.size = bulkOptions.defaultSize;
      
      if (bulkOptions.showShortsSize) {
        updatedPlayer.shortsSize = bulkOptions.defaultSize;
      }
      
      if (bulkOptions.showSockSize) {
        updatedPlayer.sockSize = bulkOptions.defaultSize;
      }
      
      if (bulkOptions.numberFillType !== 'custom') {
        updatedPlayer.number = generateNumber(
          bulkOptions.numberFillType, 
          index, 
          bulkOptions.numberPrefix
        );
      }
      
      if (bulkOptions.namePrefixType !== 'none') {
        updatedPlayer.name = generateName(
          bulkOptions.namePrefixType,
          bulkOptions.namePrefix,
          index,
          bulkOptions.nameCaseType
        );
      }
      
      return updatedPlayer;
    }));
  };

  const resetRoster = () => {
    setPlayers([]);
  };

  const resetCustomerInfo = () => {
    setCustomerInfo({
      teamName: '',
      contactName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
    });
  };

  const resetProductInfo = () => {
    setProductInfo({
      products: [],
    });
  };

  // Check if all players have a product assigned
  const areAllPlayersAssignedProducts = (): boolean => {
    if (players.length === 0 || productInfo.products.length === 0) return true;
    return players.every(player => player.productId !== undefined);
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
      areAllPlayersAssignedProducts
    }}>
      {children}
    </RosterContext.Provider>
  );
};

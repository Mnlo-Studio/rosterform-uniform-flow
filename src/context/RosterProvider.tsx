import React, { useState, ReactNode } from 'react';
import { Player, CustomerInfo, ProductInfo, BulkOptions } from '@/types';
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
    name: '',
    pricePerItem: 0,
    notes: '',
    images: [],
  });
  const [bulkOptions, setBulkOptions] = useState<BulkOptions>({
    defaultGender: 'Male',
    defaultSize: 'M',
    numberFillType: 'custom',
    numberPrefix: '',
    namePrefixType: 'custom',
    namePrefix: '',
    nameCaseType: 'normal',
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

  const updateProductInfo = (data: Partial<ProductInfo>) => {
    setProductInfo({ ...productInfo, ...data });
  };

  const updateBulkOptions = (data: Partial<BulkOptions>) => {
    setBulkOptions({ ...bulkOptions, ...data });
  };

  const addImage = (image: string) => {
    if (productInfo.images.length < 4) {
      setProductInfo({
        ...productInfo,
        images: [...productInfo.images, image]
      });
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...productInfo.images];
    newImages.splice(index, 1);
    setProductInfo({
      ...productInfo,
      images: newImages
    });
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
      updateProductInfo,
      updateBulkOptions,
      addImage,
      removeImage,
      applyBulkOptions
    }}>
      {children}
    </RosterContext.Provider>
  );
};

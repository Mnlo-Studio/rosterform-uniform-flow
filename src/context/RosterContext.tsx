import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Player, CustomerInfo, ProductInfo, BulkOptions } from '@/types';
import { v4 as uuidv4 } from 'uuid';

interface RosterContextType {
  players: Player[];
  customerInfo: CustomerInfo;
  productInfo: ProductInfo;
  bulkOptions: BulkOptions;
  addPlayers: (count: number) => void;
  removePlayer: (id: string) => void;
  updatePlayer: (id: string, data: Partial<Player>) => void;
  updateCustomerInfo: (data: Partial<CustomerInfo>) => void;
  updateProductInfo: (data: Partial<ProductInfo>) => void;
  updateBulkOptions: (data: Partial<BulkOptions>) => void;
  addImage: (image: string) => void;
  removeImage: (index: number) => void;
  applyBulkOptions: () => void;
}

const RosterContext = createContext<RosterContextType | undefined>(undefined);

// Helper function to generate random numbers
const generateNumber = (fillType: 'odd' | 'even' | 'random', index: number): string => {
  if (fillType === 'odd') {
    return `${index * 2 + 1}`;
  } else if (fillType === 'even') {
    return `${(index + 1) * 2}`;
  } else {
    return `${Math.floor(Math.random() * 99) + 1}`;
  }
};

// Update the helper function to handle name casing
const generateName = (
  prefixType: 'none' | 'player' | 'custom', 
  prefix: string, 
  index: number, 
  caseType: 'normal' | 'uppercase' | 'lowercase'
): string => {
  let name = '';
  if (prefixType === 'none') {
    name = '';
  } else if (prefixType === 'player') {
    name = `Player ${index + 1}`;
  } else {
    name = `${prefix} ${index + 1}`;
  }

  switch(caseType) {
    case 'uppercase':
      return name.toUpperCase();
    case 'lowercase':
      return name.toLowerCase();
    default:
      return name;
  }
};

export const RosterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
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
    numberFillType: 'manual',
    namePrefixType: 'none',
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
        number: bulkOptions.numberFillType !== 'manual' 
          ? generateNumber(bulkOptions.numberFillType, existingCount + index) 
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
    
    setPlayers(players.map(player => {
      const updatedPlayer = { ...player };
      
      updatedPlayer.gender = bulkOptions.defaultGender;
      
      updatedPlayer.size = bulkOptions.defaultSize;
      
      if (bulkOptions.showShortsSize) {
        updatedPlayer.shortsSize = bulkOptions.defaultSize;
      }
      
      if (bulkOptions.showSockSize) {
        updatedPlayer.sockSize = bulkOptions.defaultSize;
      }
      
      if (bulkOptions.numberFillType !== 'manual') {
        const index = players.findIndex(p => p.id === player.id);
        updatedPlayer.number = generateNumber(bulkOptions.numberFillType, index);
      }
      
      if (bulkOptions.namePrefixType !== 'none') {
        const index = players.findIndex(p => p.id === player.id);
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

export const useRoster = (): RosterContextType => {
  const context = useContext(RosterContext);
  if (context === undefined) {
    throw new Error('useRoster must be used within a RosterProvider');
  }
  return context;
};


import React, { useEffect } from 'react';
import DefaultOptionsSection from './DefaultOptionsSection';
import CustomNamePrefixInput from './CustomNamePrefixInput';
import CustomNumberPrefixInput from './CustomNumberPrefixInput';
import QuickAddButtons from './QuickAddButtons';
import BulkProductAssignmentSection from './BulkProductAssignmentSection';
import { BulkOptions } from '@/types';

interface BulkOptionsGridProps {
  bulkOptions: BulkOptions;
  quickAddCount: number | null;
  selectedProductId: string;
  hasProducts: boolean;
  onGenderChange: (value: string) => void;
  onSizeChange: (value: string) => void;
  onNumberFillChange: (value: 'custom' | 'odd' | 'even' | 'random') => void;
  onNamePrefixTypeChange: (value: 'none' | 'player' | 'custom') => void;
  onNameCaseChange: (value: 'normal' | 'uppercase' | 'lowercase') => void;
  onNamePrefixChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNumberPrefixChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onQuickAddSelection: (count: number) => void;
  onProductSelection: (productId: string) => void;
}

const BulkOptionsGrid: React.FC<BulkOptionsGridProps> = ({
  bulkOptions,
  quickAddCount,
  selectedProductId,
  hasProducts,
  onGenderChange,
  onSizeChange,
  onNumberFillChange,
  onNamePrefixTypeChange,
  onNameCaseChange,
  onNamePrefixChange,
  onNumberPrefixChange,
  onQuickAddSelection,
  onProductSelection
}) => {
  // Debug logging
  useEffect(() => {
    console.log('BulkOptionsGrid - Has Products:', hasProducts);
    console.log('BulkOptionsGrid - Selected Product ID:', selectedProductId);
  }, [hasProducts, selectedProductId]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* First row: Quick add and bulk product */}
      <QuickAddButtons 
        onSelectQuickAdd={onQuickAddSelection} 
        selectedCount={quickAddCount}
      />
      
      {/* Bulk product assignment - always show, whether or not there are products */}
      <BulkProductAssignmentSection 
        selectedProductId={selectedProductId}
        onProductSelect={onProductSelection}
      />
    
      {/* Second row: Default Gender and Size */}
      <div>
        <label htmlFor="defaultGender" className="text-sm font-medium mb-2 block">Default Gender</label>
        <DefaultOptionsSection.GenderSelect 
          value={bulkOptions.defaultGender} 
          onChange={onGenderChange} 
        />
      </div>
      
      <div>
        <label htmlFor="defaultSize" className="text-sm font-medium mb-2 block">Default Size</label>
        <DefaultOptionsSection.SizeSelect 
          value={bulkOptions.defaultSize} 
          onChange={onSizeChange} 
        />
      </div>
      
      {/* Third row: Name Auto-Fill and Number Auto-Fill */}
      <div>
        <label htmlFor="namePrefixType" className="text-sm font-medium mb-2 block">Name Auto-Fill</label>
        <DefaultOptionsSection.NamePrefixSelect 
          value={bulkOptions.namePrefixType} 
          onChange={onNamePrefixTypeChange} 
        />
      </div>
      
      <div>
        <label htmlFor="numberFill" className="text-sm font-medium mb-2 block">Number Auto-Fill</label>
        <DefaultOptionsSection.NumberFillSelect 
          value={bulkOptions.numberFillType} 
          onChange={onNumberFillChange} 
        />
      </div>
      
      {/* Fourth row: Name Case (left column only) */}
      <div>
        <label htmlFor="nameCaseType" className="text-sm font-medium mb-2 block">Name Case</label>
        <DefaultOptionsSection.NameCaseSelect 
          value={bulkOptions.nameCaseType} 
          onChange={onNameCaseChange} 
        />
      </div>
      
      {/* No element in right column of fourth row */}
      <div></div>
      
      {/* Fifth row: Custom inputs (only shown conditionally) */}
      {bulkOptions.namePrefixType === 'custom' && (
        <div>
          <CustomNamePrefixInput prefix={bulkOptions.namePrefix} onChange={onNamePrefixChange} />
        </div>
      )}
      
      {bulkOptions.numberFillType === 'custom' && (
        <div>
          <CustomNumberPrefixInput prefix={bulkOptions.numberPrefix || ''} onChange={onNumberPrefixChange} />
        </div>
      )}
    </div>
  );
};

export default BulkOptionsGrid;

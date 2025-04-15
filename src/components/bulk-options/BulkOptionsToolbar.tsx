import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ToggleOptionsSection from './ToggleOptionsSection';
import BulkOptionsGrid from './BulkOptionsGrid';
import BulkOptionsFooter from './BulkOptionsFooter';
import { useBulkOptions } from './hooks/useBulkOptions';

const BulkOptionsToolbar: React.FC = () => {
  const {
    bulkOptions,
    quickAddCount,
    selectedProductId,
    productInfo,
    handleGenderChange,
    handleSizeChange,
    handleNumberFillChange,
    handleNamePrefixTypeChange,
    handleNamePrefixChange,
    handleNumberPrefixChange,
    handleNameCaseChange,
    toggleOption,
    handleQuickAddSelection,
    handleProductSelection,
    handleApplyChanges
  } = useBulkOptions();
  
  const isMobile = useIsMobile();
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold text-gray-800">Bulk Options</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <BulkOptionsGrid 
            bulkOptions={bulkOptions}
            quickAddCount={quickAddCount}
            selectedProductId={selectedProductId}
            hasProducts={productInfo.products.length > 0}
            onGenderChange={handleGenderChange}
            onSizeChange={handleSizeChange}
            onNumberFillChange={handleNumberFillChange}
            onNamePrefixTypeChange={handleNamePrefixTypeChange}
            onNameCaseChange={handleNameCaseChange}
            onNamePrefixChange={handleNamePrefixChange}
            onNumberPrefixChange={handleNumberPrefixChange}
            onQuickAddSelection={handleQuickAddSelection}
            onProductSelection={handleProductSelection}
          />
          
          {/* Toggle options section for Name, Number, etc. */}
          <ToggleOptionsSection 
            bulkOptions={bulkOptions} 
            isMobile={isMobile} 
            onToggleOption={toggleOption} 
          />

          <BulkOptionsFooter onApply={handleApplyChanges} />
        </div>
      </CardContent>
    </Card>
  );
};

export default BulkOptionsToolbar;

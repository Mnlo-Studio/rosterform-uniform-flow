
import React from 'react';
import { useRoster } from '@/context/RosterContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const ProductBulkOptionsToolbar: React.FC = () => {
  const { productInfo, updateProductInfo } = useRoster();
  const { toast } = useToast();
  
  const handleProductTypeChange = (value: string) => {
    updateProductInfo({
      productType: value
    });
  };
  
  const handleApplyChanges = () => {
    toast({
      title: "Product type updated",
      description: `Product type set to: ${productInfo.productType || 'Standard'}`
    });
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold text-gray-800">Product Options</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          <div>
            <Label className="text-base mb-3 block">Product Type</Label>
            <RadioGroup 
              value={productInfo.productType || 'standard'} 
              onValueChange={handleProductTypeChange}
              className="grid grid-cols-1 md:grid-cols-3 gap-2"
            >
              <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50">
                <RadioGroupItem value="standard" id="standard" />
                <Label htmlFor="standard" className="cursor-pointer">Standard</Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50">
                <RadioGroupItem value="jerseys" id="jerseys" />
                <Label htmlFor="jerseys" className="cursor-pointer">Team Jerseys</Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50">
                <RadioGroupItem value="equipment" id="equipment" />
                <Label htmlFor="equipment" className="cursor-pointer">Team Equipment</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="flex justify-end mt-4">
            <Button onClick={handleApplyChanges} size="sm" className="bg-primary-700 hover:bg-primary-800">
              <Save size={16} className="mr-1" />
              Apply
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductBulkOptionsToolbar;

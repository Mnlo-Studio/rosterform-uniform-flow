
import React from 'react';
import { useRoster } from '@/context/RosterContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import ProductBlock from './products/ProductBlock';
import { toast } from 'sonner';

const ProductInfoForm: React.FC = () => {
  const { 
    productInfo, 
    addProduct, 
    updateProduct, 
    removeProduct, 
    moveProductUp, 
    moveProductDown 
  } = useRoster();

  const handleAddProduct = () => {
    addProduct();
    toast.success('New product added');
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold text-gray-800">Product Info</CardTitle>
      </CardHeader>
      <CardContent>
        {productInfo.products.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 mb-4">No products added yet</p>
            <Button 
              onClick={handleAddProduct}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" /> Add a Product
            </Button>
          </div>
        ) : (
          <>
            {productInfo.products.map((product, index) => (
              <ProductBlock 
                key={product.id}
                product={product}
                index={index}
                onUpdate={updateProduct}
                onRemove={removeProduct}
                onMoveUp={moveProductUp}
                onMoveDown={moveProductDown}
                isFirst={index === 0}
                isLast={index === productInfo.products.length - 1}
              />
            ))}
            
            <div className="flex justify-center mt-4">
              <Button 
                onClick={handleAddProduct}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" /> Add Another Product
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductInfoForm;

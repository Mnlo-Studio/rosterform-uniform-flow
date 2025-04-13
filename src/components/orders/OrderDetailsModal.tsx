
import React, { useState } from 'react';
import { X, Download, SendHorizontal, ArrowLeft, Edit2, Save } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { formatCurrency } from '@/utils/calculations';
import { Order } from '@/types/orders';

interface OrderDetailsModalProps {
  order: Order;
  isOpen: boolean;
  onClose: () => void;
  isEditMode: boolean;
  onToggleEditMode: () => void;
  onSendInvoice: () => void;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  order,
  isOpen,
  onClose,
  isEditMode,
  onToggleEditMode,
  onSendInvoice
}) => {
  const [editedOrder, setEditedOrder] = useState<Order>(order);

  const handleCustomerInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedOrder(prev => ({
      ...prev,
      customerInfo: {
        ...prev.customerInfo,
        [name]: value
      }
    }));
  };

  const handleProductInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedOrder(prev => ({
      ...prev,
      productInfo: {
        ...prev.productInfo,
        [name]: value
      }
    }));
  };

  const handleSaveChanges = () => {
    console.log("Saving changes:", editedOrder);
    // Implementation for saving changes would go here
    onToggleEditMode();
  };

  const handleDownloadOriginal = () => {
    console.log("Downloading original files");
    // Implementation for downloading original files would go here
  };

  const handleDownloadUpdated = () => {
    console.log("Downloading updated files");
    // Implementation for downloading updated files would go here
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl p-0 overflow-hidden">
        <DialogHeader className="p-6 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">Order Details: {order.orderId}</DialogTitle>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Label htmlFor="edit-mode" className="cursor-pointer">Edit Mode</Label>
                <Switch 
                  id="edit-mode" 
                  checked={isEditMode} 
                  onCheckedChange={onToggleEditMode}
                />
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Customer Info Card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="teamName">Team Name</Label>
                    <Input 
                      id="teamName"
                      name="teamName"
                      value={editedOrder.customerInfo.teamName}
                      onChange={handleCustomerInfoChange}
                      disabled={!isEditMode}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactName">Contact Name</Label>
                    <Input 
                      id="contactName"
                      name="contactName"
                      value={editedOrder.customerInfo.contactName}
                      onChange={handleCustomerInfoChange}
                      disabled={!isEditMode}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email"
                      name="email"
                      value={editedOrder.customerInfo.email}
                      onChange={handleCustomerInfoChange}
                      disabled={!isEditMode}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input 
                      id="phone"
                      name="phone"
                      value={editedOrder.customerInfo.phone}
                      onChange={handleCustomerInfoChange}
                      disabled={!isEditMode}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input 
                    id="address"
                    name="address"
                    value={editedOrder.customerInfo.address}
                    onChange={handleCustomerInfoChange}
                    disabled={!isEditMode}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input 
                      id="city"
                      name="city"
                      value={editedOrder.customerInfo.city}
                      onChange={handleCustomerInfoChange}
                      disabled={!isEditMode}
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input 
                      id="state"
                      name="state"
                      value={editedOrder.customerInfo.state}
                      onChange={handleCustomerInfoChange}
                      disabled={!isEditMode}
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">Zip Code</Label>
                    <Input 
                      id="zipCode"
                      name="zipCode"
                      value={editedOrder.customerInfo.zipCode}
                      onChange={handleCustomerInfoChange}
                      disabled={!isEditMode}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Product Info Card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Product Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="productName">Product Name</Label>
                    <Input 
                      id="productName"
                      name="name"
                      value={editedOrder.productInfo.name}
                      onChange={handleProductInfoChange}
                      disabled={!isEditMode}
                    />
                  </div>
                  <div>
                    <Label htmlFor="pricePerItem">Price Per Item</Label>
                    <Input 
                      id="pricePerItem"
                      name="pricePerItem"
                      value={editedOrder.productInfo.pricePerItem.toString()}
                      onChange={handleProductInfoChange}
                      disabled={!isEditMode}
                      type="number"
                      step="0.01"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Input 
                    id="notes"
                    name="notes"
                    value={editedOrder.productInfo.notes}
                    onChange={handleProductInfoChange}
                    disabled={!isEditMode}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Product Images */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Product Images</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {editedOrder.productInfo.images.length > 0 ? (
                    editedOrder.productInfo.images.map((image, index) => (
                      <div key={index} className="relative aspect-square overflow-hidden rounded-md bg-gray-100">
                        <img 
                          src={image} 
                          alt={`Product ${index + 1}`} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 h-32 flex items-center justify-center bg-gray-100 rounded-md">
                      <p className="text-gray-500 text-sm">No images available</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Roster Table */}
            <Card className="h-full flex flex-col">
              <CardHeader className="pb-3">
                <CardTitle>Roster Information</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <ScrollArea className="h-[500px] w-full">
                  <Table>
                    <TableHeader className="bg-gray-50">
                      <TableRow>
                        <TableHead className="w-[40px]">#</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Number</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead>Gender</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {editedOrder.players.map((player, index) => (
                        <TableRow key={player.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{player.name}</TableCell>
                          <TableCell>{player.number}</TableCell>
                          <TableCell>{player.size}</TableCell>
                          <TableCell>{player.gender}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>

        <DialogFooter className="p-6 border-t bg-gray-50 flex-wrap justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={onClose}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Orders
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-3 sm:mt-0">
            {isEditMode ? (
              <Button onClick={handleSaveChanges} className="bg-blue-600 hover:bg-blue-700">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            ) : (
              <>
                <Button variant="outline" onClick={handleDownloadOriginal}>
                  <Download className="h-4 w-4 mr-2" />
                  Download Original
                </Button>
                <Button variant="outline" onClick={handleDownloadUpdated}>
                  <Download className="h-4 w-4 mr-2" />
                  Download Updated
                </Button>
                <Button onClick={onSendInvoice} className="bg-blue-600 hover:bg-blue-700">
                  <SendHorizontal className="h-4 w-4 mr-2" />
                  Send Invoice
                </Button>
              </>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsModal;

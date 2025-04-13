
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, SendHorizontal, Edit2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { formatCurrency } from '@/utils/calculations';
import { mockOrders } from '@/data/mockOrders';
import { Order } from '@/types/orders';
import { useToast } from '@/hooks/use-toast';

const OrderDetails = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [editedOrder, setEditedOrder] = useState<Order | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Find the order from mockOrders based on orderId
    const foundOrder = mockOrders.find(o => o.orderId === orderId);
    if (foundOrder) {
      setOrder(foundOrder);
      setEditedOrder(foundOrder);
    }
  }, [orderId]);

  const handleCustomerInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedOrder(prev => {
      if (!prev) return null;
      return {
        ...prev,
        customerInfo: {
          ...prev.customerInfo,
          [name]: value
        }
      };
    });
  };

  const handleProductInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedOrder(prev => {
      if (!prev) return null;
      return {
        ...prev,
        productInfo: {
          ...prev.productInfo,
          [name]: value
        }
      };
    });
  };

  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleSaveChanges = () => {
    console.log("Saving changes:", editedOrder);
    // Implementation for saving changes would go here
    toast({
      title: "Changes saved",
      description: "Your changes have been successfully saved.",
    });
    setIsEditMode(false);
  };

  const handleDownloadOriginal = () => {
    console.log("Downloading original files");
    toast({
      title: "Download started",
      description: "Original files are being prepared for download.",
    });
    // Implementation for downloading original files would go here
  };

  const handleDownloadUpdated = () => {
    console.log("Downloading updated files");
    toast({
      title: "Download started",
      description: "Updated files are being prepared for download.",
    });
    // Implementation for downloading updated files would go here
  };

  const handleSendInvoice = () => {
    console.log("Sending invoice for order:", orderId);
    toast({
      title: "Invoice sent",
      description: "The invoice has been sent to the customer.",
    });
    // Implementation for sending invoice would go here
  };

  if (!order || !editedOrder) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Order not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Link to="/orders">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Orders
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Order Details: {orderId}</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="edit-mode" className="cursor-pointer">Edit Mode</Label>
              <Switch 
                id="edit-mode" 
                checked={isEditMode} 
                onCheckedChange={handleToggleEditMode}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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

        <div className="flex flex-wrap justify-between items-center mt-8 bg-gray-50 p-6 rounded-lg border border-gray-100">
          <div className="flex items-center space-x-2">
            <Link to="/orders">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Orders
              </Button>
            </Link>
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
                <Button onClick={handleSendInvoice} className="bg-blue-600 hover:bg-blue-700">
                  <SendHorizontal className="h-4 w-4 mr-2" />
                  Send Invoice
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;

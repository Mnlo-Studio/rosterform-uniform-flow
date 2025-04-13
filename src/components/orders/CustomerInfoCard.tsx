
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CustomerInfo } from '@/types';

interface CustomerInfoCardProps {
  customerInfo: CustomerInfo;
  isEditMode: boolean;
  onCustomerInfoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomerInfoCard: React.FC<CustomerInfoCardProps> = ({
  customerInfo,
  isEditMode,
  onCustomerInfoChange
}) => {
  return (
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
              value={customerInfo.teamName}
              onChange={onCustomerInfoChange}
              disabled={!isEditMode}
            />
          </div>
          <div>
            <Label htmlFor="contactName">Contact Name</Label>
            <Input 
              id="contactName"
              name="contactName"
              value={customerInfo.contactName}
              onChange={onCustomerInfoChange}
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
              value={customerInfo.email}
              onChange={onCustomerInfoChange}
              disabled={!isEditMode}
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input 
              id="phone"
              name="phone"
              value={customerInfo.phone}
              onChange={onCustomerInfoChange}
              disabled={!isEditMode}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="address">Address</Label>
          <Input 
            id="address"
            name="address"
            value={customerInfo.address}
            onChange={onCustomerInfoChange}
            disabled={!isEditMode}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="city">City</Label>
            <Input 
              id="city"
              name="city"
              value={customerInfo.city}
              onChange={onCustomerInfoChange}
              disabled={!isEditMode}
            />
          </div>
          <div>
            <Label htmlFor="state">State</Label>
            <Input 
              id="state"
              name="state"
              value={customerInfo.state}
              onChange={onCustomerInfoChange}
              disabled={!isEditMode}
            />
          </div>
          <div>
            <Label htmlFor="zipCode">Zip Code</Label>
            <Input 
              id="zipCode"
              name="zipCode"
              value={customerInfo.zipCode}
              onChange={onCustomerInfoChange}
              disabled={!isEditMode}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerInfoCard;

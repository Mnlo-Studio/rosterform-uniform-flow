
import React, { useEffect } from 'react';
import { useRoster } from '@/context/RosterContext';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useParams } from 'react-router-dom';

interface CustomerInfoFormProps {
  isPublic?: boolean;
  prefillData?: {
    teamName?: string;
    contactName?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    formId?: string;
  };
}

const CustomerInfoForm: React.FC<CustomerInfoFormProps> = ({ 
  isPublic = false,
  prefillData = {} 
}) => {
  const { customerInfo, updateCustomerInfo } = useRoster();
  const { user } = useAuth();
  const { formId } = useParams<{ formId?: string }>();
  
  useEffect(() => {
    // Initialize form with prefill data if available
    if (Object.keys(prefillData).length > 0) {
      const updates: Partial<typeof customerInfo> = {};
      
      if (prefillData.teamName) updates.teamName = prefillData.teamName;
      if (prefillData.contactName) updates.contactName = prefillData.contactName;
      if (prefillData.email) updates.email = prefillData.email;
      if (prefillData.phone) updates.phone = prefillData.phone;
      if (prefillData.address) updates.address = prefillData.address;
      if (prefillData.city) updates.city = prefillData.city;
      if (prefillData.state) updates.state = prefillData.state;
      if (prefillData.zipCode) updates.zipCode = prefillData.zipCode;
      
      if (Object.keys(updates).length > 0) {
        updateCustomerInfo(updates);
      }
    }
    // Legacy params support
    else if (formId) {
      if (!customerInfo.teamName || customerInfo.teamName === '') {
        updateCustomerInfo({ teamName: formId });
      }
    }
    // Default behavior for logged in users
    else if (!isPublic && user && (!customerInfo.teamName || customerInfo.teamName === '')) {
      updateCustomerInfo({ teamName: 'roster-form' });
    }
  }, [prefillData, formId, isPublic, user, updateCustomerInfo]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateCustomerInfo({ [name]: value });
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold text-gray-800">Customer Info</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="teamName">Team Name*</Label>
            <Input
              id="teamName"
              name="teamName"
              value={customerInfo.teamName || ''}
              onChange={handleInputChange}
              placeholder="Enter team name"
              required
              className="w-full"
              disabled={isPublic && !!prefillData?.teamName}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contactName">Contact Name*</Label>
            <Input
              id="contactName"
              name="contactName"
              value={customerInfo.contactName || ''}
              onChange={handleInputChange}
              placeholder="John Smith"
              required
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email*</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={customerInfo.email || ''}
              onChange={handleInputChange}
              placeholder="example@team.com"
              required
              className="w-full"
              disabled={isPublic && !!prefillData?.email}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone*</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={customerInfo.phone || ''}
              onChange={handleInputChange}
              placeholder="(555) 123-4567"
              required
              className="w-full"
            />
          </div>
        </div>
        
        <div className="mt-6">
          <Label htmlFor="address">Shipping Address*</Label>
          <Input
            id="address"
            name="address"
            value={customerInfo.address || ''}
            onChange={handleInputChange}
            placeholder="123 Main St."
            required
            className="w-full mt-1"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="city">City*</Label>
            <Input
              id="city"
              name="city"
              value={customerInfo.city || ''}
              onChange={handleInputChange}
              placeholder="City"
              required
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="state">State*</Label>
            <Input
              id="state"
              name="state"
              value={customerInfo.state || ''}
              onChange={handleInputChange}
              placeholder="State"
              required
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="zipCode">Zip Code*</Label>
            <Input
              id="zipCode"
              name="zipCode"
              value={customerInfo.zipCode || ''}
              onChange={handleInputChange}
              placeholder="12345"
              required
              className="w-full"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerInfoForm;

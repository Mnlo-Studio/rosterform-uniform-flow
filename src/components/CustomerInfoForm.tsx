
import React, { useEffect } from 'react';
import { useRoster } from '@/context/RosterContext';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useParams } from 'react-router-dom';

interface CustomerInfoFormProps {
  isPublic?: boolean;
}

const CustomerInfoForm: React.FC<CustomerInfoFormProps> = ({ isPublic = false }) => {
  const { customerInfo, updateCustomerInfo } = useRoster();
  const { user } = useAuth();
  const { formId } = useParams<{ formId?: string }>();

  useEffect(() => {
    if (isPublic && formId && (!customerInfo.teamName || customerInfo.teamName.trim() === '')) {
      // For public forms, use the formId from the URL
      updateCustomerInfo({ teamName: formId });
    } else if (user && (!customerInfo.teamName || customerInfo.teamName.trim() === '')) {
      // For authenticated users, use their userId
      const defaultTeamName = `roster-form-${user.id}`;
      updateCustomerInfo({ teamName: defaultTeamName });
    }
  }, [user, formId, customerInfo.teamName, updateCustomerInfo, isPublic]);

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
              value={customerInfo.teamName}
              onChange={handleInputChange}
              placeholder="Enter team name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contactName">Contact Name*</Label>
            <Input
              id="contactName"
              name="contactName"
              value={customerInfo.contactName}
              onChange={handleInputChange}
              placeholder="John Smith"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email*</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={customerInfo.email}
              onChange={handleInputChange}
              placeholder="coach@team.com"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone*</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={customerInfo.phone}
              onChange={handleInputChange}
              placeholder="(555) 123-4567"
              required
            />
          </div>
        </div>
        
        <h3 className="text-md font-medium mt-6 mb-3 text-gray-700">Shipping Address</h3>
        
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="address">Street Address*</Label>
            <Input
              id="address"
              name="address"
              value={customerInfo.address}
              onChange={handleInputChange}
              placeholder="123 Main St."
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City*</Label>
              <Input
                id="city"
                name="city"
                value={customerInfo.city}
                onChange={handleInputChange}
                placeholder="Springfield"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="state">State*</Label>
              <Input
                id="state"
                name="state"
                value={customerInfo.state}
                onChange={handleInputChange}
                placeholder="IL"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="zipCode">Zip Code*</Label>
              <Input
                id="zipCode"
                name="zipCode"
                value={customerInfo.zipCode}
                onChange={handleInputChange}
                placeholder="62704"
                required
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerInfoForm;

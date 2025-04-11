
import Papa from 'papaparse';
import { Player, CustomerInfo, ProductInfo } from '@/types';
import { formatCurrency } from '../calculations';

// Generate CSV for customer info
export const generateCustomerInfoCSV = (customerInfo: CustomerInfo): string => {
  const data = [
    ['Team Name', customerInfo.teamName],
    ['Contact Name', customerInfo.contactName],
    ['Email', customerInfo.email],
    ['Phone', customerInfo.phone],
    ['Address', customerInfo.address],
    ['City', customerInfo.city],
    ['State', customerInfo.state],
    ['Zip Code', customerInfo.zipCode]
  ];
  
  return Papa.unparse(data);
};

// Generate CSV for roster
export const generateRosterCSV = (players: Player[]): string => {
  const headers = ['#', 'Name', 'Number', 'Size', 'Gender', 'Shorts Size', 'Sock Size', 'Initials'];
  
  const data = players.map((player, index) => [
    index + 1,
    player.name,
    player.number,
    player.size,
    player.gender,
    player.shortsSize || '',
    player.sockSize || '',
    player.initials || ''
  ]);
  
  return Papa.unparse([headers, ...data]);
};

// Generate CSV for order summary
export const generateOrderSummaryCSV = (
  players: Player[], 
  productInfo: ProductInfo
): string => {
  const totalCost = players.length * productInfo.pricePerItem;
  
  // Group by size
  const sizeCount: Record<string, number> = {};
  players.forEach(player => {
    const size = player.size;
    if (size) {
      sizeCount[size] = (sizeCount[size] || 0) + 1;
    }
  });
  
  // Group by gender
  const genderCount: Record<string, number> = {};
  players.forEach(player => {
    const gender = player.gender;
    if (gender) {
      genderCount[gender] = (genderCount[gender] || 0) + 1;
    }
  });
  
  const data = [
    ['Total Players', players.length.toString()],
    ['Price Per Item', formatCurrency(productInfo.pricePerItem)],
    ['Total Cost', formatCurrency(totalCost)],
    ['', ''],
    ['Size Breakdown', '']
  ];
  
  Object.entries(sizeCount).forEach(([size, count]) => {
    data.push([size, count.toString()]);
  });
  
  data.push(['', '']);
  data.push(['Gender Breakdown', '']);
  
  Object.entries(genderCount).forEach(([gender, count]) => {
    data.push([gender, count.toString()]);
  });
  
  return Papa.unparse(data);
};

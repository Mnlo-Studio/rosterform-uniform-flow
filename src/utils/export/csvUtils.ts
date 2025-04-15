
import Papa from 'papaparse';
import { Player, CustomerInfo, ProductInfo, Product } from '@/types';
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
  const headers = ['#', 'Name', 'Number', 'Size', 'Gender', 'Shorts Size', 'Sock Size', 'Initials', 'Product'];
  
  const data = players.map((player, index) => [
    index + 1,
    player.name,
    player.number,
    player.size,
    player.gender,
    player.shortsSize || '',
    player.sockSize || '',
    player.initials || '',
    player.productId || ''
  ]);
  
  return Papa.unparse([headers, ...data]);
};

// Generate CSV for order summary
export const generateOrderSummaryCSV = (
  players: Player[], 
  productInfo: ProductInfo
): string => {
  // Calculate total cost based on products assigned to players
  let totalCost = 0;
  const productPrices = new Map<string, number>();
  
  // Create a map of product IDs to prices
  productInfo.products.forEach(product => {
    productPrices.set(product.id, product.pricePerItem);
  });
  
  // Calculate cost for each player based on assigned product
  players.forEach(player => {
    if (player.productId && productPrices.has(player.productId)) {
      totalCost += productPrices.get(player.productId) || 0;
    }
  });
  
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
  
  // Initialize data
  const data = [
    ['Total Players', players.length.toString()],
    ['Products', productInfo.products.length.toString()],
    ['Total Cost', formatCurrency(totalCost)],
    ['', ''],
    ['Products', '']
  ];
  
  // Add product details
  productInfo.products.forEach(product => {
    data.push([product.name, formatCurrency(product.pricePerItem)]);
  });
  
  data.push(['', '']);
  data.push(['Size Breakdown', '']);
  
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

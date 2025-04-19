
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Order } from "@/types/orders";
import { Ruler, Users } from "lucide-react";
import { calculateSizeBreakdown, calculateGenderBreakdown } from "@/utils/calculations";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SummaryStatisticsProps {
  orders: Order[];
}

const SummaryStatistics: React.FC<SummaryStatisticsProps> = ({ orders = [] }) => {
  // Extract all players from all orders
  const allPlayers = orders.flatMap(order => order.players);
  
  // Calculate size and gender breakdowns
  const sizeBreakdown = calculateSizeBreakdown(allPlayers);
  const genderBreakdown = calculateGenderBreakdown(allPlayers);
  
  // Sort sizes in a logical order
  const sizeOrder = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
  const sortedSizes = Object.entries(sizeBreakdown).sort((a, b) => {
    const indexA = sizeOrder.indexOf(a[0]);
    const indexB = sizeOrder.indexOf(b[0]);
    if (indexA === -1 && indexB === -1) return a[0].localeCompare(b[0]);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });
  
  // Get entries for gender breakdown
  const genderEntries = Object.entries(genderBreakdown);
  
  // Calculate total counts for percentages
  const totalSizes = Object.values(sizeBreakdown).reduce((sum, count) => sum + count, 0);
  const totalGenders = Object.values(genderBreakdown).reduce((sum, count) => sum + count, 0);

  // Define color scheme for bars
  const sizeColors = ["bg-blue-500", "bg-indigo-500", "bg-purple-500", "bg-pink-500", "bg-red-500", "bg-orange-500", "bg-yellow-500"];
  const genderColors = ["bg-teal-500", "bg-cyan-500", "bg-sky-500", "bg-blue-500"];

  // If there are no orders or players, show empty state
  if (allPlayers.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Sizes Distribution</CardTitle>
            <Ruler className="h-5 w-5 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-[250px] text-center text-gray-500">
              <p>No player data available</p>
              <p className="text-sm mt-2">Statistics will appear when you create orders with players</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Gender Distribution</CardTitle>
            <Users className="h-5 w-5 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-[250px] text-center text-gray-500">
              <p>No player data available</p>
              <p className="text-sm mt-2">Statistics will appear when you create orders with players</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <Card className="shadow-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">Sizes Distribution</CardTitle>
          <Ruler className="h-5 w-5 text-gray-500" />
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[250px] pr-4">
            <div className="space-y-3">
              {sortedSizes.map(([size, count], index) => (
                <div key={size} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{size}</span>
                    <span>{count} ({totalSizes ? Math.round((count / totalSizes) * 100) : 0}%)</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${sizeColors[index % sizeColors.length]} rounded-full`} 
                      style={{ width: `${totalSizes ? (count / totalSizes) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
      
      <Card className="shadow-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">Gender Distribution</CardTitle>
          <Users className="h-5 w-5 text-gray-500" />
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[250px] pr-4">
            <div className="space-y-3">
              {genderEntries.map(([gender, count], index) => (
                <div key={gender} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{gender}</span>
                    <span>{count} ({totalGenders ? Math.round((count / totalGenders) * 100) : 0}%)</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${genderColors[index % genderColors.length]} rounded-full`} 
                      style={{ width: `${totalGenders ? (count / totalGenders) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryStatistics;

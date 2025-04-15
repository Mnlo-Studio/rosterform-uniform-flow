
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Player } from '@/types';

interface RosterTableCardProps {
  players: Player[];
}

const RosterTableCard: React.FC<RosterTableCardProps> = ({ players }) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Roster Information</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] w-full">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableCell className="w-[40px]">#</TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Number</TableCell>
                <TableCell>Size</TableCell>
                <TableCell>Gender</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {players.map((player, index) => (
                <TableRow key={player.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{player.productId || 'No Product'}</TableCell>
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
  );
};

export default RosterTableCard;

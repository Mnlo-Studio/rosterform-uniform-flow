
import React from 'react';
import {
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface RosterTableHeaderProps {
  showShortsSize: boolean;
  showSockSize: boolean;
  showInitials: boolean;
}

const RosterTableHeader: React.FC<RosterTableHeaderProps> = ({
  showShortsSize,
  showSockSize,
  showInitials
}) => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[40px]">#</TableHead>
        <TableHead>Name*</TableHead>
        <TableHead className="w-[80px]">Number*</TableHead>
        <TableHead className="w-[100px]">Size*</TableHead>
        <TableHead className="w-[100px]">Gender*</TableHead>
        
        {showShortsSize && (
          <TableHead className="w-[100px]">Shorts</TableHead>
        )}
        
        {showSockSize && (
          <TableHead className="w-[100px]">Socks</TableHead>
        )}
        
        {showInitials && (
          <TableHead className="w-[100px]">Initials</TableHead>
        )}
        
        <TableHead className="w-[60px]">Action</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default RosterTableHeader;

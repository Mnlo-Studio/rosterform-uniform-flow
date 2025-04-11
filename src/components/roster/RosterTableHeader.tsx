
import React from 'react';
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface RosterTableHeaderProps {
  showName: boolean;
  showNumber: boolean;
  showShortsSize: boolean;
  showSockSize: boolean;
  showInitials: boolean;
}

const RosterTableHeader: React.FC<RosterTableHeaderProps> = ({
  showName,
  showNumber,
  showShortsSize,
  showSockSize,
  showInitials
}) => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[50px]">#</TableHead>
        {showName && <TableHead>Name</TableHead>}
        {showNumber && <TableHead>Number</TableHead>}
        <TableHead>Size</TableHead>
        <TableHead>Gender</TableHead>
        {showShortsSize && <TableHead>Shorts Size</TableHead>}
        {showSockSize && <TableHead>Sock Size</TableHead>}
        {showInitials && <TableHead>Initials</TableHead>}
        <TableHead className="w-[50px]">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default RosterTableHeader;

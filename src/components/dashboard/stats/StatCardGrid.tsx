
import React from "react";

interface StatCardGridProps {
  children: React.ReactNode;
}

const StatCardGrid: React.FC<StatCardGridProps> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {children}
    </div>
  );
};

export default StatCardGrid;

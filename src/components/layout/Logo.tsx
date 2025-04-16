
import React from "react";
import { FileText } from "lucide-react";

interface LogoProps {
  size?: number;
  textClassName?: string;
  iconClassName?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 24, 
  textClassName = "text-lg font-semibold", 
  iconClassName = "text-primary" 
}) => {
  return (
    <div className="flex items-center space-x-2">
      <FileText size={size} className={iconClassName} />
      <span className={textClassName}>Roster Form</span>
    </div>
  );
};

export default Logo;

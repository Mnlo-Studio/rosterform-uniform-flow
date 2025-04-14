
import React from "react";

const BackgroundDecoration: React.FC = () => {
  return (
    <div className="hidden md:flex md:w-1/2 lg:w-2/3 relative bg-gradient-to-br from-blue-300 via-blue-400 to-purple-300">
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-300 rounded-full opacity-80 blur-sm animate-float"></div>
      <div className="absolute top-1/3 left-1/3 w-16 h-16 bg-blue-200 rounded-full opacity-90 blur-sm animate-float-slow"></div>
      <div className="absolute top-1/2 left-1/5 w-24 h-24 bg-blue-400 rounded-full opacity-70 blur-sm animate-float-medium"></div>
      <div className="absolute bottom-1/4 left-1/4 w-40 h-8 bg-cyan-300 rounded-full opacity-50 blur-sm"></div>
    </div>
  );
};

export default BackgroundDecoration;

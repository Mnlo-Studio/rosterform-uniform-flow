
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center max-w-md px-4">
        <h1 className="text-6xl font-bold text-gray-900 mb-6">404</h1>
        <p className="text-2xl text-gray-600 mb-8">Oops! Page not found</p>
        <Link 
          to="/" 
          className="text-blue-500 hover:text-blue-700 text-lg font-medium transition-colors"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

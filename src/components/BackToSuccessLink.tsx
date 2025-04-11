
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const BackToSuccessLink: React.FC = () => {
  return (
    <Link 
      to="/success" 
      className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
    >
      <ArrowLeft className="mr-1 h-4 w-4" />
      Back to success page
    </Link>
  );
};

export default BackToSuccessLink;

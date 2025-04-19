
import React from 'react';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

interface LogoutButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  className?: string;
  iconClassName?: string;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({
  variant = 'ghost',
  className = '',
  iconClassName = '',
}) => {
  const { signOut, isLoading } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <Button 
      variant={variant} 
      onClick={handleLogout} 
      disabled={isLoading} 
      className={`flex items-center w-full ${className}`}
    >
      <LogOut className={`h-4 w-4 ${iconClassName}`} />
      <span>Sign Out</span>
    </Button>
  );
};

export default LogoutButton;

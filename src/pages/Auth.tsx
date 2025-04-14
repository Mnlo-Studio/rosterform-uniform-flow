
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import BackgroundDecoration from "@/components/auth/BackgroundDecoration";

const Auth: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  const switchToLogin = () => {
    setActiveTab("login");
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Left side with background and decorative elements */}
      <BackgroundDecoration />

      {/* Right side with the login form */}
      <div className="w-full md:w-1/2 lg:w-1/3 bg-gradient-to-br from-blue-300 via-blue-400 to-purple-300 md:bg-white flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-sm md:bg-white p-8 rounded-3xl shadow-lg">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">RM Arts</h1>
            <p className="text-gray-600">Sign in to RM arts</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger id="login-tab" value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            {/* Login Form */}
            <TabsContent value="login">
              <LoginForm 
                isLoading={isLoading} 
                setIsLoading={setIsLoading} 
              />
            </TabsContent>
            
            {/* Register Form */}
            <TabsContent value="register">
              <RegisterForm 
                isLoading={isLoading} 
                setIsLoading={setIsLoading}
                switchToLogin={switchToLogin}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Auth;

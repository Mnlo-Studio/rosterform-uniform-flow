
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";

const Auth: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  const switchToLogin = () => {
    setActiveTab("login");
  };

  return (
    <div className="flex min-h-screen w-full bg-white">
      <div className="w-full max-w-md mx-auto flex flex-col justify-center p-6">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-primary-700 mb-2">Login</h1>
          <p className="text-gray-600">Hey enter your details to sign in to your account</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="hidden">
            <TabsTrigger id="login-tab" value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          {/* Login Form */}
          <TabsContent value="login">
            <LoginForm 
              isLoading={isLoading} 
              setIsLoading={setIsLoading} 
            />
            <div className="text-center mt-6">
              Don't have an account? <button 
                onClick={() => setActiveTab("register")}
                className="text-primary-700 font-medium hover:underline"
              >
                Signup Now
              </button>
            </div>
          </TabsContent>
          
          {/* Register Form */}
          <TabsContent value="register">
            <RegisterForm 
              isLoading={isLoading} 
              setIsLoading={setIsLoading}
              switchToLogin={switchToLogin}
            />
            <div className="text-center mt-6">
              Already have an account? <button
                onClick={() => setActiveTab("login")} 
                className="text-primary-700 font-medium hover:underline"
              >
                Login
              </button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;

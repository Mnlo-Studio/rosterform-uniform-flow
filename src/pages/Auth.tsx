
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";

const Auth: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard if user is already logged in
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const switchToLogin = () => {
    setActiveTab("login");
  };

  return (
    <div className="flex min-h-screen w-full bg-white">
      <div className="w-full max-w-md mx-auto flex flex-col justify-center p-6">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-primary-700 mb-2">
            {activeTab === "login" ? "Login" : "Create Account"}
          </h1>
          <p className="text-gray-600">
            {activeTab === "login" 
              ? "Hey enter your details to sign in to your account" 
              : "Fill in your details to create a new account"}
          </p>
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
            
            <div className="flex items-center my-6">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="px-4 text-sm text-gray-500">or</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>
            
            <GoogleSignInButton isLoading={isLoading} />
            
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
            
            <div className="flex items-center my-6">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="px-4 text-sm text-gray-500">or</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>
            
            <GoogleSignInButton isLoading={isLoading} />
            
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

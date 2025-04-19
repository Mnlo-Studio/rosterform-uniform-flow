
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RosterProvider } from "@/context/RosterContext";
import { LayoutProvider } from "@/context/LayoutContext";
import { AuthProvider } from "@/context/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Success from "./pages/Success";
import NotFound from "./pages/NotFound";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import ShareEmbed from "./pages/ShareEmbed";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Auth from "./pages/Auth";
import PublicOrderForm from "./pages/PublicOrderForm";
import StandaloneOrderForm from "./pages/StandaloneOrderForm";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LayoutProvider>
          <Routes>
            {/* Completely public routes - no auth needed */}
            <Route path="/form" element={
              <RosterProvider>
                <StandaloneOrderForm />
              </RosterProvider>
            } />
            
            <Route path="/order/:formId" element={
              <RosterProvider>
                <PublicOrderForm />
              </RosterProvider>
            } />
            
            <Route path="/auth" element={<Auth />} />
            
            {/* Protected routes */}
            <Route path="/*" element={
              <AuthProvider>
                <Routes>
                  <Route path="/" element={
                    <ProtectedRoute>
                      <Navigate to="/dashboard" replace />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <MainLayout>
                        <Dashboard />
                      </MainLayout>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/order-form" element={
                    <ProtectedRoute>
                      <MainLayout>
                        <RosterProvider>
                          <Index />
                        </RosterProvider>
                      </MainLayout>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/success" element={
                    <ProtectedRoute>
                      <MainLayout>
                        <RosterProvider>
                          <Success />
                        </RosterProvider>
                      </MainLayout>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/orders" element={
                    <ProtectedRoute>
                      <MainLayout>
                        <Orders />
                      </MainLayout>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/orders/:orderId" element={
                    <ProtectedRoute>
                      <MainLayout>
                        <RosterProvider>
                          <OrderDetails />
                        </RosterProvider>
                      </MainLayout>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/share" element={
                    <ProtectedRoute>
                      <MainLayout>
                        <RosterProvider>
                          <ShareEmbed />
                        </RosterProvider>
                      </MainLayout>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/account" element={
                    <ProtectedRoute>
                      <MainLayout>
                        <Account />
                      </MainLayout>
                    </ProtectedRoute>
                  } />
                  
                  {/* Catch-all route */}
                  <Route path="*" element={
                    <ProtectedRoute>
                      <MainLayout>
                        <NotFound />
                      </MainLayout>
                    </ProtectedRoute>
                  } />
                </Routes>
              </AuthProvider>
            } />
          </Routes>
        </LayoutProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

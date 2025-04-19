
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RosterProvider } from "@/context/RosterProvider";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LayoutProvider>
          <AuthProvider>
            <RosterProvider>
              <Routes>
                {/* Make Auth the default route */}
                <Route path="/" element={<Navigate to="/auth" replace />} />
                
                {/* Auth route */}
                <Route path="/auth" element={<Auth />} />
                
                {/* Public routes that don't require authentication */}
                <Route path="/order/:formId" element={<PublicOrderForm />} />
                
                {/* All other routes protected and using MainLayout */}
                <Route path="*" element={
                  <ProtectedRoute>
                    <MainLayout>
                      <Routes>
                        <Route path="/order-form" element={<Index />} /> {/* Changed from /roster */}
                        <Route path="/success" element={<Success />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/orders/:orderId" element={<OrderDetails />} />
                        <Route path="/share" element={<ShareEmbed />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/account" element={<Account />} />
                        {/* Catch-all route */}
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </MainLayout>
                  </ProtectedRoute>
                } />
              </Routes>
            </RosterProvider>
          </AuthProvider>
        </LayoutProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

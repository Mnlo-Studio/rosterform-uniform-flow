
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
          <Routes>
            {/* PRIORITY ORDER - Completely public routes first */}
            <Route 
              path="/order/:formId" 
              element={
                <RosterProvider>
                  <PublicOrderForm />
                </RosterProvider>
              } 
            />

            {/* Public auth route */}
            <Route path="/auth" element={<Auth />} />

            {/* Authenticated routes go last */}
            <Route 
              element={
                <AuthProvider>
                  <Routes>
                    {/* Redirect root to dashboard if authenticated, otherwise to auth */}
                    <Route path="/" element={
                      <ProtectedRoute>
                        <Navigate to="/dashboard" replace />
                      </ProtectedRoute>
                    } />
                    
                    {/* All protected routes using MainLayout */}
                    <Route element={
                      <ProtectedRoute>
                        <MainLayout>
                          <RosterProvider>
                            <Routes>
                              <Route path="/order-form" element={<Index />} />
                              <Route path="/success" element={<Success />} />
                              <Route path="/orders" element={<Orders />} />
                              <Route path="/orders/:orderId" element={<OrderDetails />} />
                              <Route path="/share" element={<ShareEmbed />} />
                              <Route path="/dashboard" element={<Dashboard />} />
                              <Route path="/account" element={<Account />} />
                              <Route path="*" element={<NotFound />} />
                            </Routes>
                          </RosterProvider>
                        </MainLayout>
                      </ProtectedRoute>
                    }>
                    </Route>
                  </Routes>
                </AuthProvider>
              }
              path="*"
            />
          </Routes>
        </LayoutProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;


import React from "react";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RosterProvider } from "@/context/RosterContext";
import { AuthProvider } from "@/context/AuthContext";
import { LayoutProvider } from "@/context/LayoutContext";
import MainLayout from "@/components/layout/MainLayout";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import NotFound from "./pages/NotFound";
import ShareEmbed from "./pages/ShareEmbed";
import Account from "./pages/Account";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Import Order Form Pages
import OrderForm from "./pages/Index";
import PublicOrderForm from "./pages/PublicOrderForm";
import Success from "./pages/Success";

// Import Public Form Page
import PublicFormPage from "./pages/PublicFormPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <AuthProvider>
          <LayoutProvider>
            <Routes>
              {/* Public Form Routes */}
              <Route path="/form/:slug" element={
                <RosterProvider>
                  <PublicFormPage />
                </RosterProvider>
              } />
              
              {/* Legacy public form route */}
              <Route path="/form" element={
                <RosterProvider>
                  <PublicOrderForm />
                </RosterProvider>
              } />
              
              {/* Auth Routes */}
              <Route path="/auth" element={<Auth />} />
              
              {/* Protected Routes */}
              <Route path="/" element={
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
                      <OrderForm />
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

              {/* 404 Not Found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </LayoutProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

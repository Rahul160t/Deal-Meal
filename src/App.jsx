import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';

// Common Components
import { DemoModeBanner } from './components/common/DemoModeBanner';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { ProtectedRoute } from './components/common/ProtectedRoute';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ExplorePage } from './pages/ExplorePage';
import { FoodDetailsPage } from './pages/FoodDetailsPage';

// Role Dashboards
import { ConsumerDashboard } from './pages/consumer/ConsumerDashboard';
import { ConsumerBookings } from './pages/consumer/ConsumerBookings';
import { BusinessDashboard } from './pages/business/BusinessDashboard';
import { BusinessListings } from './pages/business/BusinessListings';
import { CharityDashboard } from './pages/charity/CharityDashboard';
import { CharityAvailableFood } from './pages/charity/CharityAvailableFood';
import { CharityClaims } from './pages/charity/CharityClaims';

// Helper to scroll to top on route navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Global Toast Banner
const GlobalToast = () => {
  const { toast } = useApp();
  if (!toast) return null;

  const bgStyles =
    toast.type === 'error'
      ? 'bg-rose-600 text-white'
      : toast.type === 'info'
      ? 'bg-slate-900 text-white'
      : 'bg-emerald-600 text-white';

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-in slide-in-from-bottom-5 duration-200">
      <div
        className={`${bgStyles} px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-semibold max-w-sm`}
      >
        <span>{toast.message}</span>
      </div>
    </div>
  );
};

// Public Page Layout
const PublicLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-warmbg">
      <DemoModeBanner />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <GlobalToast />
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <PublicLayout>
                <LandingPage />
              </PublicLayout>
            }
          />
          <Route
            path="/login"
            element={
              <PublicLayout>
                <LoginPage />
              </PublicLayout>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicLayout>
                <SignupPage />
              </PublicLayout>
            }
          />
          <Route
            path="/explore"
            element={
              <PublicLayout>
                <ExplorePage />
              </PublicLayout>
            }
          />
          <Route
            path="/food/:id"
            element={
              <PublicLayout>
                <FoodDetailsPage />
              </PublicLayout>
            }
          />

          {/* Consumer Dashboard Routes (Protected for Consumers) */}
          <Route
            path="/consumer/dashboard"
            element={
              <ProtectedRoute allowedRole="consumer">
                <DashboardLayout>
                  <ConsumerDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/consumer/bookings"
            element={
              <ProtectedRoute allowedRole="consumer">
                <DashboardLayout>
                  <ConsumerBookings />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Business Dashboard Routes (Protected for Businesses) */}
          <Route
            path="/business/dashboard"
            element={
              <ProtectedRoute allowedRole="business">
                <DashboardLayout>
                  <BusinessDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/business/listings"
            element={
              <ProtectedRoute allowedRole="business">
                <DashboardLayout>
                  <BusinessListings />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Charity Dashboard Routes (Protected for Charities) */}
          <Route
            path="/charity/dashboard"
            element={
              <ProtectedRoute allowedRole="charity">
                <DashboardLayout>
                  <CharityDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/charity/available-food"
            element={
              <ProtectedRoute allowedRole="charity">
                <DashboardLayout>
                  <CharityAvailableFood />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/charity/claims"
            element={
              <ProtectedRoute allowedRole="charity">
                <DashboardLayout>
                  <CharityClaims />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;

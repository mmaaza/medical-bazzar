import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import DashboardLayout from './components/layout/DashboardLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import EmailVerificationPage from './pages/EmailVerificationPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import NotFoundPage from './pages/NotFoundPage';
import ServerErrorPage from './pages/ServerErrorPage';
import WishlistPage from './pages/WishlistPage';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/auth/PrivateRoute';

// For demo purposes - these would be actual page components in a full implementation
const CategoryPage = () => <div className="container mx-auto px-4 py-10"><h1 className="text-3xl font-bold">Category Page</h1></div>;
const ProductPage = () => <div className="container mx-auto px-4 py-10"><h1 className="text-3xl font-bold">Product Page</h1></div>;
const CartPage = () => <div className="container mx-auto px-4 py-10"><h1 className="text-3xl font-bold">Cart Page</h1></div>;
const CheckoutPage = () => <div className="container mx-auto px-4 py-10"><h1 className="text-3xl font-bold">Checkout Page</h1></div>;

// Dashboard Pages
const DashboardPage = () => <div><h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1></div>;
const DashboardOrdersPage = () => <div><h1 className="text-2xl font-bold mb-6">My Orders</h1></div>;
const DashboardWishlistPage = () => <div><h1 className="text-2xl font-bold mb-6">My Wishlist</h1></div>;
const DashboardProfilePage = () => <div><h1 className="text-2xl font-bold mb-6">My Profile</h1></div>;
const DashboardSettingsPage = () => <div><h1 className="text-2xl font-bold mb-6">Account Settings</h1></div>;

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/verify-email" element={<EmailVerificationPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} />
            <Route path="/product/:productId" element={<ProductPage />} />
            
            {/* Protected Routes */}
            <Route 
              path="/cart" 
              element={
                <PrivateRoute requireVerification={true}>
                  <CartPage />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/checkout" 
              element={
                <PrivateRoute requireVerification={true}>
                  <CheckoutPage />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/wishlist" 
              element={
                <PrivateRoute requireVerification={true}>
                  <WishlistPage />
                </PrivateRoute>
              } 
            />

            {/* Dashboard Routes */}
            <Route
              path="/account"
              element={
                <PrivateRoute requireVerification={true}>
                  <DashboardLayout />
                </PrivateRoute>
              }
            >
              <Route index element={<DashboardPage />} />
              <Route path="orders" element={<DashboardOrdersPage />} />
              <Route path="wishlist" element={<WishlistPage />} />
              <Route path="profile" element={<DashboardProfilePage />} />
              <Route path="settings" element={<DashboardSettingsPage />} />
            </Route>
            
            {/* Error Routes */}
            <Route path="/server-error" element={<ServerErrorPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

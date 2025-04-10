import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import DashboardLayout from './components/layout/DashboardLayout';
import AdminLayout from './components/layout/AdminLayout';
import VendorLayout from './components/layout/VendorLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import EmailVerificationPage from './pages/EmailVerificationPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import NotFoundPage from './pages/NotFoundPage';
import ServerErrorPage from './pages/ServerErrorPage';
import WishlistPage from './pages/account/WishlistPage';
import CartPage from './pages/CartPage';
// Import account pages
import DashboardPage from './pages/account/DashboardPage';
import OrdersPage from './pages/account/OrdersPage';
import ProfilePage from './pages/account/ProfilePage';
import SettingsPage from './pages/account/SettingsPage';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/auth/PrivateRoute';
import AdminRoute from './components/auth/AdminRoute';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';

// Import admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import BlogPage from './pages/admin/BlogPage';
import MediaPage from './pages/admin/MediaPage';
import UsersPage from './pages/admin/UsersPage';
import CustomersPage from './pages/admin/CustomersPage';
import NotificationsPage from './pages/admin/NotificationsPage';
import AdminOrdersPage from './pages/admin/OrdersPage';
import AnalyticsPage from './pages/admin/AnalyticsPage';
import ProductsPage from './pages/admin/ProductsPage';
import CategoriesPage from './pages/admin/CategoriesPage';
import BrandsPage from './pages/admin/BrandsPage';
import VendorsPage from './pages/admin/VendorsPage';
import VendorDetailsPage from './pages/admin/VendorDetailsPage';
import VendorEditPage from './pages/admin/VendorEditPage';
import { LoadingProvider } from './contexts/LoadingContext';
import VendorPageErrorBoundary from './components/error/VendorPageErrorBoundary';

// Import vendor pages
import VendorLoginPage from './pages/vendor/LoginPage';
import VendorDashboard from './pages/vendor/DashboardPage';
import VendorRoute from './components/auth/VendorRoute';

// For demo purposes - these would be actual page components in a full implementation
const CategoryPage = () => <div className="container mx-auto px-4 py-10"><h1 className="text-3xl font-bold">Category Page</h1></div>;
const ProductPage = () => <div className="container mx-auto px-4 py-10"><h1 className="text-3xl font-bold">Product Page</h1></div>;

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Main Website Routes */}
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
            <Route 
              path="/order-success" 
              element={
                <PrivateRoute requireVerification={true}>
                  <OrderSuccessPage />
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
              <Route path="orders" element={<OrdersPage />} />
              <Route path="wishlist" element={<WishlistPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>

            {/* Error Routes */}
            <Route path="/server-error" element={<ServerErrorPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* Admin Routes - Separate from main layout */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <LoadingProvider>
                  <AdminLayout />
                </LoadingProvider>
              </AdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="brands" element={<BrandsPage />} />
            <Route 
              path="vendors" 
              element={
                <VendorPageErrorBoundary>
                  <VendorsPage />
                </VendorPageErrorBoundary>
              } 
            />
            <Route 
              path="vendors/:vendorId" 
              element={
                <VendorPageErrorBoundary>
                  <VendorDetailsPage />
                </VendorPageErrorBoundary>
              } 
            />
            <Route 
              path="vendors/edit/:vendorId" 
              element={
                <VendorPageErrorBoundary>
                  <VendorEditPage />
                </VendorPageErrorBoundary>
              } 
            />
            <Route path="orders" element={<AdminOrdersPage />} />
            <Route path="customers" element={<CustomersPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="media" element={<MediaPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="settings" element={<div>Settings Page</div>} />
          </Route>

          {/* Vendor Routes */}
          <Route path="/vendor/login" element={<VendorLoginPage />} />
          <Route
            path="/vendor"
            element={
              <VendorRoute>
                <LoadingProvider>
                  <VendorLayout />
                </LoadingProvider>
              </VendorRoute>
            }
          >
            <Route index element={<Navigate to="/vendor/dashboard" replace />} />
            <Route path="dashboard" element={<VendorDashboard />} />
            <Route path="products" element={<div>Products</div>} />
            <Route path="orders" element={<div>Orders</div>} />
            <Route path="inventory" element={<div>Inventory</div>} />
            <Route path="reports" element={<div>Reports</div>} />
            <Route path="profile" element={<div>Profile</div>} />
            <Route path="settings" element={<div>Settings</div>} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';

// For demo purposes - these would be actual page components in a full implementation
const CategoryPage = () => <div className="container mx-auto px-4 py-10"><h1 className="text-3xl font-bold">Category Page</h1></div>;
const ProductPage = () => <div className="container mx-auto px-4 py-10"><h1 className="text-3xl font-bold">Product Page</h1></div>;
const CartPage = () => <div className="container mx-auto px-4 py-10"><h1 className="text-3xl font-bold">Cart Page</h1></div>;
const CheckoutPage = () => <div className="container mx-auto px-4 py-10"><h1 className="text-3xl font-bold">Checkout Page</h1></div>;
const AccountPage = () => <div className="container mx-auto px-4 py-10"><h1 className="text-3xl font-bold">Account Page</h1></div>;
const WishlistPage = () => <div className="container mx-auto px-4 py-10"><h1 className="text-3xl font-bold">Wishlist Page</h1></div>;
const NotFoundPage = () => <div className="container mx-auto px-4 py-10"><h1 className="text-3xl font-bold">404 - Page Not Found</h1></div>;

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

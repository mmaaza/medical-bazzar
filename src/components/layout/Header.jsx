import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Implement search functionality here
  };

  return (
    <header className="bg-primary-500 text-white shadow-md">
      {/* Top Navigation Bar */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold font-heading">Medisanj</span>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 mx-10">
            <form onSubmit={handleSearch} className="w-full max-w-xl">
              <div className="relative">
                <input
                  type="text"
                  className="w-full py-2 px-4 pr-10 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent-400"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  type="submit" 
                  className="absolute right-0 top-0 mt-2 mr-3 text-gray-600 hover:text-primary-500"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </button>
              </div>
            </form>
          </div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/account" className="hover:text-accent-300 transition-colors duration-200">
              <div className="flex flex-col items-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                <span className="text-xs mt-1">Account</span>
              </div>
            </Link>
            <Link to="/wishlist" className="hover:text-accent-300 transition-colors duration-200">
              <div className="flex flex-col items-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
                <span className="text-xs mt-1">Wishlist</span>
              </div>
            </Link>
            <Link to="/cart" className="hover:text-accent-300 transition-colors duration-200">
              <div className="flex flex-col items-center relative">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                </svg>
                <span className="absolute -top-2 -right-2 bg-secondary-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">3</span>
                <span className="text-xs mt-1">Cart</span>
              </div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white focus:outline-none" 
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Search - Visible only on mobile */}
        <div className="mt-3 md:hidden">
          <form onSubmit={handleSearch} className="w-full">
            <div className="relative">
              <input
                type="text"
                className="w-full py-2 px-4 pr-10 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent-400"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit" 
                className="absolute right-0 top-0 mt-2 mr-3 text-gray-600 hover:text-primary-500"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Categories Menu */}
      <div className="bg-primary-600">
        <div className="container mx-auto px-4">
          <nav className="flex items-center">
            <div className="relative group">
              <button className="flex items-center px-4 py-2 text-white hover:bg-primary-700 focus:outline-none">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
                All Categories
              </button>
              <div className="absolute z-10 hidden group-hover:block bg-white shadow-lg text-gray-800 w-56">
                <div className="py-2">
                  <Link to="/category/electronics" className="block px-4 py-2 hover:bg-primary-100">Electronics</Link>
                  <Link to="/category/clothing" className="block px-4 py-2 hover:bg-primary-100">Clothing</Link>
                  <Link to="/category/home" className="block px-4 py-2 hover:bg-primary-100">Home & Kitchen</Link>
                  <Link to="/category/beauty" className="block px-4 py-2 hover:bg-primary-100">Beauty & Personal Care</Link>
                  <Link to="/category/books" className="block px-4 py-2 hover:bg-primary-100">Books</Link>
                </div>
              </div>
            </div>
            <div className="hidden md:flex">
              <Link to="/deals" className="px-4 py-2 text-white hover:bg-primary-700">Today's Deals</Link>
              <Link to="/bestsellers" className="px-4 py-2 text-white hover:bg-primary-700">Best Sellers</Link>
              <Link to="/new" className="px-4 py-2 text-white hover:bg-primary-700">New Arrivals</Link>
              <Link to="/customer-service" className="px-4 py-2 text-white hover:bg-primary-700">Customer Service</Link>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-primary-700 text-white">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/deals" className="block px-3 py-2 hover:bg-primary-800 rounded-md">Today's Deals</Link>
            <Link to="/bestsellers" className="block px-3 py-2 hover:bg-primary-800 rounded-md">Best Sellers</Link>
            <Link to="/new" className="block px-3 py-2 hover:bg-primary-800 rounded-md">New Arrivals</Link>
            <Link to="/customer-service" className="block px-3 py-2 hover:bg-primary-800 rounded-md">Customer Service</Link>
            <hr className="border-primary-600" />
            <Link to="/account" className="block px-3 py-2 hover:bg-primary-800 rounded-md">My Account</Link>
            <Link to="/wishlist" className="block px-3 py-2 hover:bg-primary-800 rounded-md">Wishlist</Link>
            <Link to="/cart" className="block px-3 py-2 hover:bg-primary-800 rounded-md">Cart (3)</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

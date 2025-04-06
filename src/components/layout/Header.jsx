import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isAccountRoute = location.pathname.startsWith('/account');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const handleAccountClick = () => {
    if (!currentUser) {
      navigate('/login');
    } else {
      navigate('/account');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const handleWishlistClick = (e) => {
    if (!currentUser) {
      e.preventDefault();
      // Save the intended destination
      navigate('/login', { state: { from: { pathname: '/wishlist' } } });
    }
  };

  return (
    <header className={`bg-primary-500 text-white shadow-md ${!isAccountRoute ? 'sticky top-0' : 'h-16'} z-50`}>
      {/* Top Navigation Bar */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold font-heading">MB Nepal</span>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 mx-10">
            <form onSubmit={handleSearch} className="w-full max-w-xl">
              <div className="relative">
                <input
                  type="text"
                  className="w-full py-2 px-4 pr-10 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent-400"
                  placeholder="Search medical supplies..."
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
            <button onClick={handleAccountClick} className="hover:text-accent-300 transition-colors duration-200">
              <div className="flex flex-col items-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                <span className="text-xs mt-1">{currentUser ? 'Account' : 'Login'}</span>
              </div>
            </button>
            {currentUser && (
              <button onClick={handleLogout} className="hover:text-accent-300 transition-colors duration-200">
                <div className="flex flex-col items-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                  </svg>
                  <span className="text-xs mt-1">Logout</span>
                </div>
              </button>
            )}
            <Link to="/wishlist" onClick={handleWishlistClick} className="hover:text-accent-300 transition-colors duration-200">
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
                placeholder="Search medical supplies..."
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

      {/* Categories Menu - Hidden in account routes */}
      {!isAccountRoute && (
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
                <div className="absolute z-10 hidden group-hover:block bg-white shadow-lg text-gray-800 w-64">
                  <div className="py-2">
                    <Link to="/category/hospital-equipment" className="block px-4 py-2 hover:bg-primary-100">Hospital Equipment</Link>
                    <Link to="/category/laboratory" className="block px-4 py-2 hover:bg-primary-100">Laboratory Supplies</Link>
                    <Link to="/category/surgery" className="block px-4 py-2 hover:bg-primary-100">Surgery & ICU</Link>
                    <Link to="/category/dental" className="block px-4 py-2 hover:bg-primary-100">Dental Equipment</Link>
                    <Link to="/category/diagnostic" className="block px-4 py-2 hover:bg-primary-100">Diagnostic Equipment</Link>
                    <Link to="/category/orthopedic" className="block px-4 py-2 hover:bg-primary-100">Orthopedic & Mobility</Link>
                    <Link to="/category/disposables" className="block px-4 py-2 hover:bg-primary-100">Medical Disposables</Link>
                    <Link to="/category/ppe" className="block px-4 py-2 hover:bg-primary-100">PPE & Safety</Link>
                    <Link to="/category/pharmacy" className="block px-4 py-2 hover:bg-primary-100">Pharmacy Supplies</Link>
                    <Link to="/category/emergency" className="block px-4 py-2 hover:bg-primary-100">Emergency & First Aid</Link>
                  </div>
                </div>
              </div>
              <div className="hidden md:flex">
                <Link to="/new-arrivals" className="px-4 py-2 text-white hover:bg-primary-700">New Arrivals</Link>
                <Link to="/best-sellers" className="px-4 py-2 text-white hover:bg-primary-700">Best Sellers</Link>
                <Link to="/deals" className="px-4 py-2 text-white hover:bg-primary-700">Deals & Offers</Link>
                <Link to="/brands" className="px-4 py-2 text-white hover:bg-primary-700">Top Brands</Link>
                <Link to="/hospital-solutions" className="px-4 py-2 text-white hover:bg-primary-700">Hospital Solutions</Link>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-primary-700 text-white">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/new-arrivals" className="block px-3 py-2 hover:bg-primary-800 rounded-md">New Arrivals</Link>
            <Link to="/best-sellers" className="block px-3 py-2 hover:bg-primary-800 rounded-md">Best Sellers</Link>
            <Link to="/deals" className="block px-3 py-2 hover:bg-primary-800 rounded-md">Deals & Offers</Link>
            <Link to="/brands" className="block px-3 py-2 hover:bg-primary-800 rounded-md">Top Brands</Link>
            <Link to="/hospital-solutions" className="block px-3 py-2 hover:bg-primary-800 rounded-md">Hospital Solutions</Link>
            <hr className="border-primary-600" />
            <button onClick={handleAccountClick} className="block w-full text-left px-3 py-2 hover:bg-primary-800 rounded-md">
              {currentUser ? 'My Account' : 'Login'}
            </button>
            {currentUser && (
              <button onClick={handleLogout} className="block w-full text-left px-3 py-2 hover:bg-primary-800 rounded-md">
                Logout
              </button>
            )}
            <Link to="/wishlist" onClick={handleWishlistClick} className="block px-3 py-2 hover:bg-primary-800 rounded-md">Wishlist</Link>
            <Link to="/cart" className="block px-3 py-2 hover:bg-primary-800 rounded-md">Cart (3)</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

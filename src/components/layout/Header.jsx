import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../services/api";

// Add this helper function at the top of the component
const renderCategoryWithIndentation = (category, level = 0) => {
  return (
    <React.Fragment key={category._id}>
      <Link
        to={`/category/${category.slug}`}
        className={`block px-4 py-2 hover:bg-primary-100 text-sm ${level > 0 ? `pl-${4 + level * 4}` : ''}`}
      >
        {level > 0 && '└─ '}{category.name}
      </Link>
      {category.children?.map(child => renderCategoryWithIndentation(child, level + 1))}
    </React.Fragment>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isAccountRoute = location.pathname.startsWith("/account");

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [selectedLevelIndex, setSelectedLevelIndex] = useState(0);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories', {
          params: { status: 'active' }
        });
        setCategories(response.data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setSelectedCategories([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const handleAccountClick = () => {
    if (!currentUser) {
      navigate("/login");
    } else {
      navigate("/account");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  const handleWishlistClick = (e) => {
    if (!currentUser) {
      e.preventDefault();
      // Save the intended destination
      navigate("/login", { state: { from: { pathname: "/wishlist" } } });
    }
  };

  const handleCategoryClick = (category, level, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Update selected categories array up to the current level and add new selection
    setSelectedCategories(prev => {
      const newSelected = [...prev.slice(0, level), category];
      return newSelected;
    });

    // On mobile, move to next level if category has children
    if (window.innerWidth < 768 && category.children?.length > 0) {
      setSelectedLevelIndex(level + 1);
    }

    // Only navigate if it's a leaf category (no children)
    if (!category.children?.length) {
      setIsDropdownOpen(false);
      setSelectedCategories([]);
      setSelectedLevelIndex(0);
      navigate(`/category/${category.slug}`);
    }
  };

  const handleCategoryNavigation = (e, category) => {
    e.stopPropagation(); // Prevent the click from triggering handleCategoryClick
    if (!category.children?.length) {
      setIsDropdownOpen(false);
      setSelectedCategories([]);
      navigate(`/category/${category.slug}`);
    }
  };

  const handleBackClick = () => {
    setSelectedLevelIndex(prev => Math.max(0, prev - 1));
    setSelectedCategories(prev => prev.slice(0, -1));
  };

  const getCategoriesForLevel = (level) => {
    if (level === 0) {
      return categories;
    }
    
    const parentCategory = selectedCategories[level - 1];
    return parentCategory?.children || [];
  };

  const getMaxLevel = () => {
    const findMaxLevel = (categories, level = 0) => {
      if (!categories || categories.length === 0) return level;
      
      let maxLevel = level;
      categories.forEach(category => {
        if (category.children?.length > 0) {
          const childLevel = findMaxLevel(category.children, level + 1);
          maxLevel = Math.max(maxLevel, childLevel);
        }
      });
      return maxLevel;
    };

    return findMaxLevel(categories);
  };

  // Return array of numbers from 0 to max level found in categories
  const getLevels = () => {
    const maxLevel = getMaxLevel();
    return Array.from({ length: maxLevel + 1 }, (_, i) => i);
  };

  return (
    <header
      className={`bg-primary-500 text-white shadow-md ${
        !isAccountRoute 
          ? "sticky top-0 md:h-[88px]" // 56px for top bar + 32px for categories
          : "h-16"
      } z-50`}
    >
      {/* Top Navigation Bar */}
      <div className="container mx-auto px-4 py-3 h-14">
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
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </button>
              </div>
            </form>
          </div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={handleAccountClick}
              className="hover:text-accent-300 transition-colors duration-200"
            >
              <div className="flex flex-col items-center">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>
                </svg>
                <span className="text-xs mt-1">
                  {currentUser ? "Account" : "Login"}
                </span>
              </div>
            </button>
            {currentUser && (
              <button
                onClick={handleLogout}
                className="hover:text-accent-300 transition-colors duration-200"
              >
                <div className="flex flex-col items-center">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    ></path>
                  </svg>
                  <span className="text-xs mt-1">Logout</span>
                </div>
              </button>
            )}
            <Link
              to="/account/wishlist"
              onClick={handleWishlistClick}
              className="hover:text-accent-300 transition-colors duration-200"
            >
              <div className="flex flex-col items-center">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
                <span className="text-xs mt-1">Wishlist</span>
              </div>
            </Link>
            <Link
              to="/cart"
              className="hover:text-accent-300 transition-colors duration-200"
            >
              <div className="flex flex-col items-center relative">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  ></path>
                </svg>
                <span className="absolute -top-2 -right-2 bg-secondary-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  3
                </span>
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
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Categories Menu - Hidden in account routes */}
      {!isAccountRoute && (
        <div className="bg-primary-600">
          <div className="container mx-auto px-4">
            <nav className="flex items-center">
              <div className="relative group" ref={dropdownRef}>
                <button 
                  className="flex items-center px-4 py-2 text-white hover:bg-primary-700 focus:outline-none"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                  Categories
                </button>

                {isDropdownOpen && (
                  <div 
                    className="fixed md:absolute z-10 top-[88px] md:top-full left-0 right-0 bg-white shadow-lg text-gray-800 border md:rounded-lg"
                    style={{ maxHeight: '80vh' }}
                  >
                    <div className="md:flex md:flex-nowrap md:overflow-visible overflow-x-hidden w-full">
                      {getLevels().map((level) => {
                        const categoriesForLevel = getCategoriesForLevel(level);
                        if (!categoriesForLevel?.length) {
                          return null;
                        }

                        return (
                          <div 
                            key={level}
                            className={`w-full md:min-w-[250px] md:w-auto border-r last:border-r-0 flex-shrink-0 max-h-[80vh] overflow-y-auto bg-white
                                     ${window.innerWidth < 768 
                                       ? level === selectedLevelIndex 
                                         ? 'block' 
                                         : 'hidden' 
                                       : 'block'}`}
                          >
                            <div className="p-2 bg-gray-50 border-b sticky top-0 z-10 flex items-center">
                              {level > 0 && window.innerWidth < 768 && (
                                <button
                                  onClick={handleBackClick}
                                  className="mr-2 p-1 hover:bg-gray-100 rounded-full"
                                >
                                  <svg 
                                    className="w-5 h-5 text-gray-600" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                  >
                                    <path 
                                      strokeLinecap="round" 
                                      strokeLinejoin="round" 
                                      strokeWidth="2" 
                                      d="M15 19l-7-7 7-7"
                                    />
                                  </svg>
                                </button>
                              )}
                              <span className="text-sm font-medium text-gray-600">
                                {level === 0 
                                  ? 'Main Categories' 
                                  : selectedCategories[level - 1]?.name || 'Sub Categories'}
                              </span>
                            </div>
                            <div className="py-1">
                              {categoriesForLevel.map((category) => (
                                <div
                                  key={category._id}
                                  className={`px-4 py-3 md:py-2 cursor-pointer hover:bg-primary-50 ${
                                    selectedCategories[level]?._id === category._id ? 'bg-primary-50' : ''
                                  }`}
                                  onClick={(e) => handleCategoryClick(category, level, e)}
                                >
                                  <div className="flex justify-between items-center">
                                    <span className="text-base md:text-sm text-gray-700">
                                      {category.name}
                                    </span>
                                    {category.children?.length > 0 && (
                                      <svg
                                        className="w-5 h-5 md:w-4 md:h-4 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M9 5l7 7-7 7"
                                        />
                                      </svg>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Other Navigation Items */}
              <div className="hidden md:flex space-x-4 ml-4">
                <Link to="/new-arrivals" className="px-3 py-2 text-white hover:bg-primary-700">
                  New Arrivals
                </Link>
                <Link to="/best-sellers" className="px-3 py-2 text-white hover:bg-primary-700">
                  Best Sellers
                </Link>
                <Link to="/deals" className="px-3 py-2 text-white hover:bg-primary-700">
                  Deals
                </Link>
                <Link to="/brands" className="px-3 py-2 text-white hover:bg-primary-700">
                  Brands
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-primary-600 text-white">
          {/* Mobile Search */}
          <div className="px-4 py-3 border-b border-primary-500">
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
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </button>
              </div>
            </form>
          </div>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/new-arrivals"
              className="block px-3 py-2 hover:bg-primary-800 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              New Arrivals
            </Link>
            <Link
              to="/best-sellers"
              className="block px-3 py-2 hover:bg-primary-800 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Best Sellers
            </Link>
            <Link
              to="/deals"
              className="block px-3 py-2 hover:bg-primary-800 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Deals & Offers
            </Link>
            <Link
              to="/brands"
              className="block px-3 py-2 hover:bg-primary-800 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Top Brands
            </Link>
            <Link
              to="/hospital-solutions"
              className="block px-3 py-2 hover:bg-primary-800 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Hospital Solutions
            </Link>
            <hr className="border-primary-600" />
            <button
              onClick={(e) => {
                handleAccountClick();
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 hover:bg-primary-800 rounded-md"
            >
              {currentUser ? "My Account" : "Login"}
            </button>
            {currentUser && (
              <button
                onClick={(e) => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 hover:bg-primary-800 rounded-md"
              >
                Logout
              </button>
            )}
            <Link
              to="/wishlist"
              onClick={(e) => {
                handleWishlistClick(e);
                setIsMenuOpen(false);
              }}
              className="block px-3 py-2 hover:bg-primary-800 rounded-md"
            >
              Wishlist
            </Link>
            <Link
              to="/cart"
              className="block px-3 py-2 hover:bg-primary-800 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Cart (3)
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

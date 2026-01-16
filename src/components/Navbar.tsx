import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Menu, X, User, LogOut, Settings, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

interface NavbarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onPageChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { state, dispatch } = useCart();
  const { currentUser, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get user's initial from email
  const getUserInitial = () => {
    if (!currentUser?.email) return '';
    return currentUser.email[0].toUpperCase();
  };

  // Get a consistent background color based on the user's email
  const getInitialBackgroundColor = () => {
    if (!currentUser?.email) return 'bg-gray-200';
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-red-500',
      'bg-maroon-500'
    ];
    const index = currentUser.email.length % colors.length;
    return colors[index];
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsProfileDropdownOpen(false);
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const handleAvatarClick = () => {
    if (currentUser) {
      setIsProfileDropdownOpen(!isProfileDropdownOpen);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    { name: 'Home', page: 'home' },
    { name: 'Shop', page: 'shop' },
    { name: 'About', page: 'about' },
    { name: 'Contact', page: 'contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20' 
          : 'bg-white/95 backdrop-blur-sm shadow-md'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer transform hover:scale-105 transition-transform duration-200" onClick={() => onPageChange('home')}>
              <img 
                src="/images/logo.png" 
                alt="Araj Logo" 
                className="h-16 w-auto"
              />
            </div>

            {/* Desktop Navigation - Centered */}
            <div className="hidden md:flex flex-1 items-center justify-center">
              <div className="flex space-x-8">
                {navItems.map(item => (
                  <button
                    key={item.page}
                    onClick={() => onPageChange(item.page)}
                    className={`relative group px-3 py-2 text-sm font-medium transition-all duration-200 ${
                      currentPage === item.page
                        ? 'text-maroon-600'
                        : 'text-gray-600 hover:text-maroon-600'
                    }`}
                  >
                    {item.name}
                    <span 
                      className={`absolute bottom-0 left-0 w-full h-0.5 bg-maroon-600 transform origin-left transition-transform duration-200 ${
                        currentPage === item.page ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right side buttons */}
            <div className="flex items-center space-x-4">
              {/* Cart button */}
              <button
                onClick={() => dispatch({ type: 'TOGGLE_CART' })}
                className="relative p-2 text-gray-600 hover:text-maroon-600 transition-colors duration-200"
              >
                <span className="sr-only">View cart</span>
                <ShoppingCart className="h-6 w-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center h-5 w-5 rounded-full bg-maroon-600 text-xs font-medium text-white animate-pulse">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Profile dropdown */}
              <div className="relative">
                <button
                  onClick={handleAvatarClick}
                  className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-semibold text-white transition-transform duration-200 hover:scale-110 ${
                    currentUser ? getInitialBackgroundColor() : 'bg-gray-400'
                  }`}
                >
                  {currentUser ? getUserInitial() : <User className="h-5 w-5" />}
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileDropdownOpen && currentUser && (
                  <div
                    ref={dropdownRef}
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white/95 backdrop-blur-sm ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 transform transition-all duration-200"
                  >
                    <div className="py-1">
                      <button
                        onClick={() => {
                          onPageChange('profile');
                          setIsProfileDropdownOpen(false);
                        }}
                        className="group flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-maroon-50 hover:text-maroon-600 transition-colors duration-200"
                      >
                        <User className="mr-3 h-5 w-5 text-gray-400 group-hover:text-maroon-600" />
                        Profile
                      </button>
                      <button
                        onClick={() => {
                          onPageChange('orders');
                          setIsProfileDropdownOpen(false);
                        }}
                        className="group flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-maroon-50 hover:text-maroon-600 transition-colors duration-200"
                      >
                        <Package className="mr-3 h-5 w-5 text-gray-400 group-hover:text-maroon-600" />
                        My Orders
                      </button>
                      <button
                        onClick={() => {
                          onPageChange('settings');
                          setIsProfileDropdownOpen(false);
                        }}
                        className="group flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-maroon-50 hover:text-maroon-600 transition-colors duration-200"
                      >
                        <Settings className="mr-3 h-5 w-5 text-gray-400 group-hover:text-maroon-600" />
                        Settings
                      </button>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={handleLogout}
                        className="group flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                      >
                        <LogOut className="mr-3 h-5 w-5 text-red-400 group-hover:text-red-600" />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <div className="flex items-center md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-maroon-600 hover:bg-maroon-50 transition-colors duration-200"
                >
                  <span className="sr-only">Open main menu</span>
                  {isMenuOpen ? (
                    <X className="block h-6 w-6" />
                  ) : (
                    <Menu className="block h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map(item => (
                <button
                  key={item.page}
                  onClick={() => {
                    onPageChange(item.page);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full px-3 py-2 rounded-md text-base font-medium text-left transition-colors duration-200 ${
                    currentPage === item.page
                      ? 'text-maroon-600 bg-maroon-50'
                      : 'text-gray-600 hover:text-maroon-600 hover:bg-maroon-50'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              {currentUser && (
                <>
                  <button
                    onClick={() => {
                      onPageChange('profile');
                      setIsMenuOpen(false);
                    }}
                    className="block w-full px-3 py-2 rounded-md text-base font-medium text-left text-gray-600 hover:text-maroon-600 hover:bg-maroon-50 transition-colors duration-200"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      onPageChange('orders');
                      setIsMenuOpen(false);
                    }}
                    className="block w-full px-3 py-2 rounded-md text-base font-medium text-left text-gray-600 hover:text-maroon-600 hover:bg-maroon-50 transition-colors duration-200"
                  >
                    My Orders
                  </button>
                  <button
                    onClick={() => {
                      onPageChange('settings');
                      setIsMenuOpen(false);
                    }}
                    className="block w-full px-3 py-2 rounded-md text-base font-medium text-left text-gray-600 hover:text-maroon-600 hover:bg-maroon-50 transition-colors duration-200"
                  >
                    Settings
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full px-3 py-2 rounded-md text-base font-medium text-left text-red-600 hover:bg-red-50 transition-colors duration-200"
                  >
                    Sign out
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
      {/* Add a spacer to prevent content from going under the navbar */}
      <div className="h-20" />

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};

export default Navbar;
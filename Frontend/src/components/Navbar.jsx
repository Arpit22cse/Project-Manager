import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/authcontext.jsx';
import { useNavigate } from 'react-router-dom'
import { 
  Home, 
  LayoutDashboard, 
  UserCircle, 
  LogOut, 
  LogIn,
  Menu,
  X 
} from 'lucide-react';

import { logout } from '../../api.js'

const Navbar = () => {
  const { user, setUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleLogout = async() => {
    await logout();
    setUser(null);
    localStorage.removeItem('token');
    setIsOpen(false);
    navigate('/');
  };

  // Define which links show up based on auth status
  const navLinks = [
    { name: 'Home', href: '/', icon: <Home className="w-5 h-5" />, show: true },
    { name: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" />, show: !!user },
    { name: 'Profile', href: '/profile', icon: <UserCircle className="w-5 h-5" />, show: !!user },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.filter(link => link.show).map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.href) 
                    ? 'text-indigo-600 bg-indigo-50' 
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}

            <div className="h-6 w-px bg-gray-200 mx-2"></div>

            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            ) : (
              <Link
                to="/auth"
                className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-sm font-bold shadow-md shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95 flex items-center space-x-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-50 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.filter(link => link.show).map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 p-3 rounded-xl text-base font-medium ${
                    isActive(link.href) ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600'
                  }`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-100">
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 p-3 text-red-600 font-medium"
                  >
                    <LogOut className="w-6 h-6" />
                    <span>Logout</span>
                  </button>
                ) : (
                  <Link
                    to="/auth"
                    onClick={() => setIsOpen(false)}
                    className="w-full flex items-center justify-center space-x-2 py-3 bg-indigo-600 text-white rounded-xl font-bold"
                  >
                    <LogIn className="w-5 h-5" />
                    <span>Login</span>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/authcontext.jsx';
import { Link } from 'react-router-dom';
// Fixed imports to match Lucide React naming
import { 
  User, 
  Mail, 
  ShieldCheck, 
  LogOut,
  Pencil
} from 'lucide-react';
import { logout } from '../../api.js'
import { useNavigate } from 'react-router-dom'

import '../index.css'

const Profile = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = async() => {

    await logout();
    setUser(null);
    localStorage.removeItem('token');
    navigate('/');
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <User className="w-10 h-10 text-gray-300" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">No Profile Found</h2>
        <p className="text-gray-500 mb-6">Please log in to view your account details.</p>
        <Link to="/auth" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold transition-all">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Profile Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8 mb-8"
      >
        <div className="relative">
          <div className="w-32 h-32 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-xl shadow-indigo-100">
            {user.name?.charAt(0) || 'U'}
          </div>
          <button className="absolute bottom-0 right-0 p-2.5 bg-white rounded-full shadow-lg border border-gray-100 text-indigo-600 hover:scale-110 transition-transform">
            <Pencil className="w-4 h-4" />
          </button>
        </div>

        <div className="text-center md:text-left flex-grow">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-1">{user.name}</h2>
          <p className="text-indigo-600 font-medium mb-4">{user.role || 'Project Lead'}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <span className="px-4 py-1.5 bg-gray-50 rounded-full text-xs font-semibold text-gray-600 border border-gray-100">
              Active User
            </span>
            <span className="px-4 py-1.5 bg-gray-50 rounded-full text-xs font-semibold text-gray-600 border border-gray-100">
              Member since Jan 2026
            </span>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-6 py-3 border border-red-100 text-red-600 rounded-xl hover:bg-red-50 transition-colors font-semibold"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </motion.div>

      {/* Profile Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="md:col-span-2 space-y-6"
        >
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Account Details</h3>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Full Name</p>
                  <p className="text-gray-900 font-semibold">{user.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Email Address</p>
                  <p className="text-gray-900 font-semibold">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Account Security</p>
                  <p className="text-gray-900 font-semibold">Verified User</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sidebar Info */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-6 text-white shadow-xl shadow-indigo-100">
            <h4 className="font-bold mb-2">Pro Subscription</h4>
            <p className="text-indigo-100 text-sm mb-4">You have unlimited projects and advanced task reporting enabled.</p>
            <button className="w-full py-2 bg-white text-indigo-600 rounded-lg text-sm font-bold hover:bg-indigo-50 transition-colors">
              Manage Billing
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
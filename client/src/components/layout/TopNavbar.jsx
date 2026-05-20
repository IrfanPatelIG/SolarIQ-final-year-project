import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Bell, HelpCircle, ChevronDown, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import UserAvatar from '../common/UserAvatar.jsx';
import BrandLogo from '../common/BrandLogo.jsx';

const TopNavbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const displayName = user?.name || user?.fullName || 'User';
  const displayEmail = user?.email || '';
  const [showNotifications, setShowNotifications] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  
  const notificationsRef = useRef(null);
  const helpRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (helpRef.current && !helpRef.current.contains(event.target)) {
        setShowHelp(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const isActive = (path) => (
    path === '/dashboard'
      ? location.pathname.startsWith('/dashboard')
      : location.pathname === path
  );

  return (
    <header className="w-full h-16 bg-white dark:bg-slate-900 flex justify-between items-center px-8 sticky top-0 z-40 shadow-sm">
      <div className="flex items-center gap-8">
        <BrandLogo className="md:hidden" />
        <div className="hidden md:flex items-center gap-6 font-bold tracking-tight">
          <Link 
            to="/dashboard"
            className={`pb-1 border-b-2 transition-colors ${
              isActive('/dashboard') 
                ? 'text-blue-900 dark:text-blue-100 border-yellow-500' 
                : 'text-slate-500 dark:text-slate-400 border-transparent hover:text-blue-700 dark:hover:text-blue-200 hover:border-blue-300'
            }`}
          >
            Dashboard
          </Link>
          <Link 
            to="/analytics"
            className={`pb-1 border-b-2 transition-colors ${
              isActive('/analytics') 
                ? 'text-blue-900 dark:text-blue-100 border-yellow-500' 
                : 'text-slate-500 dark:text-slate-400 border-transparent hover:text-blue-700 dark:hover:text-blue-200 hover:border-blue-300'
            }`}
          >
            Analytics
          </Link>
          <Link 
            to="/alerts"
            className={`pb-1 border-b-2 transition-colors ${
              isActive('/alerts') 
                ? 'text-blue-900 dark:text-blue-100 border-yellow-500' 
                : 'text-slate-500 dark:text-slate-400 border-transparent hover:text-red-600 dark:hover:text-red-300 hover:border-red-300'
            }`}
          >
            Alerts
          </Link>
          <Link 
            to="/settings"
            className={`pb-1 border-b-2 transition-colors ${
              isActive('/settings') 
                ? 'text-blue-900 dark:text-blue-100 border-yellow-500' 
                : 'text-slate-500 dark:text-slate-400 border-transparent hover:text-blue-700 dark:hover:text-blue-200 hover:border-blue-300'
            }`}
          >
            Settings
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block">
          <input 
            className="bg-slate-100 dark:bg-slate-800 border-none rounded-full px-4 py-1.5 text-sm w-64 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400" 
            placeholder="Search systems..." 
            type="text"
          />
          <Search className="absolute right-3 top-1.5 text-slate-400 dark:text-slate-500" size={18} />
        </div>
        
        {/* Notifications */}
        <div className="relative" ref={notificationsRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-full p-2 -m-2 active:scale-95 transition-all relative"
          >
            <Bell size={24} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">2</span>
          </button>
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 z-50">
              <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                <h3 className="font-bold text-slate-900 dark:text-slate-100">Notifications</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <div className="p-4 hover:bg-red-50 dark:hover:bg-red-950/20 cursor-pointer border-b border-slate-100 dark:border-slate-700 transition-colors">
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Inverter #04 Overheating</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">12 minutes ago</p>
                </div>
                <div className="p-4 hover:bg-blue-50 dark:hover:bg-blue-950/20 cursor-pointer transition-colors">
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Communication Lag Detected</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">1 hour ago</p>
                </div>
              </div>
              <div className="p-3 border-t border-slate-200 dark:border-slate-700">
                <Link to="/alerts" className="block text-center text-sm font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/20 rounded-lg py-2 transition-all">
                  View All Alerts
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Help */}
        <div className="relative" ref={helpRef}>
          <button 
            onClick={() => setShowHelp(!showHelp)}
            className="text-slate-500 dark:text-slate-400 active:opacity-80 transition-all"
          >
            <HelpCircle size={24} />
          </button>
          {showHelp && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 z-50">
              <div className="p-4">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-3">Help & Support</h3>
                <div className="space-y-2">
                  <Link to="#" className="block px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
                    Documentation
                  </Link>
                  <Link to="#" className="block px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
                    Contact Support
                  </Link>
                  <Link to="#" className="block px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
                    FAQ
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="relative" ref={profileRef}>
          <button 
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 focus:outline-none"
          >
            <UserAvatar user={user} className="border-2 border-blue-600" />
            <ChevronDown size={16} className="text-slate-500 dark:text-slate-400" />
          </button>
          {showProfile && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 z-50">
              <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                <p className="font-bold text-slate-900 dark:text-slate-100">{displayName}</p>
                {displayEmail && (
                  <p className="text-xs text-slate-500 dark:text-slate-400">{displayEmail}</p>
                )}
              </div>
              <div className="p-2">
                <Link 
                  to="/settings" 
                  className="flex items-center gap-3 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-950/20 hover:text-blue-700 dark:hover:text-blue-300 rounded-lg transition-all"
                  onClick={() => setShowProfile(false)}
                >
                  <Settings size={16} />
                  Settings
                </Link>
                <button 
                  onClick={() => {
                    logout();
                    setShowProfile(false);
                  }}
                  className="flex items-center gap-3 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:shadow-sm active:scale-[0.98] rounded-lg w-full transition-all"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;

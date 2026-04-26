import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BarChart3, AlertTriangle, Settings as SettingsIcon, Shield, Sun, Plus, HelpCircle, LogOut, HeadphonesIcon } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;

  return (
    <aside className="hidden md:flex h-screen w-64 fixed left-0 top-0 bg-slate-50 dark:bg-slate-900 flex-col py-6 border-r border-slate-100 dark:border-slate-800 z-50">
      <div className="px-6 mb-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
          <Sun className="text-white fill-white" size={24} />
        </div>
        <div>
          <h1 className="text-xl font-black text-blue-900 dark:text-blue-100 tracking-tighter">SolarIQ</h1>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold">Management Console</p>
        </div>
      </div>
      
      <nav className="flex-1 space-y-1">
        <Link 
          to="/dashboard"
          className={`flex items-center px-6 py-3 font-medium transition-all ${
            isActive('/dashboard') 
              ? 'text-blue-900 dark:text-blue-100 border-r-4 border-yellow-500 bg-slate-100 dark:bg-slate-800' 
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-blue-800 dark:hover:text-blue-200'
          }`}
        >
          <LayoutDashboard className="mr-3" size={20} />
          <span className="text-sm">Dashboard</span>
        </Link>
        <Link 
          to="/analytics"
          className={`flex items-center px-6 py-3 font-medium transition-all ${
            isActive('/analytics') 
              ? 'text-blue-900 dark:text-blue-100 border-r-4 border-yellow-500 bg-slate-100 dark:bg-slate-800' 
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-blue-800 dark:hover:text-blue-200'
          }`}
        >
          <BarChart3 className="mr-3" size={20} />
          <span className="text-sm">Analytics</span>
        </Link>
        <Link 
          to="/alerts"
          className={`flex items-center px-6 py-3 font-medium transition-all ${
            isActive('/alerts') 
              ? 'text-blue-900 dark:text-blue-100 border-r-4 border-yellow-500 bg-slate-100 dark:bg-slate-800' 
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-blue-800 dark:hover:text-blue-200'
          }`}
        >
          <AlertTriangle className="mr-3" size={20} />
          <span className="text-sm">Alerts</span>
        </Link>
        <Link 
          to="/settings"
          className={`flex items-center px-6 py-3 font-medium transition-all ${
            isActive('/settings') 
              ? 'text-blue-900 dark:text-blue-100 border-r-4 border-yellow-500 bg-slate-100 dark:bg-slate-800' 
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-blue-800 dark:hover:text-blue-200'
          }`}
        >
          <SettingsIcon className="mr-3" size={20} />
          <span className="text-sm">Settings</span>
        </Link>
        <Link 
          to="/admin"
          className={`flex items-center px-6 py-3 font-medium transition-all ${
            isActive('/admin') 
              ? 'text-blue-900 dark:text-blue-100 border-r-4 border-yellow-500 bg-slate-100 dark:bg-slate-800' 
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-blue-800 dark:hover:text-blue-200'
          }`}
        >
          <Shield className="mr-3" size={20} />
          <span className="text-sm">Admin</span>
        </Link>
      </nav>
      
      <div className="px-6 mt-auto">
        <Link to="/onboarding" className="w-full bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-xl py-3 text-sm font-bold shadow-md active:opacity-80 transition-all block text-center">
          New Installation
        </Link>
        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 space-y-1">
          <a className="flex items-center py-2 text-slate-600 dark:text-slate-400 hover:text-blue-800 dark:hover:text-blue-200" href="#">
            <HeadphonesIcon className="mr-3" size={20} />
            <span className="text-sm font-medium">Support</span>
          </a>
          <a className="flex items-center py-2 text-slate-600 dark:text-slate-400 hover:text-blue-800 dark:hover:text-blue-200" href="#">
            <LogOut className="mr-3" size={20} />
            <span className="text-sm font-medium">Logout</span>
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

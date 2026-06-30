import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BarChart3, AlertTriangle, Settings as SettingsIcon, Shield, LogOut, HeadphonesIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import BrandLogo from '../common/BrandLogo.jsx';

const getSelectedPanelId = (pathname) => {
  const [, section, panelId] = pathname.split('/');

  return ['dashboard', 'analytics', 'alerts'].includes(section) && panelId
    ? panelId
    : null;
};

const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const isAdmin = user?.role === 'admin';
  const selectedPanelId = getSelectedPanelId(location.pathname);
  const analyticsPath = selectedPanelId ? `/analytics/${selectedPanelId}` : '/analytics';
  const alertsPath = selectedPanelId ? `/alerts/${selectedPanelId}` : '/alerts';
  
  const isActive = (path) => (
    ['/dashboard', '/analytics', '/alerts'].includes(path)
      ? location.pathname.startsWith(path)
      : location.pathname === path
  );

  return (
    <aside className="hidden md:flex h-screen w-64 fixed left-0 top-0 bg-slate-50 dark:bg-slate-900 flex-col py-6 border-r border-slate-100 dark:border-slate-800 z-50">
      <BrandLogo subtitle="Management Console" className="px-6 mb-8" />
      
      <nav className="flex-1 space-y-1">
        <Link 
          to="/dashboard"
          className={`flex items-center px-6 py-3 font-medium transition-all ${
            isActive('/dashboard') 
              ? 'text-blue-900 dark:text-blue-100 border-r-4 border-yellow-500 bg-slate-100 dark:bg-slate-800' 
              : 'text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-800 dark:hover:text-blue-200 hover:shadow-sm'
          }`}
        >
          <LayoutDashboard className="mr-3" size={20} />
          <span className="text-sm">Dashboard</span>
        </Link>
        <Link 
          to={analyticsPath}
          className={`flex items-center px-6 py-3 font-medium transition-all ${
            isActive('/analytics') 
              ? 'text-blue-900 dark:text-blue-100 border-r-4 border-yellow-500 bg-slate-100 dark:bg-slate-800' 
              : 'text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-800 dark:hover:text-blue-200 hover:shadow-sm'
          }`}
        >
          <BarChart3 className="mr-3" size={20} />
          <span className="text-sm">Analytics</span>
        </Link>
        <Link 
          to={alertsPath}
          className={`flex items-center px-6 py-3 font-medium transition-all ${
            isActive('/alerts') 
              ? 'text-blue-900 dark:text-blue-100 border-r-4 border-yellow-500 bg-slate-100 dark:bg-slate-800' 
              : 'text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-700 dark:hover:text-red-300 hover:shadow-sm'
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
              : 'text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-blue-950/20 hover:text-blue-800 dark:hover:text-blue-200 hover:shadow-sm'
          }`}
        >
          <SettingsIcon className="mr-3" size={20} />
          <span className="text-sm">Settings</span>
        </Link>
        {isAdmin && (
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
        )}
      </nav>
      
      <div className="px-6 mt-auto">
        <Link to="/onboarding" className="w-full bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-xl py-3 text-sm font-bold shadow-md hover:shadow-xl hover:shadow-blue-600/25 hover:-translate-y-0.5 active:scale-95 transition-all block text-center">
          New Installation
        </Link>
        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 space-y-1">
          <a className="flex items-center py-2 text-slate-600 dark:text-slate-400 hover:text-blue-800 dark:hover:text-blue-200" href="#">
            <HeadphonesIcon className="mr-3" size={20} />
            <span className="text-sm font-medium">Support</span>
          </a>
          <button
            onClick={logout}
            className="flex items-center py-2 px-2 -mx-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/20 hover:shadow-sm active:scale-[0.98] transition-all w-full"
          >
            <LogOut className="mr-3" size={20} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

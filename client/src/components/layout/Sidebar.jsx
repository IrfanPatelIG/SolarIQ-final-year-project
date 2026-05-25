import React from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { LayoutDashboard, BarChart3, AlertTriangle, Settings as SettingsIcon, Shield, LogOut, HeadphonesIcon, Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import BrandLogo from '../common/BrandLogo.jsx';
import UserAvatar from '../common/UserAvatar.jsx';

const sectionLabelClass = "px-6 pt-5 pb-2 text-[11px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500";
const navItemBaseClass = "group mx-3 flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold transition-all";

const getNavItemClass = (active, tone = 'blue') => {
  if (active) {
    return `${navItemBaseClass} bg-white dark:bg-slate-800 text-blue-900 dark:text-blue-100 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700 border-l-4 border-yellow-500`;
  }

  const hoverClass = tone === 'red'
    ? 'hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-700 dark:hover:text-red-300'
    : 'hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-800 dark:hover:text-blue-200';

  return `${navItemBaseClass} text-slate-600 dark:text-slate-400 ${hoverClass}`;
};

const Sidebar = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { user, logout } = useAuth();
  const isAdmin = user?.role === 'admin';
  const currentDashboardTab = searchParams.get('tab') || 'dashboard';
  const dashboardBasePath = location.pathname.startsWith('/dashboard/')
    ? location.pathname
    : '/dashboard';
  
  const isDashboardTabActive = (tab) => (
    location.pathname.startsWith('/dashboard') && currentDashboardTab === tab
  );

  const isActive = (path) => location.pathname === path;
  const displayName = user?.name || user?.fullName || 'User';
  const displayEmail = user?.email || '';

  return (
    <aside className="hidden md:flex h-screen w-64 fixed left-0 top-0 bg-slate-50 dark:bg-slate-900 flex-col py-6 border-r border-slate-200 dark:border-slate-800 z-50">
      <BrandLogo subtitle="Management Console" className="px-6 mb-5" />
      
      <nav className="flex-1 overflow-y-auto pb-4">
        <p className={sectionLabelClass}>Main</p>
        <Link 
          to={`${dashboardBasePath}?tab=dashboard`}
          className={getNavItemClass(isDashboardTabActive('dashboard'))}
        >
          <LayoutDashboard className="shrink-0" size={20} />
          <span className="text-sm">Dashboard</span>
        </Link>
        <Link 
          to={`${dashboardBasePath}?tab=analytics`}
          className={getNavItemClass(isDashboardTabActive('analytics'))}
        >
          <BarChart3 className="shrink-0" size={20} />
          <span className="text-sm">Analytics</span>
        </Link>
        <Link 
          to={`${dashboardBasePath}?tab=alerts`}
          className={getNavItemClass(isDashboardTabActive('alerts'), 'red')}
        >
          <AlertTriangle className="shrink-0" size={20} />
          <span className="text-sm">Alerts</span>
          <span className="ml-auto rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-black text-white">2</span>
        </Link>

        <p className={sectionLabelClass}>System</p>
        <Link
          to="/onboarding"
          className="mx-3 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 px-4 py-3 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-600/25 active:scale-95"
        >
          <Plus size={18} />
          New Installation
        </Link>

        <p className={sectionLabelClass}>Account</p>
        <Link 
          to="/settings"
          className={getNavItemClass(isActive('/settings'))}
        >
          <SettingsIcon className="shrink-0" size={20} />
          <span className="text-sm">Settings</span>
        </Link>
        {isAdmin && (
          <Link 
            to="/admin"
            className={getNavItemClass(isActive('/admin'))}
          >
            <Shield className="shrink-0" size={20} />
            <span className="text-sm">Admin</span>
          </Link>
        )}
      </nav>
      
      <div className="px-3 mt-auto">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/40 p-3">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
            <UserAvatar user={user} className="border-2 border-blue-600" />
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-slate-900 dark:text-slate-100">{displayName}</p>
              {displayEmail && (
                <p className="truncate text-xs text-slate-500 dark:text-slate-400">{displayEmail}</p>
              )}
            </div>
          </div>
          <a className="mt-3 flex items-center rounded-lg px-2 py-2 text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-800 dark:hover:text-blue-200" href="#">
            <HeadphonesIcon className="mr-3" size={18} />
            <span className="text-sm font-medium">Support</span>
          </a>
          <button
            onClick={logout}
            className="flex items-center rounded-lg px-2 py-2 text-slate-600 dark:text-slate-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/20 active:scale-[0.98] transition-all w-full"
          >
            <LogOut className="mr-3" size={18} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

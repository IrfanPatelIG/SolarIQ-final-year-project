import React, { useState } from 'react';
import { Settings as SettingsIcon, User, Bell, Shield, Eye, EyeOff, Edit, ChevronRight } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
  const { user } = useAuth();
  const [fullName, setFullName] = useState(user?.fullName || 'Alex Rivera');
  const [email, setEmail] = useState(user?.email || 'alex.rivera@solariq.io');
  return (
    <Layout>
      <div className="p-8 max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 mb-2">Account Settings</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Manage your solar observatory preferences and security.</p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Settings Card */}
          <section className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 transition-all">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-10">
              <div className="relative group">
                <div className="w-32 h-32 rounded-xl overflow-hidden shadow-lg">
                  <img 
                    alt="Alex Rivera Profile" 
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfKVrqGJCoAYKGrfx9fHC2ZsTpLgGRgYDqjcbcpKkhJ-NlhZ-GGaz0trlfO5QcpQUu2oFcHSjVpCVsWZy-atLWQmDAdL5Aibve3Lnu1mOTIyPhp-AOR7wOMYHPr3LQj-j7uQ7glThNaGtJLyMYTnIG5VvxKmkKR2xnXbv7mHs0mQBhAaC3AHd9xN55HnGOwa02PUvIwRtk3c71unUQ21yEjbJ5YZKtDKQs9gF6YrYWvvJjspFSP4S_6DranY1Kj1oWPvKv4wnokMlM"
                  />
                </div>
                <button className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-lg shadow-xl active:scale-90 transition-transform">
                  <Edit size={16} />
                </button>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">{user?.fullName || 'Alex Rivera'}</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-4">{user?.email || 'alex.rivera@solariq.io'}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-yellow-500 text-slate-900 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider">System Admin</span>
                  <span className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider">North Sector Node</span>
                </div>
              </div>
              <button className="px-6 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 font-bold rounded-xl transition-all">
                Edit Profile
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 ml-1">Full Name</label>
                <input 
                  className="w-full bg-slate-100 dark:bg-slate-800 border-b-2 border-slate-300 dark:border-slate-600 focus:border-yellow-500 dark:focus:border-yellow-400 focus:ring-0 transition-all px-4 py-3 rounded-t-lg text-slate-900 dark:text-slate-100" 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 ml-1">Email Address</label>
                <input 
                  className="w-full bg-slate-100 dark:bg-slate-800 border-b-2 border-slate-300 dark:border-slate-600 focus:border-yellow-500 dark:focus:border-yellow-400 focus:ring-0 transition-all px-4 py-3 rounded-t-lg text-slate-900 dark:text-slate-100" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* Notification Preferences Card */}
          <section className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col">
            <div className="flex items-center gap-3 mb-8">
              <Bell className="text-yellow-500" size={24} />
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Notifications</h3>
            </div>
            <div className="space-y-8 flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900 dark:text-slate-100">Email Alerts</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Real-time solar status updates</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input defaultChecked className="sr-only peer" type="checkbox"/>
                  <div className="w-11 h-6 bg-slate-300 dark:bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900 dark:text-slate-100">Critical Warnings</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">System failure & grid drops</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input defaultChecked className="sr-only peer" type="checkbox"/>
                  <div className="w-11 h-6 bg-slate-300 dark:bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900 dark:text-slate-100">Weekly Digest Reports</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Performance summary on Sundays</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input className="sr-only peer" type="checkbox"/>
                  <div className="w-11 h-6 bg-slate-300 dark:bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
            <button className="mt-10 w-full text-blue-600 dark:text-blue-400 font-bold text-sm hover:underline flex items-center justify-center gap-2 group">
              Manage all channels
              <ChevronRight className="group-hover:translate-x-1 transition-transform" size={16} />
            </button>
          </section>

          {/* Security / Password Card */}
          <section className="lg:col-span-3 bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <Shield className="text-blue-600 dark:text-blue-400" size={24} />
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Security & Access</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 ml-1">Current password</label>
                <div className="relative">
                  <input 
                    className="w-full bg-slate-100 dark:bg-slate-800 border-b-2 border-slate-300 dark:border-slate-600 focus:border-yellow-500 dark:focus:border-yellow-400 focus:ring-0 transition-all px-4 py-3 rounded-t-lg text-slate-900 dark:text-slate-100" 
                    placeholder="••••••••" 
                    type="password"
                  />
                  <EyeOff className="absolute right-4 top-3 text-slate-400 cursor-pointer" size={20} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 ml-1">New password</label>
                <input 
                  className="w-full bg-slate-100 dark:bg-slate-800 border-b-2 border-slate-300 dark:border-slate-600 focus:border-yellow-500 dark:focus:border-yellow-400 focus:ring-0 transition-all px-4 py-3 rounded-t-lg text-slate-900 dark:text-slate-100" 
                  placeholder="Min. 12 characters" 
                  type="password"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 ml-1">Confirm password</label>
                <input 
                  className="w-full bg-slate-100 dark:bg-slate-800 border-b-2 border-slate-300 dark:border-slate-600 focus:border-yellow-500 dark:focus:border-yellow-400 focus:ring-0 transition-all px-4 py-3 rounded-t-lg text-slate-900 dark:text-slate-100" 
                  placeholder="Repeat new password" 
                  type="password"
                />
              </div>
            </div>
            <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-lg italic">
                Note: Changing your password will log you out of all active devices. Two-factor authentication is recommended for enhanced solar asset protection.
              </p>
              <button className="w-full md:w-auto bg-gradient-to-br from-blue-600 to-blue-800 text-white px-10 py-4 rounded-xl font-bold shadow-lg hover:shadow-blue-500/20 active:scale-95 transition-all">
                Update Password
              </button>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;

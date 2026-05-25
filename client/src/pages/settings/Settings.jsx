import React, { useState } from 'react';
import { Bell, Check, Edit } from 'lucide-react';
import Layout from '../../components/layout/Layout';
import { useAuth } from '../../context/AuthContext';
import UserAvatar, { AVATAR_OPTIONS } from '../../components/common/UserAvatar.jsx';

const Settings = () => {
  const { user, updateUser } = useAuth();
  const [fullName, setFullName] = useState(user?.name || 'User Name');
  const [email, setEmail] = useState(user?.email || 'user@example.com');
  const [selectedAvatarId, setSelectedAvatarId] = useState(user?.avatarId || 'solar-blue');

  const handleAvatarSelect = (avatarId) => {
    setSelectedAvatarId(avatarId);
    updateUser({ avatarId });
  };

  const handleProfileSave = () => {
    updateUser({
      name: fullName,
      email,
    });
  };

  return (
    <Layout>
      <div className="p-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 mb-2">Account Settings</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Manage your solar observatory preferences and security.</p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Settings Card */}
          <section className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 transition-all">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-10">
              <div className="relative group">
                <UserAvatar user={{ ...user, avatarId: selectedAvatarId }} size="lg" />
                <button className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-lg shadow-xl active:scale-90 transition-transform">
                  <Edit size={16} />
                </button>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">{user?.name || 'User Name'}</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-4">{user?.email || 'user@example.com'}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-yellow-500 text-slate-900 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider">{user?.role || 'User'}</span>
                </div>
              </div>
              <button
                onClick={handleProfileSave}
                className="px-6 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/20 hover:text-blue-700 dark:hover:text-blue-300 hover:shadow-lg active:scale-95 text-slate-900 dark:text-slate-100 font-bold rounded-xl transition-all"
              >
                Save Profile
              </button>
            </div>
            <div className="mb-10">
              <h4 className="text-sm font-bold uppercase text-slate-500 dark:text-slate-400 mb-4">Choose Avatar</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {AVATAR_OPTIONS.map((avatar) => {
                  const isSelected = selectedAvatarId === avatar.id;

                  return (
                    <button
                      key={avatar.id}
                      type="button"
                      onClick={() => handleAvatarSelect(avatar.id)}
                      className={`relative p-3 rounded-xl border transition-all text-left ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/30'
                          : 'border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/20 hover:shadow-md hover:-translate-y-0.5'
                      }`}
                    >
                      <UserAvatar user={{ avatarId: avatar.id }} className="mx-auto mb-3" />
                      <span className="block text-xs font-bold text-center text-slate-700 dark:text-slate-300">{avatar.label}</span>
                      {isSelected && (
                        <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                          <Check size={14} />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
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
                  <p className="text-xs text-slate-500 dark:text-slate-400">Real-time solar status</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input defaultChecked className="sr-only peer" type="checkbox"/>
                  <div className="w-11 h-6 bg-slate-300 dark:bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900 dark:text-slate-100">Critical Warnings</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">System failures</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input defaultChecked className="sr-only peer" type="checkbox"/>
                  <div className="w-11 h-6 bg-slate-300 dark:bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;

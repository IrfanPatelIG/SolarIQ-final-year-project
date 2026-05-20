import React from 'react';
import { Shield } from 'lucide-react';
import Layout from '../../components/layout/Layout';

const Admin = () => {
  return (
    <Layout>
      <div className="p-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">Admin Panel</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">System administration and user management</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Shield className="text-slate-400 mx-auto mb-4" size={64} />
              <p className="text-slate-500 dark:text-slate-400">Admin page - Coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;

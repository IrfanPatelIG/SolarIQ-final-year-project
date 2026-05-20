import React from 'react';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar />
      <main className="md:ml-64 min-h-screen">
        <TopNavbar />
        {children}
      </main>
    </div>
  );
};

export default Layout;

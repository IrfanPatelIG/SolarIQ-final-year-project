import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import BrandLogo from './BrandLogo.jsx';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const setupLink = isAuthenticated ? '/onboarding' : '/auth';
  const setupLabel = isAuthenticated ? 'Setup' : 'Get Started';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200 px-6 py-4 flex justify-between items-center transition-all duration-300">
      <BrandLogo />

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center space-x-8">
        <li>
          <Link to="/" className="text-slate-600 hover:text-blue-600 transition font-medium">Home</Link>
        </li>
        <li>
          <Link to={setupLink} className="text-slate-600 hover:text-blue-600 transition font-medium">{setupLabel}</Link>
        </li>
        <li>
          <Link to="/contact" className="text-slate-600 hover:text-blue-600 transition font-medium">Contact</Link>
        </li>
        {isAuthenticated && (
          <>
            <li>
              <Link to="/dashboard" className="text-slate-600 hover:text-blue-600 transition font-medium">Dashboard</Link>
            </li>
            <li>
              <button onClick={logout} className="bg-red-500 text-white px-5 py-2 rounded-full font-medium hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/30 hover:-translate-y-0.5 active:scale-95 transition-all">
                Logout
              </button>
            </li>
          </>
        )}
        {!isAuthenticated && (
          <li>
            <Link to="/auth" className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-5 py-2 rounded-full font-medium hover:shadow-lg transition-all">
              Sign In
            </Link>
          </li>
        )}
      </ul>

      {/* Hamburger Button */}
      <button
        className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-slate-100 transition"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} className="text-slate-900" /> : <Menu size={24} className="text-slate-900" />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-lg p-6 flex flex-col items-center space-y-4 md:hidden">
          <Link to="/" className="text-slate-600 hover:text-blue-600 transition font-medium" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link to={setupLink} className="text-slate-600 hover:text-blue-600 transition font-medium" onClick={() => setIsOpen(false)}>
            {setupLabel}
          </Link>
          <Link to="/contact" className="text-slate-600 hover:text-blue-600 transition font-medium" onClick={() => setIsOpen(false)}>
            Contact
          </Link>
          {isAuthenticated && (
            <>
              <Link to="/dashboard" className="text-slate-600 hover:text-blue-600 transition font-medium" onClick={() => setIsOpen(false)}>
                Dashboard
              </Link>
              <button onClick={() => {logout(); setIsOpen(false);}} className="bg-red-500 text-white px-8 py-3 rounded-full font-medium w-full hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/30 active:scale-95 transition-all">
                Logout
              </button>
            </>
          )}
          {!isAuthenticated && (
            <Link to="/auth" className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-3 rounded-full font-medium w-full text-center" onClick={() => setIsOpen(false)}>
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

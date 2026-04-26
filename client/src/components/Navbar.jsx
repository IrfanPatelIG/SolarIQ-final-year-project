import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Menu, X, Sun } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200 px-6 py-4 flex justify-between items-center transition-all duration-300"
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
          <Sun className="text-white" size={20} />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900">SolarIQ</h1>
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center space-x-8">
        <li>
          <Link to="/" className="text-slate-600 hover:text-blue-600 transition font-medium">Home</Link>
        </li>
        <li>
          <Link to="/onboarding" className="text-slate-600 hover:text-blue-600 transition font-medium">Setup</Link>
        </li>
        <li>
          <Link to="/dashboard" className="text-slate-600 hover:text-blue-600 transition font-medium">Dashboard</Link>
        </li>
        <li>
          <Link to="/auth" className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-5 py-2 rounded-full font-medium hover:shadow-lg transition-all">
            Sign In
          </Link>
        </li>
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
          <Link to="/onboarding" className="text-slate-600 hover:text-blue-600 transition font-medium" onClick={() => setIsOpen(false)}>
            Setup
          </Link>
          <Link to="/dashboard" className="text-slate-600 hover:text-blue-600 transition font-medium" onClick={() => setIsOpen(false)}>
            Dashboard
          </Link>
          <Link to="/auth" className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-3 rounded-full font-medium" onClick={() => setIsOpen(false)}>
            Sign In
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

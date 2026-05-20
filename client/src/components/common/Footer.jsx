import React from "react";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-slate-900 text-slate-300 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">SolarIQ</h3>
            <p className="text-slate-400 mb-6 max-w-md">
              AI-powered solar energy management platform that helps you optimize your solar production and maximize your investment returns.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/onboarding" className="hover:text-white transition">Setup</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition">Dashboard</Link></li>
              <li><Link to="/analytics" className="hover:text-white transition">Analytics</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-400">© 2026 SolarIQ. All rights reserved.</p>
          <p className="text-sm text-slate-400">Built with ❤️ for sustainable energy</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

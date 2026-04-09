import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-black text-gray-400 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Top Question Line */}
        <p className="text-sm mb-6">
          Questions?{" "}
          <a href="#" className="hover:underline">
            Contact us.
          </a>
        </p>

        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-sm">
          <a href="#" className="hover:underline">
            FAQ
          </a>
          <a href="#" className="hover:underline">
            Account
          </a>
          <a href="#" className="hover:underline">
            Privacy & Policy
          </a>
          <a href="#" className="hover:underline">
            Contact Us
          </a>
        </div>

        {/* Language + Copyright */}
        <p className="text-sm mt-6">SolarIQ India</p>
        <p className="text-xs mt-2 text-gray-500">
          © {new Date().getFullYear()} SolarIQ
        </p>
      </div>
    </footer>
  );
};

export default Footer;

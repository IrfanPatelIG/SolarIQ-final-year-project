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
            Help Centre
          </a>
          <a href="#" className="hover:underline">
            Account
          </a>
          <a href="#" className="hover:underline">
            Media Centre
          </a>
          <a href="#" className="hover:underline">
            Investor Relations
          </a>
          <a href="#" className="hover:underline">
            Jobs
          </a>
          <a href="#" className="hover:underline">
            Ways to Watch
          </a>
          <a href="#" className="hover:underline">
            Terms of Use
          </a>
          <a href="#" className="hover:underline">
            Privacy
          </a>
          <a href="#" className="hover:underline">
            Cookie Preferences
          </a>
          <a href="#" className="hover:underline">
            Corporate Information
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

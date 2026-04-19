import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-[80%] 
                 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl 
                 shadow-lg px-6 py-3 flex justify-between items-center text-white transition-all duration-300"
    >
      {/* Logo */}
      <h1 className="text-xl font-semibold tracking-wide">SolarIQ</h1>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-8">
        <li>
          <a href="#home" className="hover:text-cyan-400 transition">
            Home
          </a>
        </li>
        <li>
          <a href="#setup" className="hover:text-cyan-400 transition">
            Setup
          </a>
        </li>
        <li>
          <a href="#contact" className="hover:text-cyan-400 transition">
            Contact us
          </a>
        </li>
      </ul>

      {/* Hamburger Button */}
      <button
        className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/10 transition"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {/* Mobile Menu */}
      <div
        className={`absolute top-full left-0 w-full mt-3 bg-white/10 backdrop-blur-lg rounded-2xl 
                    border border-white/20 shadow-lg p-6 flex flex-col items-center space-y-4
                    transition-all duration-300 ease-in-out md:hidden
                    ${
                      isOpen
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible -translate-y-2"
                    }`}
      >
        <a
          href="#home"
          className="hover:text-cyan-400 transition"
          onClick={() => setIsOpen(false)}
        >
          Home
        </a>
        <a
          href="#Setup"
          className="hover:text-cyan-400 transition"
          onClick={() => setIsOpen(false)}
        >
          About
        </a>
        <a
          href="#footer"
          className="hover:text-cyan-400 transition"
          onClick={() => setIsOpen(false)}
        >
          Contact
        </a>
      </div>
    </nav>
  );
};

export default Navbar;

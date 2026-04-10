import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-[85%]
      bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl
      shadow-lg px-6 py-4 flex justify-between items-center text-white"
    >
      {/* Logo */}
      <h1 className="text-2xl font-semibold tracking-wide flex items-center gap-2">
        SolarIQ <span className="text-[#FFC107]">⚡</span>
      </h1>

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center space-x-8">
        <li>
          <a href="#home" className="hover:text-[#FFC107] transition">
            Home
          </a>
        </li>
        <li>
          <a href="#setup" className="hover:text-[#FFC107] transition">
            Setup
          </a>
        </li>
        <li>
          <a href="#contact" className="hover:text-[#FFC107] transition">
            Contact
          </a>
        </li>

        {/* CTA */}
        <li>
          <a
            href="#setup"
            className="bg-[#FFC107] text-black px-5 py-2 rounded-full font-semibold hover:bg-black hover:text-[#FFC107] transition-all duration-300 hover:scale-102"
          >
            Get Started
          </a>
        </li>
      </ul>

      {/* Hamburger */}
      <button
        className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/10 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-2xl">☰</span>
      </button>

      {/* Mobile Menu */}
      <div
        className={`absolute top-full left-0 w-full mt-3 bg-black/60 backdrop-blur-lg rounded-2xl 
        border border-white/20 shadow-lg p-6 flex flex-col items-center space-y-4
        transition-all duration-300 md:hidden font-bold
        ${
          isOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-2"
        }`}
      >
        <a onClick={() => setIsOpen(false)} href="#home">
          Home
        </a>
        <a onClick={() => setIsOpen(false)} href="#setup">
          Setup
        </a>
        <a onClick={() => setIsOpen(false)} href="#contact">
          Contact
        </a>

        {/* CTA */}
        <a
          href="/setup"
          className="bg-[#FFC107] text-black px-6 py-2 rounded-full font-semibold mt-2"
        >
          Get Started
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
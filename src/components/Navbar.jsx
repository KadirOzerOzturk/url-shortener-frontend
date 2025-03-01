import React, { useEffect, useState } from "react";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {/* Navbar */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-4 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md" : ""
        }`}
      >
        {/* Logo */}
        <a
          href="/"
          className="font-bold text-4xl tracking-wide mx-4 bg-gradient-to-r from-purple-700 to-[#FBD8C4]  inline-block text-transparent bg-clip-text"
        >
          Shorterly
        </a>

        {/* Desktop Menu */}
        <div className="hidden sm:flex space-x-8">
          <a href="/" className="hover:text-gray-500 px-3 py-2 rounded-full">
            Home
          </a>
          <a
            href="/qr-generator"
            className="hover:text-gray-500 px-3 py-2 rounded-full"
          >
            QR Code Generator
          </a>
          <a href="/contact" className="hover:text-gray-500 px-3 py-2 rounded-full">
            Contact
          </a>
        </div>

        {/* Desktop Login/Register Buttons */}
        <div className="hidden sm:flex space-x-2">
          <a href="/" className="rounded-xl bg-gray-800 text-white px-6 py-2">
            Login
          </a>
          <a href="/" className="rounded-xl bg-[#144EE3] px-6 py-2 text-white">
            Register Now
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="sm:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-800 focus:outline-none"
          >
            {menuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`sm:hidden fixed top-16 left-0 right-0 bg-white shadow-md transition-all duration-300 ${
          menuOpen ? "max-h-96 opacity-100 z-50" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col space-y-4 py-4 px-8">
          <a href="/" className="hover:text-gray-500 px-3 py-2">
            Home
          </a>
          <a href="/qr-generator" className="hover:text-gray-500 px-3 py-2">
            QR Code Generator
          </a>
          <a href="/contact" className="hover:text-gray-500 px-3 py-2">
            Contact
          </a>
          <hr />
          <a href="/" className="rounded-lg bg-gray-800 text-white px-6 py-2 text-center">
            Login
          </a>
          <a href="/" className="rounded-lg bg-[#144EE3] text-white px-6 py-2 text-center">
            Register Now
          </a>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

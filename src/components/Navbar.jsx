import React, { useEffect, useState } from "react";

function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 50) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);
  return (
    <div className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-4 transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : ""}`}>	
      <a
        href="/"
        className="font-bold text-4xl tracking-wide mx-14 bg-gradient-to-r from-purple-700 via-[#144EE3] to-indigo-200 inline-block text-transparent bg-clip-text"
      >
        Link
      </a>
      <div className="flex space-x-8">
        <a href="/" className="hover:text-gray-500 px-3 py-2 rounded-full">
          Home
        </a>
        <a href="/qr-generator" className="hover:text-gray-500 px-3 py-2 rounded-full">
          QR Code Generator
        </a>
        <a href="/" className="hover:text-gray-500 px-3 py-2 rounded-full">
          Contact
        </a>
      </div>
      <div className="flex space-x-2">
        <a href="/" className="rounded-xl bg-gray-800 text-white px-6 py-2">
          Login
        </a>
        <a href="/" className="rounded-xl bg-[#144EE3] px-6 py-2">
          Register Now
        </a>
      </div>
    </div>
  );
}

export default Navbar;

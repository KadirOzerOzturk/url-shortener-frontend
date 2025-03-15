import React from 'react';

function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-white text-center py-4">
      <p className="text-sm">&copy; {new Date().getFullYear()} Shorterly. All rights reserved.</p>
    </footer>
  );
}

export default Footer;

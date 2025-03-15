import React from 'react';

function Footer() {
  return (
    <footer className="mt-auto w-full text-center py-4 bg-gray-200">
      <p className="text-sm">&copy; {new Date().getFullYear()} Shorterly. All rights reserved.</p>
    </footer>
  );
}

export default Footer;

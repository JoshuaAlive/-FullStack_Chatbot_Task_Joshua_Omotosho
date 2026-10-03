import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-gray-400">© {new Date().getFullYear()} DroneTV AI Support & Lead Assistant. All rights reserved.</p>
        <p className="text-gray-500 text-sm mt-2">Built for IPAGE Group Internship Assignment</p>
      </div>
    </footer>
  );
};

export default Footer;

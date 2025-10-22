import React from 'react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-blue-800 py-6 text-center text-white">
      <p className="text-lg">&copy; 2025 Feeding Futures. All rights reserved.</p>
      <div className="mt-4">
        <a
          href="mailto:contact@feedingfutures.org"
          className="hover:text-gray-300 transition-colors duration-200"
        >
          contact@feedingfutures.org
        </a>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useContext } from "react";
import { AppContext } from "./AppContext";

const Footer = () => {
  const { isDarkMode } = useContext(AppContext); // ✅ get value from context

  return (
    <footer
      className={`text-sm py-3 px-4 md:px-8 border-t transition-colors duration-300 ${
        isDarkMode
          ? "bg-slate-900 border-slate-700 text-gray-400"
          : "bg-gradient-to-b from-slate-50 to-sky-50 bg-gradient-to-l from-indigo-50 to-sky-100 text-sky-900 border-sky-900"
      }`}
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Logo / Title */}
        <h2 className={`text-2xl font-semibold ${isDarkMode?'text-slate-200':'text-sky-900'}`}>
          Feeding <span className="text-green-500">Futures</span>
        </h2>

        <div className="text-center text-sm">
          © 2025 Feeding Futures - All rights reserved.
        </div>

        {/* Social Links */}
        <div className="flex space-x-4 gap-3">
          <a href="https://www.facebook.com/">
            <img className="w-7" src="img/facebook.png" alt="Facebook" />
          </a>
          <a href="https://www.instagram.com/">
            <img className="w-7" src="img/instagram.png" alt="Instagram" />
          </a>
          <a href="https://www.youtube.com/">
            <img className="w-7" src="img/youtube.png" alt="Youtube" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

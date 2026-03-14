import React, { useContext } from "react";
import { AppContext } from "./AppContext";
import { FaGithub, FaInstagram, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  const { isDarkMode } = useContext(AppContext);
  const currentYear = new Date().getFullYear();
  const socialIconClass = isDarkMode
    ? "rounded-full border border-emerald-300/35 bg-cyan-100/5 p-2 text-cyan-50 shadow-[0_8px_18px_rgba(20,184,166,0.15)] transition hover:-translate-y-0.5 hover:text-emerald-300"
    : "rounded-full border border-sky-300/70 bg-white/85 p-2 text-sky-700 shadow-[0_8px_16px_rgba(14,116,144,0.12)] transition hover:-translate-y-0.5 hover:text-emerald-600 hover:border-emerald-400/80";

  return (
    <footer
      className={`text-sm py-3 px-4 md:px-8 border-t transition-all duration-300 ${
        isDarkMode
          ? "bg-slate-900 border-slate-700 text-gray-400"
          : "bg-gradient-to-l from-indigo-50 to-sky-100 text-sky-900 border-sky-900"
      }`}
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className={`admin-fade-up text-2xl font-semibold ${isDarkMode ? "text-slate-200" : "text-sky-900"}`}>
          Feeding <span className="text-green-500">Futures</span>
        </h2>

        <div className="admin-fade-up text-center text-sm leading-tight">
          <p>&copy; {currentYear} Feeding Futures - All rights reserved.</p>
          <p className="mt-1 text-[0.82rem] italic opacity-95">
            Track the food, plan the share - creating smiles everywhere❤️
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://www.instagram.com/namanmahajan_17/"
            target="_blank"
            rel="noreferrer"
            className={socialIconClass}
            aria-label="Instagram"
          >
            <FaInstagram className="h-5 w-5" />
          </a>
          <a
            href="mailto:mahajannaman2020@gmail.com"
            className={socialIconClass}
            aria-label="Email"
          >
            <FaEnvelope className="h-5 w-5" />
          </a>
          <a
            href="https://github.com/namanmahajan2020"
            target="_blank"
            rel="noreferrer"
            className={socialIconClass}
            aria-label="GitHub"
          >
            <FaGithub className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

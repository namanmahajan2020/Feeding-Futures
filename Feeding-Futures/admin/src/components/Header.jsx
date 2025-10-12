// Header.jsx
import React, { useContext } from 'react';
import { AppContext } from './AppContext'; // Assuming the context is exported

const Header = () => {
  const { isDarkMode } = useContext(AppContext);

  return (
    <header className={`sticky top-0 h-16 border-b flex items-center justify-between px-4 sm:px-6 z-20 shadow-sm 
      ${isDarkMode ? 'bg-slate-900 text-slate-100 border-slate-700' : 'bg-gradient-to-t from-green-50 to-blue-50 text-sky-900 border-sky-900'}`}>
      <div className="flex items-center space-x-2">

        <span className="text-2xl font-bold hidden sm:block">
          Feeding <b className="text-emerald-400">Futures</b>
        </span>

        <h1 className="text-2xl font-bold hidden sm:block">- Admin</h1>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm hidden sm:inline text-slate-600 dark:text-slate-300">Status: Logged In (No Auth)</span>
        <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold bg-emerald-600 text-white shadow-md">
          A
        </div>
      </div>
    </header>
  );
};

export default Header;

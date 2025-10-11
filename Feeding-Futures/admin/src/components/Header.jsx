// Header.jsx
import React, { useContext } from 'react';
import { Menu } from 'lucide-react';
import { AppContext } from './AppContext'; // Assuming the context is exported

const Header = () => {
  const { isDarkMode, setIsSidebarOpen } = useContext(AppContext);

  return (
    <header className={`sticky top-0 h-16 flex items-center justify-between px-4 sm:px-6 z-20 shadow-sm 
      ${isDarkMode ? 'bg-slate-800 text-slate-100' : 'bg-sky-50 text-sky-900'}`}>
      <div className="flex items-center space-x-4">
        <button onClick={() => setIsSidebarOpen(prev => !prev)} className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-sky-100'}`}>
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold hidden sm:block">ADMIN Dashboard</h1>
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

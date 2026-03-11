// Header.jsx
import React, { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from './AppContext'; // Assuming the context is exported

const Header = () => {
  const { isDarkMode } = useContext(AppContext);
  const [showProfileCard, setShowProfileCard] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileCard(false);
      }
    };

    const handleScroll = () => setShowProfileCard(false);

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("scroll", handleScroll, true);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  return (
    <header className={`sticky top-0 h-16 border-b flex items-center justify-between px-4 sm:px-6 z-20 shadow-sm backdrop-blur-sm transition-all duration-300 
      ${isDarkMode ? 'bg-slate-900 text-slate-100 border-slate-700' : 'bg-gradient-to-t from-green-50 to-blue-50 text-sky-900 border-sky-900'}`}>
      <div className="flex items-center space-x-2">
        <span className="text-lg font-bold sm:hidden">
          Feeding <b className="text-emerald-400">Futures</b> - Admin
        </span>
        <span className="text-2xl font-bold hidden sm:block">
          Feeding <b className="text-emerald-400">Futures</b>
        </span>

        <h1 className="text-2xl font-bold hidden sm:block">- Admin</h1>
      </div>
      <div className="relative flex items-center space-x-4" ref={profileRef}>
        <span className={`text-sm font-semibold hidden sm:inline ${isDarkMode ? "text-slate-100" : " text-slate-800"}`}>Status: Logged In -<span className='text-green-500'> Naman Mahajan</span></span>
        <button
          type="button"
          onClick={() => setShowProfileCard((prev) => !prev)}
          className="flex-none rounded-full leading-none"
          aria-label="Open profile details"
        >
          <img className='admin-glow w-10 h-10 rounded-full object-cover ring-2 ring-white/30' src="img/admin.png" alt="profile pic" />
        </button>

        {showProfileCard && (
          <div
            className={`absolute right-0 top-full mt-2 z-30 whitespace-nowrap rounded-xl border px-4 py-2 text-sm font-semibold shadow-lg ${
              isDarkMode
                ? "border-slate-700 bg-slate-800 text-slate-100"
                : "border-sky-200 bg-white text-sky-900"
            }`}
          >
            Naman Mahajan
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

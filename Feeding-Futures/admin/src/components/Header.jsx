// Header.jsx
import React, { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from './AppContext'; // Assuming the context is exported

const Header = () => {
  const { isDarkMode, setIsLoggedIn } = useContext(AppContext);
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const profileRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    document.body.classList.add("admin-logout-fade");
    window.setTimeout(() => {
      window.location.href = "https://feeding-futures-user.vercel.app/start";
    }, 220);
  };

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileCard(false);
        setShowLogoutConfirm(false);
      }
    };

    const handleScroll = () => {
      setShowProfileCard(false);
      setShowLogoutConfirm(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("scroll", handleScroll, true);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  useEffect(() => {
    if (!showProfileCard) return undefined;

    const timer = setTimeout(() => {
      setShowProfileCard(false);
      setShowLogoutConfirm(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [showProfileCard, showLogoutConfirm]);

  return (
    <header className={`sticky top-0 h-16 border-b flex items-center justify-between px-4 sm:px-6 z-20 shadow-sm backdrop-blur-sm transition-all duration-300 
      ${isDarkMode ? 'bg-slate-900 text-slate-100 border-slate-700' : 'bg-gradient-to-t from-green-50 to-blue-50 text-sky-900 border-sky-900'}`}>
      <div className="min-w-0 flex items-center space-x-2">
        <span className="text-[15px] font-bold whitespace-nowrap sm:hidden">
          Feeding <b className="text-emerald-400">Futures</b> - Admin
        </span>
        <span className="text-2xl font-bold hidden sm:block">
          Feeding <b className="text-emerald-400">Futures</b>
        </span>

        <h1 className="text-2xl font-bold hidden sm:block">- Admin</h1>
      </div>
      <div className="relative ml-2 flex shrink-0 items-center gap-3" ref={profileRef}>
        <span className={`hidden whitespace-nowrap text-sm font-semibold lg:inline ${isDarkMode ? "text-slate-100" : " text-slate-800"}`}>Status: Logged In -<span className='text-green-500'> Naman Mahajan</span></span>
        <button
          type="button"
          onClick={() => {
            setShowProfileCard((prev) => !prev);
            setShowLogoutConfirm(false);
          }}
          className="h-10 w-10 shrink-0 rounded-full border-0 p-0 leading-none transition-transform active:scale-95 focus:outline-none focus:ring-0"
          aria-label="Open profile details"
        >
          <img className='admin-glow w-10 h-10 rounded-full object-cover ring-2 ring-white/30' src="img/admin.png" alt="profile pic" />
        </button>

        {showProfileCard && (
          <div
            className={`absolute right-0 top-full mt-2 z-30 min-w-[190px] rounded-xl border px-4 py-3 text-sm font-semibold shadow-lg ${
              isDarkMode
                ? "border-slate-700 bg-slate-800 text-slate-100"
                : "border-sky-200 bg-white text-sky-900"
            }`}
          >
            <p className="text-sm font-semibold sm:hidden">Naman Mahajan</p>
            {!showLogoutConfirm ? (
              <button
                type="button"
                onClick={() => setShowLogoutConfirm(true)}
                className={`admin-interactive mt-2 w-full rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  isDarkMode
                    ? "bg-rose-500/20 text-rose-200 hover:bg-rose-500/30"
                    : "bg-rose-100 text-rose-700 hover:bg-rose-200"
                }`}
              >
                Logout
              </button>
            ) : (
              <div className="mt-2">
                <p className="text-xs font-medium opacity-90">Confirm logout?</p>
                <div className="mt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className={`admin-interactive flex-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                      isDarkMode
                        ? "bg-rose-500/25 text-rose-100 hover:bg-rose-500/35"
                        : "bg-rose-100 text-rose-700 hover:bg-rose-200"
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowLogoutConfirm(false);
                      setShowProfileCard(false);
                    }}
                    className={`admin-interactive flex-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                      isDarkMode
                        ? "bg-slate-700 text-slate-100 hover:bg-slate-600"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

import React, { useContext, useEffect, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Home, BarChart, Users, MessageSquare, Briefcase, Menu, Sun, Moon, LogOut } from 'lucide-react';
import { AppContext } from './AppContext';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const sidebarRef = useRef(null);
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const { isSidebarOpen, setIsSidebarOpen, isDarkMode, setIsDarkMode } = useContext(AppContext);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const navItems = [
    { name: 'Dashboard', icon: Home, path: '/dashboard' },
    { name: 'Donations', icon: Briefcase, path: '/donations' },
    { name: 'Feedback', icon: MessageSquare, path: '/feedback' },
    { name: 'Users', icon: Users, path: '/users' },
    { name: 'Analytics', icon: BarChart, path: '/analytics' },
  ];

  useEffect(() => {
    if (!isSidebarOpen || !isMobile) return;

    const closeSidebar = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    const closeOnScroll = () => {
      setIsSidebarOpen(false);
    };

    document.addEventListener("pointerdown", closeSidebar);
    document.addEventListener("scroll", closeOnScroll, true);

    return () => {
      document.removeEventListener("pointerdown", closeSidebar);
      document.removeEventListener("scroll", closeOnScroll, true);
    };
  }, [isSidebarOpen, isMobile, setIsSidebarOpen]);

  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname, isMobile, setIsSidebarOpen]);

  return (
    <nav ref={sidebarRef} className={`fixed top-0 left-0 border-r h-full ${isSidebarOpen ? 'w-56 md:w-64' : 'w-16 md:w-20'} 
      ${isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-gradient-to-r from-slate-50 to-sky-50 bg-gradient-to-b from-indigo-50 to-sky-100 text-sky-900 border-sky-800'}
      p-4 transition-all duration-300 z-30 shadow-xl md:shadow-none`}>

      <div className="flex items-center cursor-pointer overflow-hidden">
        <button
          onClick={() => setIsSidebarOpen(prev => !prev)}
          className={`admin-interactive flex w-full items-center rounded-xl ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-sky-100'} ${isSidebarOpen ? 'p-3' : 'p-2 md:p-3'}`}
        >
          <span className="flex w-8 justify-center shrink-0">
            <Menu className="w-6 h-6" />
          </span>
        </button>
      </div>

      <ul className="space-y-4 mt-10">
        {navItems.map(item => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `admin-interactive flex items-center p-3 rounded-xl transition duration-100 
                  ${isActive ? 'text-emerald-500' : 'hover:bg-sky-700 hover:text-white'}`
              }
              onClick={() => {
                if (isMobile) setIsSidebarOpen(false);
              }}
            >
              <span className="flex w-8 justify-center shrink-0">
                <item.icon className="w-8 h-6 shrink-0" />
              </span>
              <span className={`ml-4 text-lg font-medium overflow-hidden whitespace-nowrap ${isSidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'} transition-all duration-200`}>
                {item.name}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>

     <div className="absolute bottom-6 left-4 right-4 space-y-2">
  <div
    className={`admin-interactive flex items-center p-3 rounded-xl cursor-pointer
      ${isDarkMode ? 'hover:bg-slate-600' : 'hover:bg-sky-500 hover:text-white'}
      `}
    onClick={() => setIsDarkMode(prev => !prev)}
  >
    {/* Icon container with fixed width to prevent shift */}
    <div style={{ minWidth: '32px', display: 'flex', justifyContent: 'center' }}>
      {isDarkMode ? <Sun className="w-8 mr-2 h-6 text-yellow-300" /> : <Moon className="w-8 mr-2 h-6 text-black" />}
    </div>
    {/* Label with smooth opacity + width transition */}
    <span
      className="ml-2 text-base font-medium"
      style={{
        opacity: isSidebarOpen ? 1 : 0,
        width: isSidebarOpen ? 'auto' : 0,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        transition: 'opacity 0.3s ease, width 0.3s ease',
      }}
    >
      {isDarkMode ? 'Light Mode' : 'Dark Mode'}
    </span>
  </div>

  <button
    onClick={handleLogout}
    className={`admin-interactive flex items-center p-3 rounded-xl w-full
      ${isDarkMode ? 'hover:bg-red-700' : 'hover:bg-red-600 hover:text-white'}
      `}
  >
    <div style={{ minWidth: '32px', display: 'flex', justifyContent: 'center' }}>
      <LogOut className="w-8 h-6 mr-2 text-red-400" />
    </div>
    <span
      className="ml-2 text-base font-medium"
      style={{
        opacity: isSidebarOpen ? 1 : 0,
        width: isSidebarOpen ? 'auto' : 0,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        transition: 'opacity 0.3s ease, width 0.3s ease',
      }}
    >
      Logout
    </span>
  </button>
</div>

    </nav>
  );
};

export default Sidebar;

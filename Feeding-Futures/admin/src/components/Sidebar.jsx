import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom";
import { Home, BarChart, Users, MessageSquare, Briefcase, Menu, Sun, Moon, LogOut, Package, Mail } from 'lucide-react';
import { AppContext } from './AppContext'; // Assuming the context is exported

const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const { isSidebarOpen, setIsSidebarOpen, isDarkMode, activePage, setIsDarkMode } = useContext(AppContext);

  const navItems = [
    { name: 'Dashboard', icon: Home, path: '/dashboard' },
    { name: 'Donations', icon: Briefcase, path: '/donations' },
    { name: 'Feedback', icon: MessageSquare, path: '/feedback' },
    { name: 'Users', icon: Users, path: '/users' },
    { name: 'Analytics', icon: BarChart, path: '/analytics' },
  ];

  return (
    <nav className={`fixed top-0 left-0 border-r h-full ${isSidebarOpen ? 'w-64' : 'w-20'} 
      ${isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-gradient-to-r from-slate-50 to-sky-50 bg-gradient-to-b from-indigo-50 to-sky-100 text-sky-900 border-sky-800'}
      p-4 transition-all duration-300 z-30 shadow-xl md:shadow-none`}>

      <div className="flex items-center space-x-3 cursor-pointer overflow-hidden">
        <button onClick={() => setIsSidebarOpen(prev => !prev)} className={`${isSidebarOpen ? 'ml-1 p-3 rounded-xl pr-45' : 'p-3 '} rounded-lg ml-0 ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-sky-100'}`}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <ul className="space-y-4 mt-10">
        {navItems.map(item => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center p-3 rounded-xl transition duration-100 
                  ${isActive ? 'text-emerald-500' : 'hover:bg-sky-700 hover:text-white'}
                  ${isSidebarOpen ? '' : 'justify-center'}`
              }
            >
              <item.icon className="w-8 h-6 shrink-0" />
              <span className={`ml-4 text-lg font-medium ${isSidebarOpen ? 'opacity-100' : 'opacity-0 hidden'} transition-opacity duration-200`}>
                {item.name}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="absolute bottom-6 left-4 right-4">
        <div
          className={`flex items-center justify-between p-3 rounded-xl cursor-pointer 
            ${isDarkMode ? 'hover:bg-slate-600' : 'hover:bg-sky-500 hover:text-white'}`}
          onClick={() => setIsDarkMode(prev => !prev)}
        >
          <div className={`flex ${isSidebarOpen ? '' : 'w-full justify-left'}`}>
            {isDarkMode ? <Sun className="w-8 h-6 text-yellow-300" /> : <Moon className="w-8 h-6 text-black" />}
            <span className={`ml-4 text-base font-medium ${isSidebarOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className={`flex items-center p-3 rounded-xl w-full
    ${isDarkMode ? 'hover:bg-red-700' : 'hover:bg-red-600 hover:text-white'}
    ${isSidebarOpen ? '' : 'justify-center'}`}
        >
          <LogOut className="w-8 h-6 text-red-400" />
          <span className={`ml-4 text-base font-medium ${isSidebarOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
            Logout
          </span>
        </button>

      </div>
    </nav>
  );
};

export default Sidebar;

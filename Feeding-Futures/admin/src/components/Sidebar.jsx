// Sidebar.jsx
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BarChart, Users, MessageSquare, Briefcase, Menu, Sun, Moon, LogOut, Package, Mail } from 'lucide-react';
import { AppContext } from './AppContext'; // Assuming the context is exported

const Sidebar = () => {
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
      ${isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-sky-50 text-sky-900 border-sky-800'}
      p-4 transition-all duration-300 z-30 shadow-xl md:shadow-none`}>
      <div className="flex items-center space-x-3 cursor-pointer overflow-hidden">
        <button onClick={() => setIsSidebarOpen(prev => !prev)} className={`${isSidebarOpen ? 'ml-4 mt-3'  : 'p-3 '} rounded-lg ml-0 ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-sky-100'}`}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <ul className="space-y-4 mt-10">
        {navItems.map(item => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              className={`flex items-center p-3 rounded-xl transition duration-100 
                ${item.path === activePage ? 'text-blue-700' : 'hover:bg-sky-700 hover:text-white'}
                ${isSidebarOpen ? '' : 'justify-center'}`}
              activeclassname="bg-emerald-600 text-blue-700"
            >
              <item.icon className="w-8 h-6 shrink-0" />
              <span className={`ml-4 text-lg font-medium ${isSidebarOpen ? 'opacity-100' : 'opacity-0 hidden'} transition-opacity duration-300`}>
                {item.name}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>


      <div className="absolute bottom-6 left-4 right-4">
        <div
          className={`flex items-center justify-between p-3 rounded-xl cursor-pointer 
            ${isDarkMode ? ' hover:bg-slate-600' : ' hover:bg-sky-500'}`}
          onClick={() => setIsDarkMode(prev => !prev)}
        >
          <div className={`flex items-center ${isSidebarOpen ? '' : 'w-full justify-center'}`}>
            {isDarkMode ? <Sun className="w-6 h-6 text-yellow-300" /> : <Moon className="w-6 h-6 text-black" />}
            <span className={`ml-4 text-base font-medium ${isSidebarOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </span>
          </div>
        </div>
        <NavLink
          to="/logout"
          className={`flex items-center p-3 rounded-xl ${isDarkMode ? 'hover:bg-red-700' : 'hover:bg-red-600 hover:text-white'} ${isSidebarOpen ? '' : 'justify-center'}`}
        >
        <LogOut className="w-7  h-6 text-red-500"/>
          <span className={`ml-4 text-base font-medium ${isSidebarOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
            Logout
          </span>
        </NavLink>
      </div>
    </nav>
  );
};

export default Sidebar;

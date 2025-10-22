import React, { useState } from "react";
import {
  LogIn,
  UserPlus,
  Package,
  Map,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = ({ isLoggedIn = false, logout, userName = "", currentView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
     { name: "Orders", path: "/orders", icon: Package },
    { name: "History", path: "/past-orders", icon: Package },
    { name: "About Us", path: "/about", icon: Package },
      { name: "Contact", path: "/contact", icon: Map },
    { name: "Join Us", path: "/about", icon: UserPlus },
  ];

  const getLinkClass = (view) =>
    `text-gray-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center 
     ${view === currentView
       ? "bg-emerald-100 text-emerald-700 font-bold"
       : "hover:bg-gray-100 hover:text-emerald-700"}`;

  const getMobileLinkClass = (view) =>
    `block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center 
     ${view === currentView
       ? "bg-emerald-100 text-emerald-700 font-bold"
       : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-700"}`;

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div
            className="flex-shrink-0 text-2xl font-extrabold text-gray-800 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Feeding <b className="text-emerald-500">Futures</b>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-2 items-center">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={getLinkClass(item.name)}
              >
                <item.icon className="w-4 h-4 mr-1" />
                {item.name}
              </button>
            ))}

            {isLoggedIn && (
              <>
                <span className="text-sm font-semibold text-gray-700 ml-4 border-l pl-4">
                  👋 {userName}
                </span>
                <button
                  onClick={logout}
                  className="!w-auto !py-1 !px-3 !text-sm flex items-center bg-red-500 text-white font-semibold rounded-md transition duration-200 shadow-md hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-200"
                >
                  <LogOut className="w-4 h-4 mr-1" /> Logout
                </button>
              </>
            )}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-500 hover:text-emerald-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute w-full bg-white shadow-xl border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.path);
                  setIsMenuOpen(false);
                }}
                className={getMobileLinkClass(item.name)}
              >
                <item.icon className="w-5 h-5 mr-2" />
                {item.name}
                <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
              </button>
            ))}

            {isLoggedIn && (
              <button
                onClick={logout}
                className="!w-full !py-2 !px-3 !text-base mt-2 flex justify-center items-center bg-red-500 text-white font-semibold rounded-md transition duration-200 shadow-md hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-200"
              >
                <LogOut className="w-5 h-5 mr-2" /> Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

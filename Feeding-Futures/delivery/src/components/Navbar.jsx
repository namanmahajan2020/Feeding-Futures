import React, { useState, useEffect } from "react";
import {
  UserPlus,
  Package,
  Info,
  Mail,
  File,
  LogOut,
  Menu,
  X,
  ChevronRight,
  LogIn
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Header = ({ isLoggedIn = false, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userName, setUserName] = useState(""); // Track user name
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkLoginStatus = () => {
      const name = localStorage.getItem("name"); // Get the name from localStorage
      setUserName(name);
    };

    // Listen to localStorage changes (cross-tab)
    window.addEventListener("storage", checkLoginStatus);

    // Also check immediately on mount
    checkLoginStatus();

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, [userName, navigate]);

  const isSignupPage = location.pathname === "/signup";

  const loggedInNavItems = [
    { name: "Orders", path: "/orders", icon: Package },
    { name: "History", path: "/past-orders", icon: File },
    { name: "Contact", path: "/contact", icon: Mail },
  ];

  const loggedOutNavItems = [
    { name: "About Us", path: "/about", icon: Info },
    { name: "Contact", path: "/contact", icon: Mail },
    // "Join Us" will be handled separately as a button
  ];

  const activeNavItems = isLoggedIn ? loggedInNavItems : loggedOutNavItems;
  const isActivePath = (path) =>
    path === "/about"
      ? location.pathname === "/" || location.pathname === "/about"
      : location.pathname === path;

  const getLinkClass = (path) =>
    `px-3 py-2 rounded-md text-sm transition-colors flex items-center 
     ${isActivePath(path)
      ? "text-emerald-600 font-bold"
      : "hover:bg-emerald-50 text-gray-600 font-medium hover:text-emerald-700"}`;

  const getMobileLinkClass = (path) =>
    `block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center 
     ${isActivePath(path)
      ? "bg-emerald-100 text-emerald-700 font-bold"
      : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-700"}`;

  const logout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("name"); // Remove name from localStorage as well
    if (onLogout) onLogout(); // update parent immediately
    navigate("/signup");
  };

  const goToAdminUserLogin = () => {
    const apiStart = import.meta.env.VITE_API_START;
    if (apiStart.startsWith("http")) {
      window.location.href = apiStart;
    } else {
      navigate(apiStart);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b-1 border-white bg-transparent shadow-lg backdrop-blur-2xl overflow-x-clip">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="min-w-0 flex-shrink text-xl sm:text-2xl md:whitespace-nowrap lg:mr-64 font-extrabold text-gray-800 cursor-pointer"
            onClick={() => navigate(isLoggedIn ? "/orders" : "/")}
          >
            Feeding <b className="text-emerald-500">Futures</b>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 w-full justify-center">
            {/* Centered Navigation Items */}
            {activeNavItems.map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={getLinkClass(item.path)}
              >
                <item.icon className="w-4 h-4 mr-1" />
                {item.name}
              </button>
            ))}

            {/* Rest of Navigation Items */}
            <div className="flex items-center space-x-4 ml-auto">
              {/* Show “Join Us” button only if logged out and NOT on signup page */}
              {!isLoggedIn && !isSignupPage && (
                <button
                  onClick={() => navigate("/signup")}
                  className="ml-2 bg-emerald-500 text-sm text-white font-semibold px-4 py-2 rounded-md shadow hover:bg-emerald-600 transition"
                >
                  <UserPlus className="w-4 h-4 inline-block mr-1" />
                  Join Us
                </button>
              )}

              {/* On signup page, show “Login as Admin/User” button */}
              {(!isLoggedIn || isSignupPage) && (
                <button
                  onClick={goToAdminUserLogin}
                  className="ml-3 bg-gradient-to-tl from-sky-500 via-indigo-500 to-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-md shadow hover:bg-blue-600 transition"
                >
                  <LogIn className="w-5 h-5 text-red-400 inline-block mr-2" />
                  Login as Admin/User
                </button>

              )}

              {isLoggedIn && (
                <>
                  <span className="text-sm font-semibold text-gray-700 ml-4">
                    👋 {userName || "User"} {/* Show the user's name */}
                  </span>
                  <button
                    onClick={logout}
                    className="!w-auto !py-1 !px-3 !text-sm flex items-center bg-red-500 text-white font-semibold rounded-md transition duration-200 shadow-md hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-200"
                  >
                    <LogOut className="w-4 h-4 mr-1" /> Logout
                  </button>
                </>
              )}
            </div>
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
        <div className="md:hidden absolute w-full bg-white/95 shadow-xl border-t border-gray-100 backdrop-blur">
          <div className="px-3 pt-3 pb-4 space-y-2">
            {isLoggedIn && (
              <div className="rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
                Hello, {userName || "User"}
              </div>
            )}
            {activeNavItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.path);
                  setIsMenuOpen(false);
                }}
                className={getMobileLinkClass(item.path)}
              >
                <item.icon className="w-5 h-5 mr-2" />
                {item.name}
                <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
              </button>
            ))}

            {!isLoggedIn && !isSignupPage && (
              <button
                onClick={() => {
                  navigate("/signup");
                  setIsMenuOpen(false);
                }}
                className="w-full py-2 px-3 mt-2 bg-emerald-500 text-white font-semibold rounded-md shadow hover:bg-emerald-600 transition flex justify-center items-center"
              >
                <UserPlus className="w-5 h-5 mr-2" /> Join Us
              </button>
            )}

            {!isLoggedIn && (
              <button
                onClick={() => {
                  goToAdminUserLogin();
                  setIsMenuOpen(false);
                }}
                className="w-full py-2 px-3 mt-2 bg-gradient-to-tl from-sky-500 via-indigo-500 to-blue-700 text-white font-semibold rounded-md shadow transition flex justify-center items-center hover:opacity-95"
              >
                <LogIn className="w-4 h-4 mr-2 text-red-300" /> Login as Admin/User
              </button>
            )}

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

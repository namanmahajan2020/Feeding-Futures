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

const Header = ({ isLoggedIn = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkLoginStatus = () => {
      const email = localStorage.getItem("email");
      if (email) setUserEmail(email);
      else setUserEmail("");
    };
    window.addEventListener("storage", checkLoginStatus);
    checkLoginStatus();
    return () => window.removeEventListener("storage", checkLoginStatus);
  }, []);

  // Detect if we're on the signup page
  const isSignupPage = location.pathname === "/signup";

  const loggedInNavItems = [
    { name: "Orders", path: "/orders", icon: Package },
    { name: "History", path: "/past-orders", icon: File },
    { name: "Contact", path: "/contact", icon: Mail },
  ];

  const loggedOutNavItems = [
    { name: "About Us", path: "/about", icon: Info },
    // "Join Us" will be handled separately as a button
  ];

  const activeNavItems = isLoggedIn ? loggedInNavItems : loggedOutNavItems;

  const getLinkClass = (path) =>
    `px-3 py-2 rounded-md text-sm transition-colors flex items-center 
     ${location.pathname === path
      ? "text-emerald-600 font-bold"
      : "hover:bg-emerald-50 text-gray-600 font-medium hover:text-emerald-700"}`;

  const getMobileLinkClass = (path) =>
    `block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center 
     ${location.pathname === path
      ? "bg-emerald-100 text-emerald-700 font-bold"
      : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-700"}`;

  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <header className="bg-white border-b-2 border-green-500 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="flex-shrink-0 text-2xl font-extrabold text-gray-800 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Feeding <b className="text-emerald-500">Futures</b>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-3 items-center">
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

            {/* ✅ Show “Join Us” button only if logged out and NOT on signup page */}
            {!isLoggedIn && !isSignupPage && (
              <button
                onClick={() => navigate("/signup")}
                className="ml-2 bg-emerald-500 text-sm text-white font-semibold px-4 py-2 rounded-md shadow hover:bg-emerald-600 transition"
              >
                <UserPlus className="w-4 h-4 inline-block mr-1" />
                Join Us
              </button>
            )}

            {/* ✅ On signup page, show “Login as Admin/User” button */}
            {(!isLoggedIn || isSignupPage) && (
              <button
                onClick={() => navigate("/orders")}
                className="ml-3 bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-md shadow hover:bg-blue-600 transition"
              >
                <LogIn className="w-5 h-5 text-red-400 inline-block mr-2" />
                Login as Admin/User
              </button>
            )}

            {isLoggedIn && (
              <>
                <span className="text-sm font-semibold text-gray-700 ml-4 border-l pl-4">
                  👋 {userEmail || "User"}
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

            {!isLoggedIn && isSignupPage && (
              <button
                onClick={() => {
                  navigate("/login");
                  setIsMenuOpen(false);
                }}
                className="w-full py-2 px-3 mt-2 bg-blue-500 text-white font-base rounded-md shadow hover:bg-blue-600 transition flex justify-center items-center"
              >
                <LogIn className="w-4 h-4 mr-2" /> Login as Admin/User
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

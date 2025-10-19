import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [navActive, setNavActive] = useState(false);
  const [userEmail, setUserEmail] = useState(localStorage.getItem("email"));
  const navigate = useNavigate();

  const location = useLocation(); // 👈 Get current path
  const isLoggedIn = !!userEmail;
  const currentPath = location.pathname;

  // Real-time login state check
  useEffect(() => {
    const checkLoginStatus = () => {
      const email = localStorage.getItem("email");
      setUserEmail(email);
    };

    // Listen to localStorage changes (cross-tab)
    window.addEventListener("storage", checkLoginStatus);

    // Also check immediately on mount
    checkLoginStatus();

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, [userEmail, navigate]);

  const shouldShowSignIn =
    !isLoggedIn && currentPath !== "/start" && currentPath !== "/signup";

  return (
    <header className="w-full h-18 bg-gradient-to-b from-white to-green-100 flex justify-between items-center px-24 md:px-12 sm:px-6 fixed top-0 z-50 shadow-sm">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          isActive
            ? "block px-6 py-2 rounded-full bg-black text-white md:bg-transparent md:text-green-600 font-semibold"
            : "block px-6 py-2 rounded-full hover:scale-110 transition-transform duration-300"
        }
        onClick={() => setNavActive(false)} // close nav on click
      >
        <div className="text-3xl font-extrabold text-black select-none">
          Feeding <span className="text-green-600">Futures</span>
        </div>
      </NavLink>

      {/* Hamburger for small screens */}
      <div
        className="hamburger cursor-pointer block md:hidden"
        onClick={() => setNavActive(!navActive)}
      >
        <div className="w-8 h-0.5 bg-black my-1"></div>
        <div className="w-8 h-0.5 bg-black my-1"></div>
        <div className="w-8 h-0.5 bg-black my-1"></div>
      </div>

      {/* Main container for navigation and Sign In */}
      <div className="flex flex-1 justify-center items-center">
        {/* Nav Bar */}
        <nav
          className={`nav-bar md:flex md:items-center md:static absolute top-20 left-0 w-full md:w-auto bg-green-600 md:bg-transparent overflow-hidden transition-[height] duration-200 ease-in ${navActive ? "h-[180px]" : "h-0"
            } md:h-auto ${shouldShowSignIn?"":"mr-25"}`}
        >
          <ul className="md:flex md:space-x-6 text-white md:text-black text-lg text-center">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive
                    ? "block px-6 py-2 rounded-full bg-black text-white md:bg-transparent md:text-green-600 font-semibold"
                    : "block px-6 py-2 rounded-full hover:bg-gradient-to-t from-green-500 to-black hover:font-base hover:text-white transition"
                }
                onClick={() => setNavActive(false)} // close nav on click
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "block px-6 py-2 rounded-full bg-black text-white md:bg-transparent md:text-green-600 font-semibold"
                    : "block px-6 py-2 rounded-full hover:bg-gradient-to-t from-green-500 to-black hover:font-base hover:text-white transition"
                }
                onClick={() => setNavActive(false)} // close nav on click
              >
                About
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "block px-6 py-2 rounded-full bg-black text-white md:bg-transparent md:text-green-600 font-semibold"
                    : "block px-6 py-2 rounded-full hover:bg-gradient-to-t from-green-500 to-black hover:font-base hover:text-white transition"
                }
                onClick={() => setNavActive(false)} // close nav on click
              >
                Contact
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive
                    ? "block px-6 py-2 rounded-full text-white md:text-green-600 font-semibold"
                    : "block px-6 py-2 rounded-3xl hover:bg-gradient-to-t from-green-500 to-black hover:font-base hover:text-white transition"
                }
                onClick={() => setNavActive(false)} // close nav on click
              >
                Profile
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      {/* Sign In Button (only if not logged in) */}
      {shouldShowSignIn && (
        <NavLink
          to="/start"
          className="block px-5 py-1.5 rounded-full border-1 border-emerald-700  bg-gradient-to-b from-sky-500 to-black text-white font-bold hover:bg-gradient-to-b hover:from-green-500 hover:to-black hover:scale-95 transition duration-200"
          onClick={() => setNavActive(false)}
        >
          Sign In
        </NavLink>
      )}
    </header>

  );
};

export default Navbar;

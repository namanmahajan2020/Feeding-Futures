import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/profile", label: "Profile" },
];

const Navbar = () => {
  const [navActive, setNavActive] = useState(false);
  const [userEmail, setUserEmail] = useState(localStorage.getItem("email"));
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!userEmail;
  const currentPath = location.pathname;

  useEffect(() => {
    const checkLoginStatus = () => {
      const email = localStorage.getItem("email");
      setUserEmail(email);
    };

    window.addEventListener("storage", checkLoginStatus);
    checkLoginStatus();

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, [userEmail, navigate]);

  useEffect(() => {
    setNavActive(false);
  }, [currentPath]);

  useEffect(() => {
    document.body.style.overflow = navActive ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [navActive]);

  useEffect(() => {
    if (!navActive) return undefined;

    const timer = window.setTimeout(() => {
      setNavActive(false);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [navActive]);

  const shouldShowSignIn =
    !isLoggedIn && currentPath !== "/start" && currentPath !== "/signup";
  const visibleNavItems = navItems.filter(
    (item) => !(currentPath === "/signup" && item.to === "/profile")
  );

  return (
    <>
      <header className="fixed top-0 z-50 flex h-18 w-full items-center gap-3 bg-gradient-to-b from-white/80 to-green-100/80 px-3 shadow-sm backdrop-blur-md border border-white/40 sm:px-5 md:gap-2 md:pl-4 md:pr-5 lg:gap-4 lg:pl-8 lg:pr-24">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive
              ? "block rounded-full px-2 py-2 font-semibold md:px-3 lg:px-6 md:bg-transparent md:text-green-600"
              : "block rounded-full px-2 py-2 transition-transform duration-300 hover:scale-110 md:px-3 lg:px-6"
          }
          onClick={() => setNavActive(false)}
        >
          <div className="select-none text-[1.7rem] font-extrabold leading-none text-black sm:text-3xl md:text-[1.85rem] lg:text-[2.05rem] md:whitespace-nowrap">
            Feeding <span className="text-green-600">Futures</span>
          </div>
        </NavLink>

        <div className="ml-auto flex items-center gap-3 md:hidden">
          {shouldShowSignIn && (
            <NavLink
              to="/start"
              className="rounded-full border border-white/50 bg-white/35 px-3.5 py-2 text-xs font-semibold text-slate-900 shadow-[0_8px_20px_rgba(15,23,42,0.10)] backdrop-blur-md transition hover:scale-[0.98]"
              onClick={() => setNavActive(false)}
            >
              Sign In
            </NavLink>
          )}

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/50 bg-white/35 text-slate-900 shadow-[0_12px_28px_rgba(15,23,42,0.14)] backdrop-blur-xl transition hover:scale-[0.98]"
            onClick={() => setNavActive((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={navActive}
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={`block h-0.5 w-5 rounded-full bg-slate-900 transition ${
                  navActive ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 rounded-full bg-slate-900 transition ${
                  navActive ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 rounded-full bg-slate-900 transition ${
                  navActive ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>

        <div className="hidden flex-1 items-center justify-center md:flex">
          <nav
            className={`md:flex md:w-auto md:items-center md:bg-transparent ${
              shouldShowSignIn ? "" : "md:mr-12 lg:mr-25"
            }`}
          >
            <ul className="text-lg text-white md:flex md:space-x-2 lg:space-x-6 md:text-[1.02rem] lg:text-lg md:text-black">
              {visibleNavItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    className={({ isActive }) =>
                      item.to === "/profile"
                        ? isActive
                          ? "block rounded-full px-3 py-2 lg:px-6 font-semibold text-white md:text-green-600"
                          : "block rounded-3xl px-3 py-2 lg:px-6 transition hover:bg-gradient-to-t hover:from-green-500 hover:to-black hover:text-white"
                        : isActive
                          ? "block rounded-full bg-black px-3 py-2 lg:px-6 font-semibold text-white md:bg-transparent md:text-green-600"
                          : "block rounded-full px-3 py-2 lg:px-6 transition hover:bg-gradient-to-t hover:from-green-500 hover:to-black hover:text-white"
                    }
                    onClick={() => setNavActive(false)}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {shouldShowSignIn && (
          <NavLink
            to="/start"
            className="hidden md:inline-flex md:items-center md:justify-center whitespace-nowrap rounded-full border border-emerald-700 bg-gradient-to-b from-sky-500 to-black px-4 py-1.5 text-[0.95rem] lg:px-5 font-bold text-white transition duration-200 hover:scale-95 hover:bg-gradient-to-b hover:from-green-500 hover:to-black"
            onClick={() => setNavActive(false)}
          >
            Sign In
          </NavLink>
        )}
      </header>

      <div
        className={`fixed inset-0 z-40 bg-slate-950/18 backdrop-blur-[2px] transition duration-300 md:hidden ${
          navActive ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setNavActive(false)}
      />

      <nav
        className={`fixed inset-x-4 top-21 z-50 rounded-[2rem] border border-white/45 bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(217,245,225,0.58))] p-4 shadow-[0_22px_50px_rgba(15,23,42,0.18)] backdrop-blur-2xl transition duration-300 md:hidden ${
          navActive
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        <ul className="space-y-2">
          {visibleNavItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `block rounded-2xl px-4 py-3 text-base font-semibold transition ${
                    isActive
                      ? "bg-[linear-gradient(135deg,#16a34a_0%,#22c55e_100%)] text-white shadow-[0_12px_24px_rgba(34,197,94,0.22)]"
                      : "bg-white/55 text-slate-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]"
                  }`
                }
                onClick={() => setNavActive(false)}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {shouldShowSignIn && (
          <NavLink
            to="/start"
            className="mt-4 block rounded-2xl bg-slate-950 px-4 py-3 text-center text-sm font-semibold text-white shadow-[0_14px_28px_rgba(15,23,42,0.18)]"
            onClick={() => setNavActive(false)}
          >
            Continue to Sign In
          </NavLink>
        )}
      </nav>
    </>
  );
};

export default Navbar;

import React, { useState } from "react";

const Navbar = () => {
  const [navActive, setNavActive] = useState(false);

  return (
      <header className="w-full h-20 bg-gradient-to-b from-white to-green-100 flex justify-between items-center px-24 md:px-12 sm:px-6 fixed top-0 z-50 shadow-sm">
        <div className="text-2xl font-extrabold text-black select-none">
          Feeding <span className="text-green-600">Futures</span>
        </div>

        {/* Hamburger for small screens */}
        <div
          className="hamburger cursor-pointer block md:hidden"
          onClick={() => setNavActive(!navActive)}
        >
          <div className="w-8 h-0.5 bg-black my-1"></div>
          <div className="w-8 h-0.5 bg-black my-1"></div>
          <div className="w-8 h-0.5 bg-black my-1"></div>
        </div>

        {/* Nav Bar */}
        <nav
          className={`nav-bar md:flex md:items-center md:static absolute top-20 left-0 w-full md:w-auto bg-green-600 md:bg-transparent overflow-hidden transition-[height] duration-200 ease-in ${
            navActive ? "h-[180px]" : "h-0"
          } md:h-auto`}
        >
          <ul className="md:flex md:space-x-6 text-white md:text-black text-lg text-center">
            <li>
              <a
                href="home.html"
                className="block px-6 py-2 rounded-full hover:bg-black hover:text-white transition"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="block px-6 py-2 rounded-full bg-black text-white md:bg-transparent md:text-green-600 font-semibold"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="contact.html"
                className="block px-6 py-2 rounded-full hover:bg-black hover:text-white transition"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="profile.php"
                className="block px-6 py-2 rounded-full hover:bg-black hover:text-white transition"
              >
                Profile
              </a>
            </li>
          </ul>
        </nav>
      </header>
  );
};

export default Navbar;

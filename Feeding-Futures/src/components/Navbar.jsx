import React, { useState } from "react";

const Navbar = () => {
  const [navActive, setNavActive] = useState(false);

  return (
    <header className="w-full h-20 bg-white flex justify-between items-center px-10 md:px-24 fixed top-0 z-20 shadow-sm">
      <div className="text-2xl font-semibold text-black">
        Feeding <b className="text-green-500">Futures</b>
      </div>

      {/* Hamburger */}
      <div
        className="flex flex-col space-y-1.5 cursor-pointer md:hidden"
        onClick={() => setNavActive(!navActive)}
      >
        <span className="w-8 h-0.5 bg-black"></span>
        <span className="w-8 h-0.5 bg-black"></span>
        <span className="w-8 h-0.5 bg-black"></span>
      </div>

      {/* Navigation */}
      <nav
        className={`absolute top-20 left-0 w-full bg-green-500 md:static md:bg-transparent md:w-auto md:flex md:items-center transition-all duration-300 overflow-hidden ${
          navActive ? "max-h-[450px]" : "max-h-0 md:max-h-full"
        }`}
      >
        <ul className="flex flex-col md:flex-row md:space-x-4 text-white md:text-black px-5 md:px-0 py-6 md:py-0 text-lg md:text-base">
          <li>
            <a
              href="#home"
              className="block px-6 py-2 rounded-full md:rounded-lg md:px-4 md:py-1 md:hover:bg-gray-200 md:hover:text-green-600 bg-white text-green-600 font-semibold"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="about.html"
              className="block px-6 py-2 rounded-full md:rounded-lg md:px-4 md:py-1 md:hover:bg-gray-200 md:hover:text-green-600"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="contact.html"
              className="block px-6 py-2 rounded-full md:rounded-lg md:px-4 md:py-1 md:hover:bg-gray-200 md:hover:text-green-600"
            >
              Contact
            </a>
          </li>
          <li>
            <a
              href="profile.php"
              className="block px-6 py-2 rounded-full md:rounded-lg md:px-4 md:py-1 md:hover:bg-gray-200 md:hover:text-green-600"
            >
              Profile
            </a>
          </li>
          {/* <li><a href="fooddonate.html" className="block px-6 py-2 rounded-full md:rounded-lg md:px-4 md:py-1 md:hover:bg-gray-200 md:hover:text-green-600">Donate</a></li> */}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;

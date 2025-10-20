import React, { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <div className="text-2xl font-semibold">
        Feeding <b className="text-green-600">Futures</b>
      </div>
      <div
        className="md:hidden flex flex-col gap-1 cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <div className="w-6 h-0.5 bg-gray-800"></div>
        <div className="w-6 h-0.5 bg-gray-800"></div>
        <div className="w-6 h-0.5 bg-gray-800"></div>
      </div>
      <nav
        className={`${
          menuOpen ? "block" : "hidden"
        } md:block absolute md:static top-14 left-0 w-full md:w-auto bg-white md:bg-transparent`}
      >
        <ul className="flex flex-col md:flex-row gap-3 md:gap-6 p-4 md:p-0 text-center">
          <li>
            <a href="delivery.php" className="bg-green-600 text-white px-4 py-2 rounded-md">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="bg-green-600 text-white px-4 py-2 rounded-md">
              Map
            </a>
          </li>
          <li>
            <a href="deliverymyord.php" className="bg-green-600 text-white px-4 py-2 rounded-md">
              My Orders
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

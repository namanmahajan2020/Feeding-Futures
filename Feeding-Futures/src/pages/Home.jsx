// Home.jsx
import React, { useState } from "react";

const Home = () => {
  const [navActive, setNavActive] = useState(false);

  const toggleNav = () => setNavActive(!navActive);

  return (
    <div className="font-sans">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md fixed w-full z-20">
        <div className="text-2xl font-bold">
          Feeding <span className="text-green-500">Futures</span>
        </div>

        {/* Hamburger */}
        <div
          className="flex flex-col justify-between w-6 h-5 cursor-pointer md:hidden"
          onClick={toggleNav}
        >
          <span className="block h-0.5 bg-black"></span>
          <span className="block h-0.5 bg-black"></span>
          <span className="block h-0.5 bg-black"></span>
        </div>

        {/* Nav */}
        <nav
          className={`absolute top-full left-0 w-full bg-white md:static md:w-auto transition-all duration-300 ${
            navActive ? "max-h-60" : "max-h-0 overflow-hidden"
          } md:max-h-full`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-8 text-lg">
            <li>
              <a href="#home" className="block px-6 py-3 md:py-0 md:px-0 text-green-500 font-semibold">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="block px-6 py-3 md:py-0 md:px-0 hover:text-green-500">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="block px-6 py-3 md:py-0 md:px-0 hover:text-green-500">
                Contact
              </a>
            </li>
            <li>
              <a href="/profile" className="block px-6 py-3 md:py-0 md:px-0 hover:text-green-500">
                Profile
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Banner */}
      <section className="h-screen flex items-center justify-center bg-green-100 mt-16">
        <a
          href="/fooddonateform"
          className="px-8 py-4 bg-green-500 text-white text-xl font-bold rounded-lg hover:bg-green-600 transition"
        >
          Donate Food
        </a>
      </section>

      {/* Quote */}
      <div className="px-6 py-16 text-center">
        <p className="text-2xl md:text-3xl font-medium max-w-3xl mx-auto">
          “Cutting food waste is a delicious way of saving money, helping to feed the world and protect the planet.”
        </p>
      </div>

      {/* Our Works */}
      <div className="px-6 py-16 text-center">
        <h2 className="text-4xl font-bold mb-4">Our Works</h2>
        <p className="text-xl mb-8">"Look what we can do together."</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <img src="/img/p1.jpeg" alt="Work 1" className="w-full h-64 object-cover rounded-lg shadow-lg" />
          <img src="/img/p4.jpeg" alt="Work 2" className="w-full h-64 object-cover rounded-lg shadow-lg" />
          <img src="/img/p3.jpeg" alt="Work 3" className="w-full h-64 object-cover rounded-lg shadow-lg" />
        </div>
      </div>

      {/* Door Pickup */}
      <div className="px-6 py-16 bg-green-50 text-center">
        <h2 className="text-4xl font-bold mb-4">DOOR PICKUP</h2>
        <p className="text-xl mb-8">"Your donation will be immediately collected and sent to needy people"</p>
        <img src="/img/delivery.gif" alt="delivery" className="mx-auto w-64 h-64 object-contain" />
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <h3 className="text-xl font-bold mb-2">About us</h3>
          <p className="text-sm">
            The basic concept of this project Food Waste Management is to collect the excess/leftover food from donors such as hotels, restaurants, marriage halls, etc and distribute to the needy people.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-bold mb-2">Contact</h3>
          <p>(+00) 0000 000 000</p>
          <p><a href="mailto:feedingfutures@gmail.com" className="underline">feedingfutures@gmail.com</a></p>
          <div className="flex space-x-4 mt-4">
            <a href="https://www.facebook.com/TheAkshayaPatraFoundation/">
              <img src="https://i.ibb.co/x7P24fL/facebook.png" alt="fb" className="w-6 h-6" />
            </a>
            <a href="https://twitter.com/globalgiving">
              <img src="https://i.ibb.co/Wnxq2Nq/twitter.png" alt="tw" className="w-6 h-6" />
            </a>
            <a href="https://www.instagram.com/charitism/">
              <img src="https://i.ibb.co/ySwtH4B/instagram.png" alt="ig" className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Menu */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Feeding Futures</h3>
          <div className="flex flex-col space-y-2">
            <a href="#" className="hover:text-green-500">Home</a>
            <a href="/about" className="hover:text-green-500">About</a>
            <a href="/profile" className="hover:text-green-500">Profile</a>
            <a href="/contact" className="hover:text-green-500">Contact</a>
          </div>
          <p className="mt-6 text-sm">&copy; 2024 Feeding Futures</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;


import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-10 px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
      <div>
        <h3 className="font-bold text-lg mb-4">About us</h3>
        <p className="text-sm leading-relaxed">
          The basic concept of this project Food Waste Management is to collect
          the excess/leftover food from donors such as hotels, restaurants,
          marriage halls, etc and distribute to the needy people.
        </p>
      </div>
      <div>
        <h3 className="font-bold text-lg mb-4">Contact</h3>
        <p className="mb-2">(+00) 0000 000 000</p>
        <p>
          <a
            href="mailto:feedingfutures@gmail.com"
            className="text-green-500 hover:underline"
          >
            feedingfutures@gmail.com
          </a>
        </p>
        <ul className="flex space-x-4 mt-6 justify-start">
          <li>
            <a
              href="https://www.facebook.com/TheAkshayaPatraFoundation/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://i.ibb.co/x7P24fL/facebook.png"
                alt="Facebook"
                className="w-6 filter invert hover:scale-110 transition-transform"
              />
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/globalgiving"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://i.ibb.co/Wnxq2Nq/twitter.png"
                alt="Twitter"
                className="w-6 filter invert hover:scale-110 transition-transform"
              />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/charitism/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://i.ibb.co/ySwtH4B/instagram.png"
                alt="Instagram"
                className="w-6 filter invert hover:scale-110 transition-transform"
              />
            </a>
          </li>
        </ul>
      </div>
      <div className="text-center md:text-right">
        <h2 className="text-4xl font-normal mb-4">
          Feeding <span className="text-green-500">Futures</span>
        </h2>
        <p className="mb-4">
          <a href="#" className="hover:text-green-500">
            Home
          </a>{" "}
          |{" "}
          <a href="about.html" className="hover:text-green-500">
            About
          </a>{" "}
          |{" "}
          <a href="profile.php" className="hover:text-green-500">
            Profile
          </a>{" "}
          |{" "}
          <a href="contact.html" className="hover:text-green-500">
            Contact
          </a>
        </p>
        <p className="text-green-500 text-sm">
          Feeding Futures &copy; 2024
        </p>
      </div>
    </footer>
  );
};

export default Footer;

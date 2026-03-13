import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Signup from "./components/Signup.jsx";
import Start from "./pages/Start.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Profile from "./pages/Profile.jsx";
import FoodDonationForm from "./components/FoodDonationForm.jsx";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

function App() {
  const [navActive, setNavActive] = useState(false);
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col">
        <ScrollToTop />
        <Navbar navActive={navActive} setNavActive={setNavActive} />
        <main className="flex flex-1 flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/start" element={<Start />} />
            <Route path="/foodDonationForm" element={<FoodDonationForm />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

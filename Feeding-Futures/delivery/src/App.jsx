import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Orders from "./pages/Orders.jsx";
import Signup from "./components/Signup.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import About from "./pages/About.jsx";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx"; // Your modified Header.jsx

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar isLoggedIn={false} /> {/* Add auth state as needed */}
      <Routes>
        <Route path="/" element={<Orders />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

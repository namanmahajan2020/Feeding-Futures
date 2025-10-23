import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Orders from "./pages/Orders.jsx";
import Signup from "./components/Signup.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import About from "./pages/About.jsx";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx"; 
import Contact from "./pages/Contact.jsx";
import PastOrders from "./pages/PastOrders.jsx";

function App() {
  // State to track if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in by looking for data in localStorage
    const user = localStorage.getItem("email"); // Or any other user-specific data
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar isLoggedIn={isLoggedIn} /> {/* Passing auth state to Navbar */}

      <Routes>
       <Route path="/" element={<About />} />
       <Route path="/about" element={<About />} />
       {/* Redirect to signup if not logged in */}
        <Route path="/orders" element={isLoggedIn ? <Orders /> : <Navigate to="/signup" />} />
        <Route path="/past-orders" element={isLoggedIn ? <PastOrders /> : <Navigate to="/signup" />} />
        <Route path="/signup" element={isLoggedIn ? <Navigate to="/" /> : <Signup />} />
        <Route path="/contact" element={isLoggedIn ? <Contact /> : <Navigate to="/signup" />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;

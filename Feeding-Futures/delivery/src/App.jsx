import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import Signup from "./components/Signup.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

function App() {
  // const [navActive, setNavActive] = useState(false);
  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* <Navbar navActive={navActive} setNavActive={setNavActive} /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;

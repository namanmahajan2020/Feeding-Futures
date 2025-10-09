import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Signup from "./components/Signup.jsx";
import Start from "./pages/Start.jsx";
import About from "./pages/About.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminDashboard1 from "./pages/AdminDashboard1.jsx";
import AdminLogin from "./components/adminLogin.jsx";
import Footer from './components/AdminFooter.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="home/" element={<AdminDashboard />} />
        <Route path="/" element={<AdminDashboard1 />} />
        <Route path="login/" element={<AdminLogin />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;


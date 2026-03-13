import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Orders from "./pages/Orders.jsx";
import Signup from "./components/Signup.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import About from "./pages/About.jsx";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import Contact from "./pages/Contact.jsx";
import PastOrders from "./pages/PastOrders.jsx";

function ProtectedRoute({ isAllowed, children }) {
  const location = useLocation();
  if (!isAllowed) {
    return <Navigate to="/signup" state={{ from: location }} replace />;
  }
  return children;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      return Boolean(localStorage.getItem("email"));
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    function onStorage(e) {
      if (e.key === "email") {
        setIsLoggedIn(Boolean(e.newValue));
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col">
        <ScrollToTop />
        <Navbar isLoggedIn={isLoggedIn} onLogout={() => setIsLoggedIn(false)} />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/about" element={<About />} />

            <Route
              path="/orders"
              element={
                <ProtectedRoute isAllowed={isLoggedIn}>
                  <Orders />
                </ProtectedRoute>
              }
            />

            <Route
              path="/past-orders"
              element={
                <ProtectedRoute isAllowed={isLoggedIn}>
                  <PastOrders />
                </ProtectedRoute>
              }
            />

            <Route
              path="/contact"
              element={
                <ProtectedRoute isAllowed={isLoggedIn}>
                  <Contact />
                </ProtectedRoute>
              }
            />

            <Route
              path="/signup"
              element={isLoggedIn ? <Navigate to="/orders" replace /> : <Signup onLogin={() => setIsLoggedIn(true)} />}
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

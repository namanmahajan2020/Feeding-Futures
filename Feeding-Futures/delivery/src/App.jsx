// App.jsx
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

// ProtectedRoute - use inside <Routes>
function ProtectedRoute({ isAllowed, children }) {
  const location = useLocation();
  if (!isAllowed) {
    // send them to signup and keep where they came from in state if you want
    return <Navigate to="/signup" state={{ from: location }} replace />;
  }
  return children;
}

function App() {
  // IMPORTANT: read localStorage synchronously on first render
  // replace "email" with whatever key you actually use ("token", "user", etc.)
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      return Boolean(localStorage.getItem("email"));
    } catch (e) {
      return false;
    }
  });

  // Keep in sync with other tabs (optional)
  useEffect(() => {
    function onStorage(e) {
      if (e.key === "email") {
        setIsLoggedIn(Boolean(e.newValue));
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Optional: If your app sets localStorage from some async flow,
  // make sure that code ALSO calls setIsLoggedIn(true) after successfully logging in.
  // Example: after login
  // localStorage.setItem('email', email);
  // setIsLoggedIn(true);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar
  isLoggedIn={isLoggedIn}
  onLogout={() => setIsLoggedIn(false)} // 👈 new callback
/>


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

        {/* Signup route: If the user is already logged in (from localStorage) then redirect to /orders.
            Because we initialize isLoggedIn synchronously, this redirect will only happen if they actually are logged in. */}
        <Route
          path="/signup"
          element={isLoggedIn ? <Navigate to="/orders" replace /> : <Signup onLogin={() => setIsLoggedIn(true)} />}
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;

// App.jsx
import React, { useState, useMemo, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";

import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminDashboard1 from "./pages/AdminDashboard1.jsx";
import AdminLogin from "./components/adminLogin.jsx";
import Footer from "./components/AdminFooter.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import Donations from "./pages/Donations.jsx";
import Feedback from "./pages/Feedback.jsx";
import Users from "./pages/Users.jsx";
import Analytics from "./pages/Analytics.jsx";
import { AppContext } from "./components/AppContext.jsx";
import { useDataFetcher } from "./hooks";


// ✅ Protected Route Wrapper
function ProtectedRoute({ children }) {
  const { isLoggedIn } = useContext(AppContext);
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}


// ✅ App Layout
function AppLayout({ children }) {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const { isDarkMode, isSidebarOpen } = useContext(AppContext);

  return (
    <div
      className={`min-h-screen font-sans ${
        isDarkMode
          ? "bg-slate-800 text-slate-200"
          : "bg-gradient-to-t from-blue-100 via-green-100 to-indigo-100 text-slate-800"
      } transition-colors duration-300`}
    >
      <div
        className={`flex min-h-screen ${
          !isLoginPage && isSidebarOpen
            ? "md:ml-64"
            : !isLoginPage
            ? "md:ml-20"
            : ""
        } transition-all duration-300`}
      >
        {!isLoginPage && <Sidebar />}

        <div className="flex-1 flex flex-col">
          {!isLoginPage && <Header />}
          <main className="flex-1">{children}</main>
        </div>
      </div>

      {!isLoginPage && <Footer />}
    </div>
  );
}


// ✅ Main App
export default function App() {
  const { data, isLoading } = useDataFetcher();

  // Theme & Layout State
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem("mode") === "dark");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState("dashboard");

  // Login State
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Optional: persist login state in localStorage
    return localStorage.getItem("isLoggedIn") === "true";
  });

  // Apply theme to body
  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
    localStorage.setItem("mode", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  // Save login state in localStorage (optional)
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  // Context provider value
  const providerValue = useMemo(
    () => ({
      isDarkMode,
      setIsDarkMode,
      isSidebarOpen,
      setIsSidebarOpen,
      activePage,
      setActivePage,
      isLoggedIn,
      setIsLoggedIn,
    }),
    [isDarkMode, isSidebarOpen, activePage, isLoggedIn]
  );

  return (
    <AppContext.Provider value={providerValue}>
      <Router>
        <AppLayout>
          <Routes>
            {/* Public Route */}
            <Route path="/login" element={<AdminLogin />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AdminDashboard1
                    data={data}
                    isLoading={isLoading}
                    isDarkMode={isDarkMode}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard
                    data={data}
                    isLoading={isLoading}
                    isDarkMode={isDarkMode}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/donations"
              element={
                <ProtectedRoute>
                  <Donations data={data} isLoading={isLoading} isDarkMode={isDarkMode} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/feedback"
              element={
                <ProtectedRoute>
                  <Feedback data={data} isLoading={isLoading} isDarkMode={isDarkMode} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute>
                  <Users data={data} isLoading={isLoading} isDarkMode={isDarkMode} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/analytics"
              element={
                <ProtectedRoute>
                  <Analytics />
                </ProtectedRoute>
              }
            />

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppLayout>
      </Router>
    </AppContext.Provider>
  );
}

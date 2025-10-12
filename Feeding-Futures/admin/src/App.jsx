import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard.jsx';
import AdminDashboard1 from './pages/AdminDashboard1.jsx';
import AdminLogin from './components/adminLogin.jsx';
import Footer from './components/AdminFooter.jsx';
import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import Donations from './pages/Donations.jsx';
import Feedback from './pages/Feedback.jsx';
import Users from './pages/Users.jsx';
import Analytics from './pages/Analytics.jsx';
import { AppContext } from './components/AppContext.jsx';
import { useDataFetcher } from './hooks';

export default function App() {
  const { data, isLoading } = useDataFetcher();
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('mode') === 'dark');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState('dashboard');

  useEffect(() => {
    // Toggle dark mode on body
    document.body.classList.toggle('dark', isDarkMode);
    // Store the mode in localStorage
    localStorage.setItem('mode', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Memoize the context values
  const providerValue = useMemo(() => ({
    isDarkMode,
    setIsDarkMode,
    isSidebarOpen,
    setIsSidebarOpen,
    activePage,
    setActivePage,
  }), [isDarkMode, isSidebarOpen, activePage]);

  return (
    <AppContext.Provider value={providerValue}>
      <div className={`min-h-screen font-sans ${isDarkMode ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-800'} transition-colors duration-300`}>
        <Router>
          {/* The Sidebar, Header, and Footer should be outside the Routes */}
          <div className={`flex min-h-screen ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'} transition-all duration-300`}>
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <Header />

              {/* Define all the routes here */}
              <Routes>
                {/* Public route */}
                <Route path="/" element={<AdminDashboard1 data={data} isLoading={isLoading} isDarkMode={isDarkMode} />} />
                <Route path="/dashboard" element={<AdminDashboard data={data} isLoading={isLoading} isDarkMode={isDarkMode} />} />
                <Route path="/login" element={<AdminLogin />} />
                {/* Protected routes (Dashboard, Donations, etc.) */}
                <Route path="/donations" element={<Donations data={data} isLoading={isLoading} isDarkMode={isDarkMode} />} />
                <Route path="/feedback" element={<Feedback data={data} isLoading={isLoading} isDarkMode={isDarkMode} />} />
                <Route path="/users" element={<Users data={data} isLoading={isLoading} isDarkMode={isDarkMode} />} />
                <Route path="/analytics" element={<Analytics />} />
              </Routes>
            </div>
          </div>
          {/* Footer */}
          <Footer />
        </Router>
      </div>
    </AppContext.Provider>
  );
}

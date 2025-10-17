import React, { useState, useMemo, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
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

function AppLayout({ children }) {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  const { isDarkMode, isSidebarOpen } = useContext(AppContext);

  return (
    <div
      className={`min-h-screen font-sans ${
        isDarkMode ? 'bg-slate-800 text-slate-200' : 'bg-gradient-to-t from-blue-100 via-green-100 to-indigo-100 text-slate-800'
      } transition-colors duration-300`}
    >
      <div
        className={`flex min-h-screen ${
          !isLoginPage && isSidebarOpen ? 'md:ml-64' : !isLoginPage ? 'md:ml-20' : ''
        } transition-all duration-300`}
      >
        {!isLoginPage && <Sidebar />}

        <div className="flex-1 flex flex-col">
          {!isLoginPage && <Header />}
          <main className="flex-1">{children}</main>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  const { data, isLoading } = useDataFetcher();
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('mode') === 'dark');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState('dashboard');

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
    localStorage.setItem('mode', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const providerValue = useMemo(
    () => ({
      isDarkMode,
      setIsDarkMode,
      isSidebarOpen,
      setIsSidebarOpen,
      activePage,
      setActivePage,
    }),
    [isDarkMode, isSidebarOpen, activePage]
  );

  return (
    <AppContext.Provider value={providerValue}>
      <Router>
        <AppLayout>
          <Routes>
            <Route path="/login" element={<AdminLogin />} />
            <Route path="/" element={<AdminDashboard1 data={data} isLoading={isLoading} isDarkMode={isDarkMode} />} />
            <Route path="/dashboard" element={<AdminDashboard data={data} isLoading={isLoading} isDarkMode={isDarkMode} />} />
            <Route path="/donations" element={<Donations data={data} isLoading={isLoading} isDarkMode={isDarkMode} />} />
            <Route path="/feedback" element={<Feedback data={data} isLoading={isLoading} isDarkMode={isDarkMode} />} />
            <Route path="/users" element={<Users data={data} isLoading={isLoading} isDarkMode={isDarkMode} />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </AppLayout>
      </Router>
    </AppContext.Provider>
  );
}

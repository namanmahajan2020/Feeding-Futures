import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminDashboard1 from "./pages/AdminDashboard1.jsx";
import AdminLogin from "./components/adminLogin.jsx";
import Footer from './components/AdminFooter.jsx';
import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppContext } from './components/AppContext.jsx';
import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import Dashboard from './pages/AdminDashboard.jsx';
import Donations from './components/Donations.jsx';
import Feedback from './components/Feedback.jsx';
import Users from './components/Users.jsx';
import Analytics from './components/Analytics.jsx';
import { useDataFetcher } from './hooks';

export default function App() {
  const { data, isLoading } = useDataFetcher();
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('mode') === 'dark');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState('dashboard');

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
    localStorage.setItem('mode', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const providerValue = useMemo(() => ({ isDarkMode, setIsDarkMode, isSidebarOpen, setIsSidebarOpen, activePage, setActivePage }),
    [isDarkMode, isSidebarOpen, activePage]);

  return (
    <AppContext.Provider value={providerValue}>
      <div className={`min-h-screen font-sans ${isDarkMode ? 'bg-slate-900 text-slate-200' : 'bg-slate-100 text-slate-800'} transition-colors duration-300`}>
        <Router>
          <Routes>
            <Route path="home/" element={<AdminDashboard1 />} />
            {/* <Route path="/" element={<AdminDashboard1 />} /> */}
            <Route path="login/" element={<AdminLogin />} />
          </Routes>
          <Sidebar />
          <div className={`flex flex-col min-h-screen ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'} transition-all duration-300`}>
            <Header />
            <Routes>
              <Route path="/" element={<AdminDashboard data={data} isLoading={isLoading} isDarkMode={isDarkMode} />} />
              <Route path="/donations" element={<Donations data={data} isLoading={isLoading} isDarkMode={isDarkMode} />} />
              <Route path="/feedback" element={<Feedback data={data} isLoading={isLoading} isDarkMode={isDarkMode} />} />
              <Route path="/users" element={<Users data={data} isLoading={isLoading} isDarkMode={isDarkMode} />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
            
          </div>
           <Footer />
        </Router>
      </div>
    </AppContext.Provider>
  );
}

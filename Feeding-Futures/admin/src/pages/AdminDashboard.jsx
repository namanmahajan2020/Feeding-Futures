import React, { useState, useEffect, useMemo } from 'react';
import { Home, BarChart, Users, MessageSquare, Briefcase, MapPin, Menu, Sun, Moon, LogOut, Package, Mail } from 'lucide-react';

// --- Global App Context for state sharing (similar to Redux/Hooks, simplified for single file) ---
const AppContext = React.createContext();

// --- MOCK DATA STRUCTURES (Based on inferred MongoDB models/PHP structure) ---

const MOCK_DONATIONS = [
  { id: 'D001', name: 'Ravi Kumar', food: 'Bread & Pastries', category: 'Baked Goods', phoneno: '9876543210', date: '2025-10-10 14:00', address: '12/A, Gandhi St, Madurai', quantity: '5kg', status: 'Pending' },
  { id: 'D002', name: 'Priya Sharma', food: 'Vegetables', category: 'Produce', phoneno: '9988776655', date: '2025-10-09 09:30', address: '45, Anna Salai, Chennai', quantity: '10kg', status: 'Collected' },
  { id: 'D003', name: 'Ahmed Khan', food: 'Cooked Meals', category: 'Prepared Food', phoneno: '9000111222', date: '2025-10-09 18:45', address: 'Plot 7, Ring Rd, Coimbatore', quantity: '20 servings', status: 'Collected' },
  { id: 'D004', name: 'Lakshmi V.', food: 'Canned Goods', category: 'Pantry', phoneno: '8877665544', date: '2025-10-08 11:15', address: 'Old No 3, Market St, Madurai', quantity: '15 cans', status: 'Pending' },
];

const MOCK_FEEDBACK = [
  { id: 'F001', name: 'Asha M.', email: 'asha@example.com', message: 'The collection process was very efficient, thank you!', date: '2025-10-10' },
  { id: 'F002', name: 'Gopal S.', email: 'gopal@test.com', message: 'I suggest adding a map feature for tracking drivers.', date: '2025-10-07' },
  { id: 'F003', name: 'Anonymous', email: 'n/a', message: 'Great initiative!', date: '2025-10-05' },
];

const MOCK_USERS = [
  { id: 'U101', name: 'Admin One', role: 'Super Admin', location: 'Chennai', lastActive: '2025-10-10 16:00' },
  { id: 'U102', name: 'Field Agent A', role: 'Collector', location: 'Madurai', lastActive: '2025-10-10 18:30' },
  { id: 'U103', name: 'Field Agent B', role: 'Collector', location: 'Coimbatore', lastActive: '2025-10-09 11:00' },
  { id: 'U104', name: 'Data Analyst', role: 'Analyst', location: 'Chennai', lastActive: '2025-10-10 09:00' },
];

// --- Custom Hook to Simulate Data Fetching ---
const useDataFetcher = () => {
  const [data, setData] = useState({ donations: [], feedback: [], users: [] });
  const [isLoading, setIsLoading] = useState(true);

  const fetchMockData = () => {
    return new Promise(resolve => {
      // Simulate network latency
      setTimeout(() => {
        resolve({
          donations: MOCK_DONATIONS,
          feedback: MOCK_FEEDBACK,
          users: MOCK_USERS,
        });
      }, 1000); // 1 second delay
    });
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const fetchedData = await fetchMockData();
        setData(fetchedData);
      } catch (error) {
        console.error('Failed to fetch mock data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  return { data, isLoading };
};

// --- Presentation Components ---

const StatCard = ({ icon: Icon, title, value, isDarkMode, color }) => {
    const colorClasses = {
        blue: 'text-blue-500 bg-blue-100',
        yellow: 'text-yellow-500 bg-yellow-100',
        purple: 'text-purple-500 bg-purple-100',
        green: 'text-green-accent bg-green-100',
    };
    const darkClasses = {
        blue: 'dark:bg-blue-900 dark:text-blue-300',
        yellow: 'dark:bg-yellow-900 dark:text-yellow-300',
        purple: 'dark:bg-purple-900 dark:text-purple-300',
        green: 'dark:bg-green-800 dark:text-green-300',
    };

    return (
        <div className={`p-6 rounded-2xl shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} transition-shadow hover:shadow-xl`}>
            <div className={`flex items-center justify-between mb-4`}>
                <h3 className={`text-sm font-medium uppercase ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{title}</h3>
                <div className={`p-3 rounded-xl ${colorClasses[color]} ${isDarkMode ? darkClasses[color] : ''}`}>
                    <Icon className="w-6 h-6" />
                </div>
            </div>
            <p className="text-4xl font-extrabold">{value}</p>
        </div>
    );
};

const TableComponent = ({ title, columns, data, loading, isDarkMode }) => {
    if (loading) {
        return <p className="p-4 text-center text-lg">Loading {title.toLowerCase()}...</p>;
    }

    if (!data || data.length === 0) {
        return <p className="p-4 text-center text-lg">No {title.toLowerCase()} records found.</p>;
    }

    return (
        <div className={`overflow-x-auto p-4 rounded-xl shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} transition-shadow`}>
            <h3 className="text-2xl font-semibold mb-4 text-green-accent">{title} List</h3>
            <table className="responsive-table min-w-full">
                <thead>
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index}>{col.header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id} className={`${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                            {columns.map((col) => (
                                <td key={`${item.id}-${col.field}`} data-label={col.header}>
                                    {item[col.field]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// --- Specific Table Implementations ---

const DonationsTable = ({ donations, isLoading, isDarkMode }) => {
    const columns = [
        { header: 'Donor Name', field: 'name' },
        { header: 'Food Item', field: 'food' },
        { header: 'Category', field: 'category' },
        { header: 'Quantity', field: 'quantity' },
        { header: 'Date/Time', field: 'date' },
        { header: 'Address', field: 'address' },
        { header: 'Status', field: 'status' },
    ];
    return (
        <TableComponent 
            title="Donations" 
            columns={columns} 
            data={donations} 
            loading={isLoading} 
            isDarkMode={isDarkMode} 
        />
    );
};

const FeedbackTable = ({ feedback, isLoading, isDarkMode }) => {
    const columns = [
        { header: 'Name', field: 'name' },
        { header: 'Email', field: 'email' },
        { header: 'Message', field: 'message' },
        { header: 'Date', field: 'date' },
    ];
    return (
        <TableComponent 
            title="Feedback" 
            columns={columns} 
            data={feedback} 
            loading={isLoading} 
            isDarkMode={isDarkMode} 
        />
    );
};

const UsersTable = ({ users, isLoading, isDarkMode }) => {
    const columns = [
        { header: 'ID', field: 'id' },
        { header: 'Name', field: 'name' },
        { header: 'Role', field: 'role' },
        { header: 'Location', field: 'location' },
        { header: 'Last Active', field: 'lastActive' },
    ];
    return (
        <TableComponent 
            title="Users" 
            columns={columns} 
            data={users} 
            loading={isLoading} 
            isDarkMode={isDarkMode} 
        />
    );
};


const PageContent = ({ page, data, isLoading, isDarkMode }) => {
    
    const totalDonations = data.donations.length;
    const pendingDonations = data.donations.filter(d => d.status === 'Pending').length;
    const totalUsers = data.users.length;

    const content = useMemo(() => {
        switch (page) {
            case 'dashboard':
                return (
                    <>
                        <h2 className="text-3xl font-bold mb-6">Dashboard Overview</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatCard 
                                icon={Briefcase} 
                                title="Total Donations" 
                                value={totalDonations} 
                                isDarkMode={isDarkMode} 
                                color="green" 
                            />
                            <StatCard 
                                icon={Package} 
                                title="Pending Collections" 
                                value={pendingDonations} 
                                isDarkMode={isDarkMode} 
                                color="yellow" 
                            />
                            <StatCard 
                                icon={Users} 
                                title="Total Users/Admins" 
                                value={totalUsers} 
                                isDarkMode={isDarkMode} 
                                color="blue" 
                            />
                            <StatCard 
                                icon={Mail} 
                                title="New Feedback" 
                                value={data.feedback.length} 
                                isDarkMode={isDarkMode} 
                                color="purple" 
                            />
                        </div>
                        <div className="mt-10">
                            <DonationsTable donations={data.donations.slice(0, 5)} isLoading={isLoading} isDarkMode={isDarkMode} />
                        </div>
                    </>
                );
            case 'donations':
                return (
                    <>
                        <h2 className="text-3xl font-bold mb-6">Manage Food Donations</h2>
                        <DonationsTable donations={data.donations} isLoading={isLoading} isDarkMode={isDarkMode} />
                    </>
                );
            case 'feedback':
                return (
                    <>
                        <h2 className="text-3xl font-bold mb-6">Manage User Feedback</h2>
                        <FeedbackTable feedback={data.feedback} isLoading={isLoading} isDarkMode={isDarkMode} />
                    </>
                );
            case 'users':
                return (
                    <>
                        <h2 className="text-3xl font-bold mb-6">Admin & User Management</h2>
                        <UsersTable users={data.users} isLoading={isLoading} isDarkMode={isDarkMode} />
                    </>
                );
            case 'analytics':
                return (
                    <>
                        <h2 className="text-3xl font-bold mb-6">Analytics & Reports</h2>
                        <div className={`p-6 rounded-2xl shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <p className="text-lg text-gray-500 dark:text-gray-400">
                                This section would display charts and detailed reports (e.g., location-based donation statistics, as seen in the original `analytics.php` file).
                            </p>
                        </div>
                    </>
                );
            default:
                return <h2 className="text-3xl font-bold mb-6">Page Not Found</h2>;
        }
    }, [page, data, isLoading, isDarkMode, totalDonations, pendingDonations, totalUsers]);

    return (
        <main className="p-4 sm:p-8">
            {isLoading ? (
                <div className="flex justify-center items-center h-96">
                    <p className="text-xl animate-pulse">Fetching data...</p>
                </div>
            ) : content}
        </main>
    );
};

const Sidebar = () => {
  const { isSidebarOpen, setIsSidebarOpen, isDarkMode, activePage, setActivePage } = React.useContext(AppContext);

  const navItems = [
    { name: 'Dashboard', icon: Home, page: 'dashboard' },
    { name: 'Donations', icon: Briefcase, page: 'donations' },
    { name: 'Feedback', icon: MessageSquare, page: 'feedback' },
    { name: 'Users', icon: Users, page: 'users' },
    { name: 'Analytics', icon: BarChart, page: 'analytics' },
  ];

  const handleLinkClick = (page) => {
    setActivePage(page);
    // Automatically close sidebar on small screens after selection
    if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 h-full ${isSidebarOpen ? 'w-64' : 'w-20'} 
                    ${isDarkMode ? 'bg-panel-color border-r border-border-color' : 'bg-white border-r border-gray-200'}
                    p-4 transition-all duration-300 z-30 shadow-xl md:shadow-none`}>
      <div className="flex items-center space-x-3 mb-8 cursor-pointer overflow-hidden">
        <span className="text-3xl font-extrabold text-green-accent">FS</span>
        <span className={`${isSidebarOpen ? 'opacity-100' : 'opacity-0'} whitespace-nowrap text-xl font-semibold transition-opacity duration-300`}>
          Food<b className="text-green-accent">Share</b>
        </span>
      </div>

      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.page}>
            <a 
              href="#" 
              onClick={() => handleLinkClick(item.page)}
              className={`flex items-center p-3 rounded-xl transition-colors duration-200 
                ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}
                ${item.page === activePage 
                    ? 'bg-green-accent text-white shadow-md' 
                    : isDarkMode ? 'text-text-color' : 'text-gray-700'
                }
                ${isSidebarOpen ? '' : 'justify-center'}
              `}
            >
              <item.icon className="w-6 h-6 shrink-0" />
              <span className={`ml-4 text-sm font-medium ${isSidebarOpen ? 'opacity-100' : 'opacity-0 absolute hidden'} whitespace-nowrap transition-opacity duration-300`}>
                {item.name}
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className="absolute bottom-6 left-4 right-4">
        {/* Mock Logout - Retained for UI consistency */}
        <a href="#" className={`flex items-center p-3 rounded-xl transition-colors duration-200 
          ${isDarkMode ? 'hover:bg-gray-700 text-text-color' : 'hover:bg-gray-100 text-gray-700'} mb-4 ${isSidebarOpen ? '' : 'justify-center'}`}>
          <LogOut className="w-6 h-6 shrink-0" />
          <span className={`ml-4 text-sm font-medium ${isSidebarOpen ? 'opacity-100' : 'opacity-0 absolute hidden'} transition-opacity duration-300`}>
            Logout (Mock)
          </span>
        </a>

        {/* Mode Toggle */}
        <div className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors duration-200 
          ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
          onClick={() => React.useContext(AppContext).setIsDarkMode(prev => !prev)}
        >
            <div className={`flex items-center ${isSidebarOpen ? '' : 'w-full justify-center'}`}>
                {isDarkMode ? 
                    <Sun className="w-6 h-6 text-yellow-300" /> : 
                    <Moon className="w-6 h-6 text-gray-700" />
                }
                <span className={`ml-4 text-sm font-medium ${isSidebarOpen ? 'opacity-100' : 'opacity-0 absolute hidden'} transition-opacity duration-300`}>
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </span>
            </div>
        </div>
      </div>
    </nav>
  );
};

const Header = () => {
  const { isDarkMode, setIsSidebarOpen } = React.useContext(AppContext);

  return (
    <header className={`sticky top-0 h-16 flex items-center justify-between px-4 sm:px-6 z-20 shadow-sm 
        ${isDarkMode ? 'bg-panel-color text-text-color' : 'bg-white text-gray-900'}`}
    >
      <div className="flex items-center space-x-4">
        <button 
          className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          onClick={() => setIsSidebarOpen(prev => !prev)}
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold hidden sm:block">
            ADMIN Dashboard
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium truncate hidden sm:inline text-black-light-color">
          Status: Logged In (No Auth)
        </span>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold 
            bg-green-accent text-white shadow-md`}>
          A
        </div>
      </div>
    </header>
  );
};

// --- Main App Component (App) ---

export default function AdminDashboard() {
  const { data, isLoading } = useDataFetcher();
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Initialize dark mode from localStorage
    if (typeof window !== 'undefined' && window.localStorage) {
        return localStorage.getItem('mode') === 'dark';
    }
    return false;
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState('dashboard');

  // Update localStorage and body class on dark mode change
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('mode', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('mode', 'light');
    }
  }, [isDarkMode]);

  // Adjust sidebar open state based on screen size (for initial load and resize)
  useEffect(() => {
    const handleResize = () => {
      // Close sidebar on small screens (<768px), keep open on large screens
      setIsSidebarOpen(window.innerWidth >= 768);
    };
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const providerValue = useMemo(() => ({
    isDarkMode,
    setIsDarkMode,
    isSidebarOpen,
    setIsSidebarOpen,
    activePage,
    setActivePage,
  }), [isDarkMode, isSidebarOpen, activePage]);


  const backgroundColor = isDarkMode ? 'var(--primary-color)' : 'rgb(243 244 246 / 1)'; // gray-100
  const sidebarWidthClass = isSidebarOpen ? 'md:ml-64' : 'md:ml-20';

  return (
    <AppContext.Provider value={providerValue}>
      <div className={`min-h-screen font-sans`} style={{ backgroundColor: backgroundColor }}>
        {/* Load Tailwind CSS and configure custom colors based on index.css variables */}
        <script src="https://cdn.tailwindcss.com"></script>
        <script>{`
            tailwind.config = {
                theme: {
                    extend: {
                        colors: {
                            'primary': 'var(--primary-color)',
                            'panel-color': 'var(--panel-color)',
                            'text-color': 'var(--text-color)',
                            'black-light-color': 'var(--black-light-color)',
                            'border-color': 'var(--border-color)',
                            'toggle-color': 'var(--toggle-color)',
                            'box1-color': 'var(--box1-color)',
                            'box2-color': 'var(--box2-color)',
                            'box3-color': 'var(--box3-color)',
                            'green-accent': '#06C167',
                        },
                        fontFamily: {
                            sans: ['Poppins', 'sans-serif'],
                        },
                    },
                },
                darkMode: 'class', // Enable dark mode via the 'dark' class on the body
            }
        `}</script>
        
        <style jsx global>{`
          /* Custom CSS Variables & Font (from admin/src/index.css) */
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600&display=swap');
          
          :root {
            --primary-color: #0E4BF1;
            --panel-color: #FFF;
            --text-color: #000;
            --black-light-color: #707070;
            --border-color: #e6e5e5;
            --toggle-color: #DDD;
            --box1-color: #4DA3FF;
            --box2-color: #FFE6AC;
            --box3-color: #E7D1FC;
            --green-accent: #06C167; 
          }

          /* Dark Mode Variables */
          .dark {
            --primary-color: #3A3B3C;
            --panel-color: #242526;
            --text-color: #CCC;
            --black-light-color: #DDD;
            --border-color: #393838;
            --toggle-color: #FFF;
          }

          body {
            font-family: 'Poppins', sans-serif;
            min-height: 100vh;
            /* background-color: var(--primary-color); <- Handled by React state for smoother transitions */
            transition: background-color 0.3s ease;
          }

          /* Ensure smooth transition for sidebar width */
          nav, .content-area {
            transition: margin-left 0.3s ease, width 0.3s ease, background-color 0.3s ease;
          }

          /* --- Responsive Table Styles (from index.css) --- */
          .responsive-table tr {
            border-bottom: 2px solid var(--border-color); 
            display: block; 
            margin-bottom: 1rem;
          }
          .responsive-table td {
            border-bottom: 1px solid var(--border-color); 
            display: block; 
            text-align: right; 
            font-size: 0.875rem; /* text-sm */
            padding: 8px 4px;
            color: var(--text-color);
          }
          .responsive-table td::before {
            content: attr(data-label);
            float: left;
            font-weight: 700; /* font-bold */
            text-transform: uppercase;
            color: var(--black-light-color);
          }
          .responsive-table th {
            display: none; /* Hide headers on small screens */
          }

          @media (min-width: 640px) { /* sm breakpoint */
            .responsive-table {
              table-layout: auto;
              width: 100%;
              border-collapse: collapse;
            }
            .responsive-table thead {
              display: table-header-group;
            }
            .responsive-table tr {
              display: table-row;
              border-bottom: 1px solid var(--border-color);
              margin-bottom: 0;
            }
            .responsive-table th {
              display: table-cell;
              text-align: left;
              padding: 0.5rem 1rem; /* px-4 py-2 */
              background-color: var(--panel-color); /* Light gray background for header */
              font-weight: 500; /* font-medium */
              color: var(--black-light-color);
            }
            .responsive-table td {
              display: table-cell;
              text-align: left;
              padding: 0.5rem 1rem;
              border-bottom: none;
              color: var(--text-color);
            }
            .responsive-table td::before {
              content: none;
            }
          }

          /* Sidebar close style */
          .w-20 {
            width: 5rem;
          }
        `}</style>
        
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div 
          className={`flex flex-col content-area min-h-screen ${sidebarWidthClass} transition-all duration-300`}
        >
          <Header />
          <PageContent 
            page={activePage} 
            data={data} 
            isLoading={isLoading} 
            isDarkMode={isDarkMode} 
          />
        </div>
        
        {/* Overlay for mobile when sidebar is open */}
        {isSidebarOpen && window.innerWidth < 768 && (
            <div 
                className="fixed inset-0 bg-black opacity-50 z-20 md:hidden" 
                onClick={() => setIsSidebarOpen(false)}
            ></div>
        )}

      </div>
    </AppContext.Provider>
  );
};

// src/components/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import {
  Menu,
  Search,
  Sun,
  Moon,
  Home,
  Users,
  Box,
  Bell,
  ChevronLeft,
  BarChart2,
  Calendar,
  Settings,
  LogOut,
  Grid,
} from "lucide-react";

const StatBox = ({ icon: Icon, title, number, className = "" }) => (
  <div
    className={`flex flex-col items-center rounded-xl p-5 shadow-sm min-w-[200px] ${className}`}
  >
    <div className="p-3 rounded-md bg-white/10 mb-3">
      <Icon className="w-8 h-8 text-slate-900 dark:text-slate-100" />
    </div>
    <div className="text-sm font-medium text-slate-700 dark:text-slate-200">
      {title}
    </div>
    <div className="text-3xl font-semibold text-slate-900 dark:text-white mt-2">
      {number}
    </div>
  </div>
);

export default function AdminDashboard() {
  // sidebar open/closed (true => expanded)
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const saved = localStorage.getItem("status");
    return saved ? saved === "open" : true;
  });

  // dark mode
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("mode");
    return saved ? saved === "dark" : false;
  });

  // mimic original admin.js behavior: persist and apply
  useEffect(() => {
    localStorage.setItem("status", sidebarOpen ? "open" : "close");
  }, [sidebarOpen]);

  useEffect(() => {
    localStorage.setItem("mode", dark ? "dark" : "light");
    // apply 'dark' class to html element so Tailwind's dark: utilities work
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);

  // sample table rows (kept as original placeholders)
  const sampleRows = [
    { id: 1, name: "Ravi Kumar", location: "Chennai", date: "2025-09-01", status: "Collected" },
    { id: 2, name: "Anita Sharma", location: "Bengaluru", date: "2025-09-03", status: "Pending" },
    { id: 3, name: "Ali Khan", location: "Hyderabad", date: "2025-09-05", status: "Collected" },
  ];

  return (
    <div className="min-h-screen bg-sky-700 dark:bg-slate-800 transition-colors">
      <div className="flex">
        {/* Sidebar */}
        <nav
          className={`fixed left-0 top-0 h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 p-4
            flex flex-col justify-between transition-all
            ${sidebarOpen ? "w-64" : "w-20"}`}
        >
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-emerald-400 flex items-center justify-center text-white font-bold">
                FF
              </div>
              <div className={`text-lg font-semibold text-slate-800 dark:text-slate-100 transition-opacity ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                Feeding Futures
              </div>
            </div>

            <ul className="space-y-1">
              <li>
                <a
                  href="#"
                  className="flex items-center gap-3 p-2 rounded-md text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Home className="w-5 h-5" />
                  <span className={`${sidebarOpen ? "inline" : "hidden"}`}>Dashboard</span>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="flex items-center gap-3 p-2 rounded-md text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Users className="w-5 h-5" />
                  <span className={`${sidebarOpen ? "inline" : "hidden"}`}>Users</span>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="flex items-center gap-3 p-2 rounded-md text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Grid className="w-5 h-5" />
                  <span className={`${sidebarOpen ? "inline" : "hidden"}`}>Donations</span>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="flex items-center gap-3 p-2 rounded-md text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <BarChart2 className="w-5 h-5" />
                  <span className={`${sidebarOpen ? "inline" : "hidden"}`}>Reports</span>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="flex items-center gap-3 p-2 rounded-md text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Calendar className="w-5 h-5" />
                  <span className={`${sidebarOpen ? "inline" : "hidden"}`}>Calendar</span>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="flex items-center gap-3 p-2 rounded-md text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Settings className="w-5 h-5" />
                  <span className={`${sidebarOpen ? "inline" : "hidden"}`}>Settings</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="pt-4">
            <div className={`flex items-center justify-between ${sidebarOpen ? "" : "flex-col gap-3"}`}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-300 dark:bg-slate-700 overflow-hidden">
                  {/* avatar */}
                  <img
                    src="img/facebook.png"
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className={`${sidebarOpen ? "block" : "hidden"}`}>
                  <div className="text-sm font-medium text-slate-800 dark:text-slate-100">Admin</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">admin@ff.com</div>
                </div>
              </div>

              <button
                onClick={() => setSidebarOpen((s) => !s)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                title="Toggle sidebar"
              >
                <ChevronLeft className={`w-5 h-5 transition-transform ${sidebarOpen ? "" : "rotate-180"}`} />
              </button>
            </div>

            <div className={`mt-4 flex items-center justify-between ${sidebarOpen ? "" : "flex-col gap-3"}`}>
              <button
                onClick={() => setDark((d) => !d)}
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                title="Toggle theme"
              >
                {dark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                <span className={`${sidebarOpen ? "inline" : "hidden"}`}>{dark ? "Dark" : "Light"}</span>
              </button>

              <a
                href="#logout"
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-red-600 dark:text-rose-300"
              >
                <LogOut className="w-4 h-4" />
                <span className={`${sidebarOpen ? "inline" : "hidden"}`}>Logout</span>
              </a>
            </div>
          </div>
        </nav>

        {/* Main content area */}
        <div
          className={`flex-1 min-h-screen transition-all duration-300 ml-[var(--sidebar-width)]`}
          style={{ marginLeft: sidebarOpen ? 256 : 80 }} // match nav widths
        >
          {/* topbar */}
          <div className="sticky top-0 z-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen((s) => !s)}
                className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                title="toggle sidebar"
              >
                <Menu className="w-5 h-5 text-slate-700 dark:text-slate-200" />
              </button>

              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Search className="w-4 h-4 text-slate-400 dark:text-slate-300" />
                </span>
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
                <Bell className="w-5 h-5 text-slate-700 dark:text-slate-200" />
              </button>

              <div className="text-right">
                <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">Admin</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Nelson hostel</div>
              </div>
            </div>
          </div>

          {/* content */}
          <main className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-sky-600 flex items-center justify-center text-white">
                  <Grid className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Dashboard</h1>
                  <p className="text-sm text-slate-500 dark:text-slate-300">Overview of recent activity</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="px-4 py-2 rounded-md bg-emerald-600 text-white">New</button>
                <button className="px-4 py-2 rounded-md border border-slate-200 dark:border-slate-700">Export</button>
              </div>
            </div>

            {/* Stat boxes */}
            <div className="flex gap-4 flex-wrap mb-6">
              <StatBox icon={Box} title="Total Donations" number="1,245" className="bg-white/80 dark:bg-slate-700/60" />
              <StatBox icon={Users} title="Active Users" number="3,452" className="bg-amber-100 dark:bg-slate-700/60" />
              <StatBox icon={BarChart2} title="Reports" number="18" className="bg-violet-100 dark:bg-slate-700/60" />
            </div>

            {/* Activity / Table */}
            <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100">Recent Donations</h3>
                <div className="text-sm text-slate-500 dark:text-slate-400">Showing last 7 entries</div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead className="text-sm text-slate-600 dark:text-slate-300 uppercase">
                    <tr>
                      <th className="p-3 text-left">#</th>
                      <th className="p-3 text-left">Donor</th>
                      <th className="p-3 text-left">Location</th>
                      <th className="p-3 text-left">Date</th>
                      <th className="p-3 text-left">Status</th>
                      <th className="p-3 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleRows.map((r) => (
                      <tr key={r.id} className="border-t border-slate-100 dark:border-slate-700">
                        <td className="p-3 text-sm text-slate-700 dark:text-slate-200">{r.id}</td>
                        <td className="p-3 text-sm text-slate-700 dark:text-slate-200">{r.name}</td>
                        <td className="p-3 text-sm text-slate-700 dark:text-slate-200">{r.location}</td>
                        <td className="p-3 text-sm text-slate-700 dark:text-slate-200">{r.date}</td>
                        <td className="p-3 text-sm">
                          <span className={`px-3 py-1 rounded-full text-xs ${r.status === "Collected" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
                            {r.status}
                          </span>
                        </td>
                        <td className="p-3 text-sm">
                          <button className="px-3 py-1 rounded-md border border-slate-200 dark:border-slate-700">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Activity data / small cards below */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                <h4 className="text-sm font-medium text-slate-700 dark:text-slate-200">Activity</h4>
                <div className="mt-3 text-sm text-slate-600 dark:text-slate-300">No recent alerts</div>
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                <h4 className="text-sm font-medium text-slate-700 dark:text-slate-200">Quick Links</h4>
                <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <li><a href="#" className="hover:underline">View donors</a></li>
                  <li><a href="#" className="hover:underline">Manage NGOs</a></li>
                </ul>
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                <h4 className="text-sm font-medium text-slate-700 dark:text-slate-200">Server</h4>
                <div className="mt-3 text-sm text-slate-600 dark:text-slate-300">All systems operational</div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

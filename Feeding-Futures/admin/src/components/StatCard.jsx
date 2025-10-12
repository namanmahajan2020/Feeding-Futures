import React from "react";

// Color classes for light mode
const colorClasses = {
  blue: "text-sky-600 bg-sky-100",
  yellow: "text-yellow-600 bg-yellow-100",
  purple: "text-purple-600 bg-purple-100",
  green: "text-emerald-600 bg-emerald-100",
};

// Color classes for dark mode
const darkClasses = {
  blue: "dark:bg-sky-900 dark:text-sky-300",
  yellow: "dark:bg-yellow-900 dark:text-yellow-300",
  purple: "dark:bg-purple-900 dark:text-purple-300",
  green: "dark:bg-emerald-900 dark:text-emerald-300",
};

// StatCard Component
const StatCard = ({ icon: Icon, title, value, isDarkMode, color }) => {
  return (
    <div
      className={`p-6 rounded-2xl shadow-lg ${isDarkMode ? "bg-slate-800 text-slate-200" : "bg-white text-slate-900"} transition-shadow hover:shadow-xl`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3
          className={`text-sm font-medium uppercase ${
            isDarkMode ? "text-slate-400" : "text-slate-500"
          }`}
        >
          {title}
        </h3>
        <div
          className={`p-3 rounded-xl ${colorClasses[color]} ${
            isDarkMode ? darkClasses[color] : ""
          }`}
        >
          {/* Render the icon component passed as a prop */}
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <p className="text-4xl font-extrabold">{value}</p>
    </div>
  );
};

export default StatCard;

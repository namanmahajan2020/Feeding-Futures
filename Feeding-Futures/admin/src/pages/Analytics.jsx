import React from "react";
import { useContext } from "react";
import { AppContext } from "../components/AppContext.jsx";
import { useDataFetcher } from "../hooks.js";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area,
  CartesianGrid,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ComposedChart, // <-- Add this
} from "recharts";



const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

const Analytics = () => {
  const { isDarkMode } = useContext(AppContext); // ✅ get isDarkMode here
  const { data, isLoading, error } = useDataFetcher();
  const { donations = [], users = [] } = data || {};
  const feedback = donations.filter(d => d.rating != null);
  const validRatings = feedback.filter(f => f.rating > 0);
  const avgRating = validRatings.reduce((acc, f) => acc + f.rating, 0) / validRatings.length;
  // map donations with ratings to feedback


  if (isLoading) return <p className="text-center mt-10">Loading data...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  // ✅ Summaries
  const totalDonations = donations.length;
  const totalUsers = users.length;
  const totalFeedback = feedback.length;

  // ✅ Donation status
  const statusCounts = donations.reduce((acc, d) => {
    acc[d.status] = (acc[d.status] || 0) + 1;
    return acc;
  }, {});
  const statusData = Object.entries(statusCounts).map(([name, value]) => ({
    name,
    value,
  }));

  // ✅ Category data
  const categoryCounts = donations.reduce((acc, d) => {
    acc[d.category] = (acc[d.category] || 0) + 1;
    return acc;
  }, {});
  const categoryData = Object.entries(categoryCounts).map(([name, value]) => ({
    name,
    value,
  }));

  // ✅ Donations over time (assuming donation.date)
  const timeData = donations.reduce((acc, d) => {
    const date = new Date(d.createdAt).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});
  const donationTimeline = Object.entries(timeData).map(([name, value]) => ({
    name,
    value,
  }));

  // ✅ User registration over time (assuming user.createdAt)
  const userTimeData = users.reduce((acc, u) => {
    const date = new Date(u.createdAt).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});
  const userTimeline = Object.entries(userTimeData).map(([name, value]) => ({
    name,
    value,
  }));

  // ✅ Gender distribution for users
  const genderCounts = users.reduce((acc, user) => {
    const gender = user.gender || "Unknown";
    acc[gender] = (acc[gender] || 0) + 1;
    return acc;
  }, {});
  const genderData = Object.entries(genderCounts).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className=" min-h-screen m-5">
      <h2 className="text-3xl font-bold mb-6 text-sky-700 dark:text-sky-400">
        📊 Analytics Dashboard
      </h2>

      {/* --- Summary Cards --- */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-16 mb-10 justify-center">
        <div className={`shadow-md rounded-2xl bg-slate-900 p-5 text-center ${isDarkMode ? "bg-sky-900 brightness-90 text-white border border-slate-700" : "border-sky-50 bg-gradient-to-t from-blue-100 to-green-50 text-slate-900"} transition-shadow hover:shadow-xl`}>
          <h3 className="text-lg font-semibold">Total Donations</h3>
          <p className="text-3xl font-bold text-blue-600">{totalDonations}</p>
        </div>
        <div className={`shadow-md rounded-2xl bg-slate-900 p-5 text-center ${isDarkMode ? "bg-sky-900 brightness-90 text-white border border-slate-700" : "border-sky-50 bg-gradient-to-t from-blue-100 to-green-50 text-slate-900"} transition-shadow hover:shadow-xl`}>
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-3xl font-bold text-green-600">{totalUsers}</p>
        </div>
        <div className={`shadow-md rounded-2xl bg-slate-900 p-5 text-center ${isDarkMode ? "bg-sky-900 brightness-90 text-white border border-slate-700" : "border-sky-50 bg-gradient-to-t from-blue-100 to-green-50 text-slate-900"} transition-shadow hover:shadow-xl`}>
          <h3 className="text-lg font-semibold">Total Feedback</h3>
          <p className="text-3xl font-bold text-yellow-600">{totalFeedback}</p>
        </div>
      </div>


      {/* --- Charts Grid --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Donation Status */}
        <ChartCard title="Donation Status Overview">
          <BarChart data={statusData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ChartCard>

        {/* Donation Categories */}
        <ChartCard title="Donation Category Distribution">
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {categoryData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ChartCard>

        {/* Donations Over Time */}
        <ChartCard title="Donations Over Time">
          <LineChart data={donationTimeline}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#00C49F" />
          </LineChart>
        </ChartCard>

        {/* Orders Rating */}
        <ChartCard title="Orders Rating">
          {validRatings.length > 0 ? (
            <RadarChart outerRadius={120} data={validRatings.map((f, idx) => ({
              name: `Order ${idx + 1}`,
              rating: f.rating
            }))}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" tick={{ fill: isDarkMode ? "white" : "black", fontSize: 10 }} />
              <PolarRadiusAxis angle={30} domain={[0, 5]} />
              <Radar name="Rating" dataKey="rating" stroke="#FF8042" fill="#FF8042" fillOpacity={0.6} />
              <Tooltip formatter={(value) => `${value} ⭐`} />
            </RadarChart>
          ) : (
            <p className="text-center mt-5">No ratings available</p>
          )}
        </ChartCard>


        {/* User Gender Distribution (New Donut Chart) */}
        <ChartCard title="User Gender Distribution" isDarkMode={isDarkMode}>
          <PieChart>
            <Pie
              data={genderData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              label={{ fill: isDarkMode ? "white" : "black" }}
              paddingAngle={5}
            // dataKey="value"
            >
              {genderData.map((entry, index) => (
                <Cell key={`donut-cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ChartCard>

        {/* User Growth */}
        <ChartCard title="User Registrations Over Time">
          <AreaChart data={userTimeline}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="value" fill="#82ca9d" stroke="#82ca9d" />
          </AreaChart>
        </ChartCard>

      </div>
    </div>
  );
};

// ✅ Reusable Chart Wrapper
const ChartCard = ({ title, children }) => {
  const { isDarkMode } = useContext(AppContext);

  return (
    <div
      className={`shadow-2xl rounded-2xl p-5 mb-6 border-1 ${isDarkMode
        ? "bg-slate-900 border-slate-700"
        : "bg-gradient-to-b from-blue-100 to-green-50 border-sky-100"
        }`}
    >
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        {children}
      </ResponsiveContainer>
    </div>
  );
};

export default Analytics;

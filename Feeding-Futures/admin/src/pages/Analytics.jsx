import React from "react";
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
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

const Analytics = () => {
  const { data, isLoading, error } = useDataFetcher();
  const { donations = [], feedback = [], users = [] } = data || {};

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
    const date = new Date(d.date).toLocaleDateString();
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

  // ✅ Feedback sentiment (assuming feedback.rating or sentiment)
  const feedbackCounts = feedback.reduce((acc, f) => {
    const key =
      f.rating >= 4
        ? "Positive"
        : f.rating === 3
        ? "Neutral"
        : "Negative";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const feedbackData = Object.entries(feedbackCounts).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        📊 Analytics Dashboard
      </h2>

      {/* --- Summary Cards --- */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow-md rounded-2xl p-5 text-center">
          <h3 className="text-lg font-semibold text-gray-700">Total Donations</h3>
          <p className="text-3xl font-bold text-blue-600">{totalDonations}</p>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-5 text-center">
          <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
          <p className="text-3xl font-bold text-green-600">{totalUsers}</p>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-5 text-center">
          <h3 className="text-lg font-semibold text-gray-700">Total Feedback</h3>
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

        {/* Feedback Sentiment */}
        <ChartCard title="Feedback Sentiment Analysis">
          <PieChart>
            <Pie
              data={feedbackData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {feedbackData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ChartCard>
      </div>
    </div>
  );
};

// ✅ Reusable Chart Wrapper
const ChartCard = ({ title, children }) => (
  <div className="bg-white shadow-md rounded-2xl p-5">
    <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>
    <ResponsiveContainer width="100%" height={300}>
      {children}
    </ResponsiveContainer>
  </div>
);

export default Analytics;

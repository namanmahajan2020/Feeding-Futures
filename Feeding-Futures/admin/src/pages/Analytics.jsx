import React, { useContext } from "react";
import { AppContext } from "../components/AppContext.jsx";
import { useDataFetcher } from "../hooks.js";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

const Analytics = () => {
  const { isDarkMode } = useContext(AppContext);
  const { data, isLoading, error } = useDataFetcher();
  const { donations = [], users = [] } = data || {};
  const feedback = donations.filter((donation) => donation.rating != null);
  const validRatings = feedback.filter((entry) => entry.rating > 0);

  if (isLoading) return <p className="text-center mt-10">Loading data...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  const totalDonations = donations.length;
  const totalUsers = users.length;
  const totalFeedback = feedback.length;

  const statusCounts = donations.reduce((acc, donation) => {
    acc[donation.status] = (acc[donation.status] || 0) + 1;
    return acc;
  }, {});
  const statusData = Object.entries(statusCounts).map(([name, value]) => ({ name, value }));

  const categoryCounts = donations.reduce((acc, donation) => {
    acc[donation.category] = (acc[donation.category] || 0) + 1;
    return acc;
  }, {});
  const categoryData = Object.entries(categoryCounts).map(([name, value]) => ({ name, value }));

  const timeData = donations.reduce((acc, donation) => {
    const date = new Date(donation.createdAt).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});
  const donationTimeline = Object.entries(timeData).map(([name, value]) => ({ name, value }));

  const userTimeData = users.reduce((acc, user) => {
    const date = new Date(user.createdAt).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});
  const userTimeline = Object.entries(userTimeData).map(([name, value]) => ({ name, value }));

  const genderCounts = users.reduce((acc, user) => {
    const gender = user.gender || "Unknown";
    acc[gender] = (acc[gender] || 0) + 1;
    return acc;
  }, {});
  const genderData = Object.entries(genderCounts).map(([name, value]) => ({ name, value }));

  return (
    <div className="admin-page min-h-screen m-5">
      <h2 className="admin-fade-up mb-6 text-3xl font-bold text-sky-700 dark:text-sky-400">
        Analytics Dashboard
      </h2>

      <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <SummaryCard isDarkMode={isDarkMode} label="Total Donations" value={totalDonations} valueClass="text-blue-600" />
        <SummaryCard isDarkMode={isDarkMode} label="Total Users" value={totalUsers} valueClass="text-green-600" />
        <SummaryCard isDarkMode={isDarkMode} label="Total Feedback" value={totalFeedback} valueClass="text-yellow-600" />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <ChartCard title="Donation Status Overview">
          <BarChart data={statusData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ChartCard>

        <ChartCard title="Donation Category Distribution">
          <PieChart>
            <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
              {categoryData.map((entry, index) => (
                <Cell key={`${entry.name}-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ChartCard>

        <ChartCard title="Donations Over Time">
          <LineChart data={donationTimeline}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#00C49F" />
          </LineChart>
        </ChartCard>

        <ChartCard title="Orders Rating">
          {validRatings.length > 0 ? (
            <RadarChart
              outerRadius={120}
              data={validRatings.map((entry, index) => ({
                name: `Order ${index + 1}`,
                rating: entry.rating,
              }))}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="name" tick={{ fill: isDarkMode ? "white" : "black", fontSize: 10 }} />
              <PolarRadiusAxis angle={30} domain={[0, 5]} />
              <Radar name="Rating" dataKey="rating" stroke="#FF8042" fill="#FF8042" fillOpacity={0.6} />
              <Tooltip formatter={(value) => `${value} stars`} />
            </RadarChart>
          ) : (
            <p className="mt-5 text-center">No ratings available</p>
          )}
        </ChartCard>

        <ChartCard title="User Gender Distribution">
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
            >
              {genderData.map((entry, index) => (
                <Cell key={`gender-${entry.name}-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ChartCard>

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

const SummaryCard = ({ isDarkMode, label, value, valueClass }) => (
  <div
    className={`admin-card admin-fade-up rounded-2xl p-5 text-center shadow-md hover:shadow-xl ${
      isDarkMode
        ? "bg-sky-900 brightness-90 text-white border border-slate-700"
        : "border-sky-50 bg-gradient-to-t from-blue-100 to-green-50 text-slate-900"
    }`}
  >
    <h3 className="text-lg font-semibold">{label}</h3>
    <p className={`text-3xl font-bold ${valueClass}`}>{value}</p>
  </div>
);

const ChartCard = ({ title, children }) => {
  const { isDarkMode } = useContext(AppContext);

  return (
    <div
      className={`admin-card admin-fade-up mb-6 rounded-2xl border p-5 shadow-2xl ${
        isDarkMode
          ? "bg-slate-900 border-slate-700"
          : "bg-gradient-to-b from-blue-100 to-green-50 border-sky-100"
      }`}
    >
      <h3 className="mb-4 text-lg font-semibold">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        {children}
      </ResponsiveContainer>
    </div>
  );
};

export default Analytics;

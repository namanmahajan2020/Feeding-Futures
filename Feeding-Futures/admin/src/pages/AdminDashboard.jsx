// src/pages/Dashboard.jsx

import React from "react";
import StatCard from "../components/StatCard";
import TableComponent from "../components/TableComponent";
import { FaBox, FaClock, FaUsers, FaComments } from "react-icons/fa";

const Dashboard = ({ data, isLoading, isDarkMode }) => {
  const totalDonations = data.donations.length;
  const pendingDonations = data.donations.filter(
    (d) => d.status === "Pending"
  ).length;
  const totalUsers = data.users.length;

  // Columns for Donations Table
  const donationColumns = [
    { header: "ID", field: "id" },
    { header: "Name", field: "name" },
    { header: "Food", field: "food" },
    { header: "Category", field: "category" },
    { header: "Phone No", field: "phoneno" },
    { header: "Date", field: "date" },
    { header: "Address", field: "address" },
    { header: "Quantity", field: "quantity" },
    { header: "Status", field: "status" },
  ];

  const donations = data?.donations?.slice(0, 5) || [];

  return (
    <main
      className={`p-4 sm:p-8 ${
        isDarkMode ? "text-slate-200" : "text-slate-800"
      }`}
    >
      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <p className="text-xl animate-pulse text-slate-400">
            Fetching data...
          </p>
        </div>
      ) : (
        <>
          <h2 className="text-3xl font-bold mb-6 text-sky-700 dark:text-sky-400">
            Dashboard Overview
          </h2>

          {/* Statistic Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center gap-8">
            <StatCard
              title="Total Donations"
              value={totalDonations}
              icon={FaBox}
              color="green"
              isDarkMode={isDarkMode}
            />

            <StatCard
              title="Pending Collections"
              value={pendingDonations}
              icon={FaClock}
              color="yellow"
              isDarkMode={isDarkMode}
            />

            <StatCard
              title="Total Users/Admins"
              value={totalUsers}
              icon={FaUsers}
              color="blue"
              isDarkMode={isDarkMode}
            />

            <StatCard
              title="New Feedback"
              value={data.feedback.length}
              icon={FaComments}
              color="purple"
              isDarkMode={isDarkMode}
            />
          </div>

          {/* Donations Table */}
          <div className="mt-10">
            <TableComponent
              title="Recent Donations"
              columns={donationColumns}
              data={donations}
              loading={isLoading}
              isDarkMode={isDarkMode}
            />
          </div>
        </>
      )}
    </main>
  );
};

export default Dashboard;

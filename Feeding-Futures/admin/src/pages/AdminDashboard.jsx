import React, { useMemo } from 'react';
import StatCard from '../components/StatCard';
import DonationsTable from '../components/DonationsTable';
import { FaBox, FaClock, FaUsers, FaComments } from "react-icons/fa";
const Dashboard = ({ data, isLoading, isDarkMode }) => {
  const totalDonations = data.donations.length;
  const pendingDonations = data.donations.filter(d => d.status === 'Pending').length;
  const totalUsers = data.users.length;

  return (
    <main className={`p-4 sm:p-8 ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <p className="text-xl animate-pulse text-slate-400">Fetching data...</p>
        </div>
      ) : (
        <>
          <h2 className="text-3xl font-bold mb-6 text-sky-700 dark:text-sky-400">Dashboard Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Donations"
              value={totalDonations}
              icon={FaBox}  // Pass the component directly (not as JSX)
              color="green"
              isDarkMode={isDarkMode}
            />

            <StatCard
              title="Pending Collections"
              value={pendingDonations}
              icon={FaClock}  // Pass the component directly (not as JSX)
              color="yellow"
              isDarkMode={isDarkMode}
            />

            <StatCard
              title="Total Users/Admins"
              value={totalUsers}
              icon={FaUsers}  // Pass the component directly (not as JSX)
              color="blue"
              isDarkMode={isDarkMode}
            />

            <StatCard
              title="New Feedback"
              value={data.feedback.length}
              icon={FaComments}  // Pass the component directly (not as JSX)
              color="purple"
              isDarkMode={isDarkMode}
            />
          </div>
          <DonationsTable donations={data.donations.slice(0, 5)} isLoading={isLoading} isDarkMode={isDarkMode} />
        </>
      )}
    </main>
  );
};

export default Dashboard;

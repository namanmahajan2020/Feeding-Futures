// Feedback.jsx

import React from "react";
import TableComponent from "../components/TableComponent";

const Feedback = ({ data, isLoading, isDarkMode }) => {
  // Define the columns for the feedback table
  const feedbackColumns = [
    { header: "Feedback ID", field: "id" },
    { header: "Name", field: "name" },       // Changed from User → Name
    { header: "Message", field: "message" },
    { header: "Email", field: "email" },     // Added Email after Date
    { header: "Date", field: "date" },
  ];

  return (
    <div className="m-10">
      <h2 className="text-3xl font-bold mb-6 text-sky-700 dark:text-sky-400">User Feedback</h2>
      <TableComponent
        title="Feedback"
        columns={feedbackColumns}
        data={data.feedback} // Assuming data.feedback contains the feedback data
        loading={isLoading}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default Feedback;

// Feedback.jsx

import React from "react";
import TableComponent from "../components/TableComponent"; // Ensure TableComponent is imported

const Feedback = ({ data, isLoading, isDarkMode }) => {
  // Define the columns for the feedback table
  const feedbackColumns = [
    { header: "Feedback ID", field: "id" },
    { header: "User", field: "user" },
    { header: "Message", field: "message" },
    { header: "Date", field: "date" },
    { header: "Status", field: "status" }
  ];

  return (
    <div className="m-10">
            <h2 className="text-3xl font-bold mb-6 text-sky-700 dark:text-pink-400">Dashboard Overview</h2>
      {/* Pass the feedback columns to the TableComponent */}
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

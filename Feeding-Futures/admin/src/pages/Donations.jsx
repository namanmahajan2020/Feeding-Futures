// src/pages/Donations.jsx

import React from "react";
import TableComponent from "../components/TableComponent"; 

const Donations = ({ data, isLoading, isDarkMode }) => {
  // Columns for the donations table
  const columns = [
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

  // Handle missing or empty data safely
  const donations = data?.donations?.slice(0, 5) || [];

  return (
    <div className="m-10">
      <h2 className="text-3xl font-bold mb-6 text-sky-700 dark:text-sky-400">
        Donations
      </h2>
      <TableComponent
        title="Donations"
        columns={columns}
        data={donations}
        loading={isLoading}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default Donations;

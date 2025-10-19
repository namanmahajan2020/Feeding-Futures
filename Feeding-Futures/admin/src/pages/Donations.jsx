// src/pages/Donations.jsx

import React from "react";
import TableComponent from "../components/TableComponent";

const Donations = ({ data, isLoading, isDarkMode }) => {
  // Columns for the donations table
  const columns = [
    { header: "Name", field: "name" },
    { header: "Food", field: "foodname" },
    { header: "Type", field: "meal" },
    { header: "Category", field: "category" },
    { header: "Phone No", field: "phoneno" },
    { header: "Date", field: "createdAt" },
    { header: "Address", field: "address" },
    { header: "District", field: "district" },
    { header: "Quantity", field: "quantity" },
    { header: "Status", field: "status" },
  ];

  // Handle missing or empty data safely
  const donations = data?.donations || [];

  return (
    <div className="m-5">
      <h2 className="text-3xl font-bold mb-6 text-sky-700 dark:text-sky-400">
        User Donations
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

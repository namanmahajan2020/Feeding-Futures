// src/components/DonationsTable.jsx
import React from "react";
import TableComponent from "./TableComponent";

const DonationsTable = ({ donations, isLoading, isDarkMode }) => {
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

  return (
    <TableComponent
      title="Donations"
      columns={columns}
      data={donations}
      loading={isLoading}
      isDarkMode={isDarkMode}
    />
  );
};

export default DonationsTable;

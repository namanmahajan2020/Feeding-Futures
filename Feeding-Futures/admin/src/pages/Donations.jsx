// Donations.jsx

import React from "react";
import TableComponent from "../components/TableComponent";  // Make sure TableComponent is correctly imported

const Donations = ({ data, isLoading, isDarkMode }) => {
  // Define the columns for the donations table
  const donationsColumns = [
    { header: "Donor Name", field: "donorName" },
    { header: "Amount", field: "amount" },
    { header: "Date", field: "date" },
    { header: "Status", field: "status" },
  ];

  return (
    <div>
      {/* Pass the donations columns to the TableComponent */}
      <TableComponent 
        title="Donations" 
        columns={donationsColumns} 
        data={data.donations} 
        loading={isLoading} 
        isDarkMode={isDarkMode} 
      />
    </div>
  );
};

export default Donations;

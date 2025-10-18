// Users.jsx

import React from "react";
import TableComponent from "../components/TableComponent"; // Make sure TableComponent is correctly imported

const Users = ({ data, isLoading, isDarkMode }) => {
  // Define the columns for the users table
  const usersColumns = [
    { header: "ID", field: "id" },
    { header: "Name", field: "name" },
    { header: "Role", field: "role" },
    { header: "Location", field: "location" },
    { header: "Last Active", field: "lastActive" },
  ];

  return (
    <div className="m-10">
            <h2 className="text-3xl font-bold mb-6 text-sky-700 dark:text-sky-400">Users</h2>
      <TableComponent
        title="Users"
        columns={usersColumns}
        data={data.users}
        loading={isLoading}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default Users;

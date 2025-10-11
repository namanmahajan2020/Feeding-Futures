import React from 'react';
import TableComponent from './TableComponent';

const Users = ({ data, isLoading, isDarkMode }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-sky-700 dark:text-sky-400">Admin & User Management</h2>
      {/* <TableComponent title="Users" columns={usersColumns} data={data.users} loading={isLoading} isDarkMode={isDarkMode} /> */}
    </div>
  );
};

export default Users;

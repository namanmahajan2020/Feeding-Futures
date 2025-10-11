import React from 'react';
import TableComponent from './TableComponent';

const Donations = ({ data, isLoading, isDarkMode }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-sky-700 dark:text-sky-400">Manage Food Donations</h2>
      {/* <TableComponent title="Donations" columns={donationsColumns} data={data.donations} loading={isLoading} isDarkMode={isDarkMode} /> */}
    </div>
  );
};

export default Donations;

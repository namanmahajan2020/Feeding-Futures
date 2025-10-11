import React from 'react';
import TableComponent from './TableComponent';

const Feedback = ({ data, isLoading, isDarkMode }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-sky-700 dark:text-sky-400">Manage User Feedback</h2>
      {/* <TableComponent title="Feedback" columns={feedbackColumns} data={data.feedback} loading={isLoading} isDarkMode={isDarkMode} /> */}
    </div>
  );
};

export default Feedback;

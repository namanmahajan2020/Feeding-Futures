// TableComponent.jsx

import React from "react";

const TableComponent = ({ title, columns, data, loading, isDarkMode }) => {
  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  return (
    <div className={`table-container ${isDarkMode ? 'dark' : 'light'}`}>
      <h3>{title}</h3>
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.field}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {columns.map((col) => (
                <td key={col.field}>{item[col.field]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;

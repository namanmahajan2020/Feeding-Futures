// src/components/TableComponent.jsx
import React from "react";

const TableComponent = ({ columns, data, isLoading }) => {
  if (isLoading) return <p>Loading...</p>;

  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.accessor || col}>{col.header || col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            {columns.map((col) => (
              <td key={col.accessor || col}>{row[col.accessor || col]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;

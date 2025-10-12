// TableComponent.jsx

import React from "react";

const TableComponent = ({ title, columns, data, loading, isDarkMode }) => {
  if (loading) {
    return <p className="text-center text-slate-500 dark:text-slate-400">Loading...</p>;
  }

  if (!data || data.length === 0) {
    return <p className="text-center text-slate-500 dark:text-slate-400">No data available</p>;
  }

  return ( 
    <section className="bg-white dark:bg-slate-900 border m-10 ml-2 border-slate-200 dark:border-slate-700 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100">{title}</h3>
        <div className="text-sm text-slate-500 dark:text-slate-400">Showing last {data.length} entries</div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="text-sm text-slate-600 dark:text-slate-300 uppercase">
            <tr>
              {columns.map((col) => (
                <th key={col.field} className="p-3 text-left">{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-t border-slate-100 dark:border-slate-700">
                {columns.map((col) => (
                  <td key={col.field} className="p-3 text-sm text-slate-700 dark:text-slate-200">
                    {item[col.field]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TableComponent;

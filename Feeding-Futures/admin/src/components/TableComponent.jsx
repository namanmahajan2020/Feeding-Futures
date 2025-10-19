// TableComponent.jsx
import React from "react";

const TableComponent = ({ title, columns, data, loading, isDarkMode }) => {
  if (loading) {
    return (
      <p className={`text-center text-2xl mt-52 ${isDarkMode ? "text-slate-300" : "text-sky-900"}`}>
        Loading...
      </p>
    );
  }

  if (!data || data.length === 0) {
    return (
      <p className={`text-center ${isDarkMode ? "text-slate-300" : "text-sky-900"}`}>
        No data available
      </p>
    );
  }

  return (
    <section
      className={`${isDarkMode
        ? "bg-slate-900 border-slate-700"
        : "bg-gradient-to-b from-blue-100 to-green-50 border-sky-800"
        } border rounded-lg p-4`}
    >

      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead className={`text-sm ${isDarkMode ? "text-slate-300" : "text-sky-900"} uppercase`}>
            <tr>
              {columns.map((col) => (
                <th key={col.field} className="p-3 text-left text-pink-500">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr
                key={item._id || item.id || `${title}-${index}`}
                className="border-t border-slate-100 dark:border-purple-400"
              >
                {columns.map((col) => (
                  <td
                    key={`${col.field}-${item._id || item.id || index}`}
                    className={`text-sm font-semibold p-3 ${isDarkMode ? "text-slate-300" : "text-sky-800"}`}
                  >
                    {col.field === "createdAt" && item[col.field]
                      ? new Date(item[col.field]).toLocaleDateString("en-GB") // format date
                      : item[col.field] || "—"}
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

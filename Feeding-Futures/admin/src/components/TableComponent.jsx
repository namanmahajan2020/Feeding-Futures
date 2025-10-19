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
          <thead
            className={`text-sm ${isDarkMode ? "text-slate-300" : "text-sky-900"
              } uppercase`}
          >
            <tr>
              <th className="p-3 text-left text-pink-500">#</th> {/* Serial Number Header */}
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
                <td
                  className={`text-sm font-semibold p-3 ${isDarkMode ? "text-slate-300" : "text-sky-800"
                    }`}
                >
                  {index + 1} {/* Serial Number */}
                </td>

                {columns.map((col) => (
                  <td
                    key={`${col.field}-${item._id || item.id || index}`}
                    className={`text-sm font-semibold p-3 ${isDarkMode ? "text-slate-300" : "text-sky-800"
                      }`}
                  >
                    {(() => {
                      if (col.field === "createdAt") {
                        return item[col.field]
                          ? new Date(item[col.field]).toLocaleDateString("en-GB")
                          : "—";
                      }

                      if (col.field === "status") {
                        const status = item[col.field] || "—";
                        const baseBadge = "px-3 py-1 rounded-full text-xs font-bold";
                        const statusStyles = {
                          Collected:
                            "bg-[#d0fae5] text-[#006045]",
                          Pending:
                            "bg-[#fef3c6] text-[#973c00]",
                          Default: isDarkMode
                            ? "bg-slate-600 text-white"
                            : "bg-slate-300 text-black",
                        };

                        const statusClass = statusStyles[status] || statusStyles.Default;

                        return <span className={`${baseBadge} ${statusClass}`}>{status}</span>;
                      }

                      if (col.field === "quantity") {
                        return item[col.field] ? `${item[col.field]} kg` : "—";
                      }

                      return item[col.field] || "—";
                    })()}
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

import React from 'react';

const TableCell = ({ label, children }) => (
  <td className="p-3 text-center border-t border-gray-200 block md:table-cell" data-label={label}>
    <span className="md:hidden font-bold uppercase text-xs float-left mr-2 text-gray-500">{label}:</span>
    {children}
  </td>
);

export default TableCell;

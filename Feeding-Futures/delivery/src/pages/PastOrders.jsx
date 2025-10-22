import React from 'react';

// Sample data for past orders (you can replace this with data fetched from an API)
const pastOrders = [
  {
    id: 1,
    date: '2025-10-10',
    items: ['Pizza', 'Pasta', 'Salad'],
    total: 29.99,
    status: 'Delivered',
  },
  {
    id: 2,
    date: '2025-10-05',
    items: ['Burger', 'Fries', 'Soda'],
    total: 19.99,
    status: 'Delivered',
  },
  {
    id: 3,
    date: '2025-09-28',
    items: ['Sushi', 'Miso Soup'],
    total: 22.50,
    status: 'Pending',
  },
];

const PastOrders = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Past Orders</h2>
      
      <div className="space-y-4">
        {pastOrders.map((order) => (
          <div
            key={order.id}
            className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Order #{order.id}</h3>
              <span className="text-sm text-gray-500">{order.date}</span>
            </div>
            
            <ul className="space-y-1 mb-3">
              {order.items.map((item, index) => (
                <li key={index} className="text-sm text-gray-700">{item}</li>
              ))}
            </ul>
            
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg text-indigo-600">Total: ${order.total.toFixed(2)}</span>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  order.status === 'Delivered'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-yellow-100 text-yellow-600'
                }`}
              >
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PastOrders;

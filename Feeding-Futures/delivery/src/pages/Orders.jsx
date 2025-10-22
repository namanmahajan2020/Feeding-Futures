import React, { useState } from 'react';

// Sample order data (replace this with actual data or API calls)
const orders = [
  { id: 1, customer: 'John Doe', items: ['Pizza', 'Burger'], total: 25.50, status: 'Pending' },
  { id: 2, customer: 'Jane Smith', items: ['Sushi', 'Spring Rolls'], total: 18.75, status: 'Delivered' },
  { id: 3, customer: 'Alice Johnson', items: ['Tacos', 'Burrito'], total: 22.30, status: 'In Progress' },
  { id: 4, customer: 'Bob Brown', items: ['Salad', 'Juice'], total: 12.00, status: 'Delivered' },
  { id: 5, customer: 'Charlie Lee', items: ['Steak', 'Fries'], total: 30.40, status: 'Pending' },
];

const Orders = () => {
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Filter orders based on selected status
  const filteredOrders = selectedStatus === 'All' 
    ? orders 
    : orders.filter(order => order.status === selectedStatus);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Orders</h2>

      {/* Filter Controls */}
      <div className="mb-6 flex justify-center space-x-4">
        <button
          onClick={() => setSelectedStatus('All')}
          className={`px-4 py-2 rounded-md text-sm ${selectedStatus === 'All' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
        >
          All
        </button>
        <button
          onClick={() => setSelectedStatus('Pending')}
          className={`px-4 py-2 rounded-md text-sm ${selectedStatus === 'Pending' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
        >
          Pending
        </button>
        <button
          onClick={() => setSelectedStatus('In Progress')}
          className={`px-4 py-2 rounded-md text-sm ${selectedStatus === 'In Progress' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
        >
          In Progress
        </button>
        <button
          onClick={() => setSelectedStatus('Delivered')}
          className={`px-4 py-2 rounded-md text-sm ${selectedStatus === 'Delivered' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
        >
          Delivered
        </button>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Order #{order.id}</h3>
              <span className="text-sm text-gray-500">{order.customer}</span>
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
                    : order.status === 'Pending'
                    ? 'bg-yellow-100 text-yellow-600'
                    : 'bg-blue-100 text-blue-600'
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

export default Orders;

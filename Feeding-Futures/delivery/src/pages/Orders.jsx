import React, { useState } from 'react';

const Orders = () => {
  const [search, setSearch] = useState('');
  
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Search Section */}
      <section className="bg-white p-8 shadow-md mt-6">
        <div className="container mx-auto flex flex-col items-center space-y-6">
          <h2 className="text-3xl font-semibold">Find Nearby Food Providers</h2>
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search for food providers, events, or donations..."
            className="w-full max-w-md p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Search
          </button>
        </div>
      </section>

      {/* Featured Providers Section */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-6">Featured Food Providers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">ABC Mess</h3>
              <p className="text-gray-500">Offering surplus food from 12pm - 3pm.</p>
              <button className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700">
                Claim Surplus
              </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">XYZ Cafe</h3>
              <p className="text-gray-500">Donating meals every day at 6pm.</p>
              <button className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700">
                Claim Surplus
              </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">MNO Party</h3>
              <p className="text-gray-500">Leftovers from a recent party event.</p>
              <button className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700">
                Claim Surplus
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Orders;

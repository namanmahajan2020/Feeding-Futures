import React from 'react';

const home = () => {
  return (
    <section className="bg-white py-10 px-4 md:px-10">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Fast & Reliable Delivery</h2>
        <p className="text-gray-600 mb-6">
          We ensure your items are delivered quickly and safely to your doorstep.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition">
          Track Your Order
        </button>
      </div>
    </section>
  );
};

export default home;

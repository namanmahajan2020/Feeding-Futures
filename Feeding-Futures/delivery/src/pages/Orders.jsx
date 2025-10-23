import React, { useState, useEffect } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders (food donations) from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/food-donation");
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        console.error("❌ Error fetching orders:", err);
        setError("Failed to load orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Filter orders by status
  const filteredOrders =
    selectedStatus === "All"
      ? orders
      : orders.filter((order) => order.status === selectedStatus);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-lg font-medium">
        Loading orders...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64 text-red-600 font-medium">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Orders</h2>

      {/* Filter Controls */}
      <div className="mb-6 flex justify-center space-x-4">
        {["All", "Pending", "Processing", "Collected"].map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-4 py-2 rounded-md text-sm ${
              selectedStatus === status
                ? "bg-indigo-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <p className="text-center text-gray-500">No orders found.</p>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order._id}
              className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium">{order.foodname}</h3>
                <span className="text-sm text-gray-500">{order.name}</span>
              </div>

              <ul className="space-y-1 mb-3 text-sm text-gray-700">
                <li>Meal: {order.meal}</li>
                <li>Category: {order.category}</li>
                <li>Quantity: {order.quantity}</li>
                <li>District: {order.district}</li>
                <li>Phone: {order.phoneno}</li>
              </ul>

              <div className="flex justify-between items-center">
                <span className="font-semibold text-lg text-indigo-600">
                  {order.email}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    order.status === "Collected"
                      ? "bg-green-100 text-green-600"
                      : order.status === "Pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;

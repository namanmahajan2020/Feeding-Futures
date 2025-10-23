import React, { useState, useEffect } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/food-donation");
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        // Sort newest first by createdAt
        const sorted = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setOrders(sorted);
      } catch (err) {
        console.error("❌ Error fetching orders:", err);
        setError("Failed to load orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

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

  // Helper to format date nicely
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  return (
    <div className="bg-gradient-to-tl from-sky-100 via-indigo-100 to-green-100">
      <div className="max-w-5xl mx-auto p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">Orders</h2>

        {/* Filter Controls */}
        <div className="mb-6 flex justify-center space-x-4">
          {["All", "Pending", "Processing", "Collected"].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-2 rounded-md border-white border-1 text-sm ${selectedStatus === status
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-200 hover:bg-gradient-to-tr hover:from-sky-200  hover:to-green-100"
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
            filteredOrders.map((order, index) => (
              <div
                key={order._id}
                className="p-4 bg-slate-100 border-2 border-white rounded-lg shadow-sm"
              >
                {/* Header with serial number, foodname, created date */}
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium flex items-center space-x-2">
                    <span className="text-indigo-600 font-semibold">
                      #{index + 1}
                    </span>
                    <span>{order.foodname}</span>
                  </h3>
                  <div className="flex flex-col gap-2 text-right">
                    <span className="text-indigo-700 font-semibold">{order.name}</span>
                    <span className="text-sm text-gray-400">
                      {formatDate(order.createdAt)}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <ul className="space-y-1 mb-1 text-sm text-gray-700">
                  <li>
                    <span className="font-semibold">Meal:</span> {order.meal}
                  </li>
                  <li>
                    <span className="font-semibold">Category:</span> {order.category}
                  </li>
                  <li>
                    <span className="font-semibold">Quantity:</span> {order.quantity} kg
                  </li>
                  <li>
                    <span className="font-semibold">Address:</span> {order.address}
                  </li>
                  <li>
                    <span className="font-semibold">District:</span> {order.district}
                  </li>
                  <li>
                    <span className="font-semibold">Phone:</span> {order.phoneno}
                  </li>
                </ul>

                {/* Email and Status */}
                <div className="flex justify-between items-center">
                  <span className="text-green-600  font-semibold">{order.email}</span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${order.status === "Collected"
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
    </div>
  );
};

export default Orders;

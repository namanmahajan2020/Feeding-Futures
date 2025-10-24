import React, { useState, useEffect } from "react";

const PastOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [yourEmail, setYourEmail] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (!storedEmail) {
      setError("No email found in local storage. Please log in first.");
      setLoading(false);
      return;
    }

    setYourEmail(storedEmail);

    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/food-donation");
        if (!response.ok) throw new Error("Failed to fetch orders");

        const data = await response.json();

        // ✅ Only include collected orders for this delivery partner
        const collectedOrders = data.filter(
          (order) =>
            order.deliveryPartner === storedEmail &&
            order.status === "Collected"
        );

        const sorted = collectedOrders.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setOrders(sorted);
      } catch (err) {
        console.error("❌ Error fetching orders:", err);
        setError("Failed to load your past collected orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

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

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 text-lg font-medium">
        Loading your collected orders...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-64 text-red-600 font-medium text-center">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-tl from-sky-100 via-indigo-100 to-green-100">
      <div className="max-w-5xl mx-auto p-6">
        {/* 🌟 Stylish Title Section */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 via-sky-500 to-green-500 bg-clip-text text-transparent drop-shadow-sm">
            Your Past Collected Orders
          </h2>
          <div className="mt-3 flex justify-center">
            <span className="w-32 h-1 bg-gradient-to-r from-indigo-500 via-sky-400 to-green-400 rounded-full shadow-md"></span>
          </div>
          {orders.length > 0 && (
            <p className="mt-3 text-sm text-gray-600 font-medium">
              Total Collected Orders:{" "}
              <span className="text-indigo-600 font-semibold">
                {orders.length}
              </span>
            </p>
          )}
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.length === 0 ? (
            <p className="text-center text-gray-500">
              No collected orders found for {yourEmail}.
            </p>
          ) : (
            orders.map((order, index) => (
              <div
                key={order._id}
                className="p-4 bg-white border border-slate-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-indigo-700 flex items-center space-x-2">
                    <span className="text-sky-500">#{index + 1}</span>
                    <span>{order.foodname}</span>
                  </h3>
                  <div className="text-right">
                    <span className="text-indigo-700 font-semibold block">
                      {order.name}
                    </span>
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

                {/* Email + Status */}
                <div className="flex justify-between items-center mt-2">
                  <span className="text-green-600 font-semibold">{order.email}</span>
                  <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-600">
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

export default PastOrder;

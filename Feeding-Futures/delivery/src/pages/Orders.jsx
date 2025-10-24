import React, { useState, useEffect } from "react";
import { FaClock, FaSyncAlt, FaCheck } from "react-icons/fa";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deliveryPartner, setDeliveryPartner] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [infoMessage, setInfoMessage] = useState(null);

  // Fetch delivery partner email and location from localStorage
  useEffect(() => {
    const email = localStorage.getItem("email");
    const location = localStorage.getItem("location");
    if (email) setDeliveryPartner(email);
    if (location) setUserLocation(location);
  }, []);
  
useEffect(() => {
  const timers = [];

  orders.forEach((order) => {
    if (order.showConfirm) {
      const timer = setTimeout(() => {
        setOrders((prev) =>
          prev.map((o) =>
            o._id === order._id ? { ...o, showConfirm: false } : o
          )
        );
      }, 3000);
      timers.push(timer);
    }
  });

  return () => timers.forEach((t) => clearTimeout(t));
}, [orders]);

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/food-donation");
        if (!response.ok) throw new Error("Failed to fetch orders");
        const data = await response.json();
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

  // Inline info message handler
  const showTemporaryMessage = (text) => {
    setInfoMessage(text);
    setTimeout(() => setInfoMessage(null), 3000);
  };

  const handleStatusChange = async (id, currentStatus) => {
    if (!deliveryPartner) {
      showTemporaryMessage("Please log in first.");
      return;
    }

    // Check if user already has a processing order
    const hasProcessing = orders.some(
      (order) =>
        order.status === "Processing" && order.deliveryPartner === deliveryPartner
    );

    if (currentStatus === "Pending" && hasProcessing) {
      showTemporaryMessage("You already have one processing order.");
      return;
    }

    let nextStatus;
    if (currentStatus === "Pending") nextStatus = "Processing";
    else if (currentStatus === "Processing") nextStatus = "Collected";
    else return; // Prevent skipping steps

    try {
      const response = await fetch(
        `http://localhost:5000/api/food-donation/${id}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status: nextStatus,
            deliveryPartner,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to update status");

      const updated = await response.json();
      setOrders((prev) =>
        prev.map((order) => (order._id === id ? updated : order))
      );

      showTemporaryMessage(
        nextStatus === "Processing"
          ? "Order accepted!"
          : "Order marked as collected!"
      );
    } catch (error) {
      console.error("❌ Error updating status:", error);
      showTemporaryMessage("Failed to update status. Try again.");
    }
  };

  // Filter logic
  const filteredOrders = orders.filter((order) => {
    if (selectedStatus === "Processing") {
      return (
        order.status === "Processing" &&
        order.deliveryPartner === deliveryPartner
      );
    }

    if (selectedStatus === "All") {
      return (
        (order.status === "Pending" ||
          (order.status === "Processing" &&
            order.deliveryPartner === deliveryPartner)) &&
        (locationFilter === "All" ||
          (order.district === userLocation && order.status !== "Collected"))
      );
    }

    if (selectedStatus === "Pending") {
      return (
        order.status === "Pending" &&
        (locationFilter === "All" ||
          (order.district === userLocation && order.status !== "Collected"))
      );
    }

    return false;
  });

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-tl from-sky-100 via-indigo-100 to-green-100 flex justify-center items-center text-lg font-medium">
        Loading orders...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gradient-to-tl from-sky-100 via-indigo-100 to-green-100 flex justify-center items-center text-red-600 font-medium">
        {error}
      </div>
    );

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
    <div className="min-h-screen bg-gradient-to-tl from-sky-100 via-indigo-100 to-green-100 relative">
      {/* Inline info message */}
      {infoMessage && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
  bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 text-sm font-medium text-center transition-opacity duration-300 opacity-100">
          {infoMessage}
        </div>

      )}

      <div className="max-w-6xl mx-auto p-6">
        {/* Title */}
        <div className="flex flex-col text-center justify-center">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 via-sky-500 to-green-500 bg-clip-text text-transparent drop-shadow-sm">
            Orders
          </h2>
          <div className="mt-3 flex justify-center">
            <span className="w-32 mb-7 h-1 bg-gradient-to-r from-indigo-500 via-sky-400 to-green-400 rounded-full shadow-md"></span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-6 max-w-2/3">
          {/* Location Toggle */}
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-700">Show:</span>
            <div
              onClick={() =>
                setLocationFilter(locationFilter === "All" ? "Nearby" : "All")
              }
              className={`relative w-16 h-8 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300 ${locationFilter === "Nearby"
                ? "bg-gradient-to-r from-indigo-500 via-sky-400 to-green-400"
                : "bg-blue-300"
                }`}
            >
              <div
                className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${locationFilter === "Nearby" ? "translate-x-8" : "translate-x-0"
                  }`}
              ></div>
            </div>

            <span
              className={`text-sm font-medium transition-colors duration-300 ${locationFilter === "Nearby" ? "text-indigo-600" : "text-gray-600"
                }`}
            >
              {locationFilter === "Nearby" ? "Nearby Only" : "All Locations"}
            </span>
          </div>

          {/* Status Filter */}
          <div className="flex justify-center w-full sm:w-auto mr-5">
            <div className="flex space-x-2">
              {["All", "Pending", "Processing"].map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-4 py-2 rounded-md border border-white text-sm font-medium transition-all ${selectedStatus === status
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-200 hover:bg-gradient-to-tr hover:from-sky-200 hover:to-green-100"
                    }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.length === 0 ? (
            <p className="text-center text-gray-500">No orders found.</p>
          ) : (
            filteredOrders.map((order, index) => (
              <div
                key={order._id}
                className="bg-slate-100 border-2 border-white rounded-lg shadow-sm overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Left Section - Order Details */}
                  <div className="flex-1 p-6">
                    <div className="flex items-center mb-4">
                      <span className="text-sky-500 font-semibold text-lg mr-3">
                        #{index + 1}
                      </span>
                      <h3 className="text-xl font-bold text-indigo-600">
                        {order.foodname}
                      </h3>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex gap-1">
                        <span className="font-semibold text-gray-700">Meal :</span>
                        <span className="text-gray-600">{order.meal}</span>
                      </div>
                      <div className="flex gap-1">
                        <span className="font-semibold text-gray-700">Category :</span>
                        <span className="text-gray-600">{order.category}</span>
                      </div>
                      <div className="flex gap-1">
                        <span className="font-semibold text-gray-700">Quantity :</span>
                        <span className="text-gray-600">{order.quantity} kg</span>
                      </div>
                      <div className="flex gap-1">
                        <span className="font-semibold text-gray-700">Address :</span>
                        <span className="text-gray-600">{order.address}</span>
                      </div>
                      <div className="flex gap-1">
                        <span className="font-semibold text-gray-700">District :</span>
                        <span className="text-gray-600">{order.district}</span>
                      </div>
                      <div className="flex gap-1">
                        <span className="font-semibold text-gray-700">Phone :</span>
                        <span className="text-gray-600">{order.phoneno}</span>
                      </div>
                      <div className="flex gap-1">
                        <span className="font-semibold text-gray-700">Email :</span>
                        <span className="text-green-600 font-medium">{order.email}</span>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-row text-lg items-center">
                      <span className="text-sm mr-2 mt-1.5 font-semibold text-gray-700 mb-2 block">
                        Current Status :
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${order.status === "Collected"
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

                  {/* Right Section */}
                  <div className="min-w-1/3 p-6">
                    <div className="flex flex-col gap-5 h-full justify-between items-end">
                      <div className="mb-6 flex flex-col items-end justify-center">
                        <h4 className="text-lg font-bold text-indigo-700">
                          {order.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>

                      <div className="flex flex-col justify-center items-center">
                        <div className="mb-2 font-semibold flex items-center space-x-2">
                          <span
                            className={`text-sm ${order.status === "Pending"
                              ? "text-blue-600"
                              : order.status === "Processing"
                                ? "text-green-600"
                                : "text-gray-500"
                              }`}
                          >
                            {order.status === "Pending"
                              ? "Swipe to accept order"
                              : order.status === "Processing"
                                ? "Swipe if order collected"
                                : ""}
                          </span>
                          {(order.status === "Pending" ||
                            order.status === "Processing") && (
                              <span
                                className={`text-lg ${order.status === "Pending"
                                  ? "text-blue-600"
                                  : "text-green-600"
                                  }`}
                              >
                                →
                              </span>
                            )}
                        </div>

                        <div className="mb-4 min-w-50">
                          <div className="relative w-full">
                            <input
                              type="range"
                              min="0"
                              max="2"
                              step="1"
                              value={
                                order.status === "Pending"
                                  ? 0
                                  : order.status === "Processing"
                                    ? 1
                                    : 2
                              }
                              onChange={() =>
                                setOrders((prev) =>
                                  prev.map((o) =>
                                    o._id === order._id
                                      ? { ...o, showConfirm: true }
                                      : o
                                  )
                                )
                              }
                              className={`w-full h-8 rounded-full appearance-none cursor-pointer bg-gradient-to-r from-yellow-300 via-blue-400 to-green-400 accent-white ${deliveryPartner
                                ? "ring-2 ring-indigo-300"
                                : "opacity-60 cursor-not-allowed"
                                }`}
                            />

                            {/* Labels */}
                            <div className="flex justify-between text-xs mt-2">
                              <span className="flex flex-col items-center text-yellow-600">
                                <FaClock className="mb-1" />
                                Pending
                              </span>
                              <span className="flex flex-col items-center text-blue-600">
                                <FaSyncAlt className="mb-1" />
                                Processing
                              </span>
                              <span className="flex flex-col items-center text-green-600">
                                <FaCheck className="mb-1" />
                                Collected
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Auto-close confirmation */}
                        {order.showConfirm && (
                          <div className="fixed inset-0 flex items-center justify-center z-50">
                            <div className="bg-indigo-50 border border-indigo-200 rounded-md shadow-lg p-6 w-72 text-center">
                              <p className="text-sm text-indigo-700 font-medium mb-4">
                                {order.status === "Pending"
                                  ? "Do you want to accept this order?"
                                  : order.status === "Processing"
                                    ? "Order Collected?"
                                    : ""}
                              </p>
                              <div className="flex justify-center space-x-4">
                                <button
                                  onClick={() =>
                                    setOrders((prev) =>
                                      prev.map((o) =>
                                        o._id === order._id ? { ...o, showConfirm: false } : o
                                      )
                                    )
                                  }
                                  className="px-4 py-2 text-sm rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 transition"
                                >
                                  No
                                </button>
                                <button
                                  onClick={() => {
                                    handleStatusChange(order._id, order.status);
                                    setOrders((prev) =>
                                      prev.map((o) =>
                                        o._id === order._id ? { ...o, showConfirm: false } : o
                                      )
                                    );
                                  }}
                                  className="px-4 py-2 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
                                >
                                  Yes
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                      </div>
                    </div>
                  </div>
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

import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

const PastOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [yourEmail, setYourEmail] = useState("");
  const [ratings, setRatings] = useState({}); // temporary (user-selected)
  const [submittedRatings, setSubmittedRatings] = useState({}); // actually submitted ones
  const [showRatingBox, setShowRatingBox] = useState({});
  const [hoveredStars, setHoveredStars] = useState({});

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
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/food-donation`);
        if (!response.ok) throw new Error("Failed to fetch orders");

        const data = await response.json();

        const collectedOrders = data.filter(
          (order) =>
            order.deliveryPartner === storedEmail &&
            order.status === "Collected"
        );

        const sorted = collectedOrders.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        // Initialize submitted ratings (from DB)
        const initialSubmittedRatings = sorted.reduce((acc, order) => {
          if (order.rating && order.rating > 0) acc[order._id] = order.rating;
          return acc;
        }, {});

        setSubmittedRatings(initialSubmittedRatings);
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
    return new Date(dateString).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleShowRating = (orderId) => {
    setShowRatingBox((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const handleSetRating = (orderId, value) => {
    setRatings((prev) => ({
      ...prev,
      [orderId]: value,
    }));
  };

  const handleSubmitRating = async (orderId) => {
    const rating = ratings[orderId];
    if (!rating) return alert("Please select a rating before submitting.");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/food-donation/rate/${orderId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rating }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to update rating");

      setShowRatingBox((prev) => ({ ...prev, [orderId]: false }));
      setSubmittedRatings((prev) => ({ ...prev, [orderId]: rating }));

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, rating } : order
        )
      );
    } catch (err) {
      console.error("❌ Error submitting rating:", err);
      alert("Failed to submit rating. Please try again later.");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-tl from-sky-100 via-indigo-100 to-green-100 flex justify-center items-center h-64 text-lg font-medium">
        Loading your collected orders...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gradient-to-tl from-sky-100 via-indigo-100 to-green-100 flex justify-center items-center h-64 text-red-600 font-medium text-center">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-tl from-sky-100 via-indigo-100 to-green-100">
      <div className="max-w-5xl mx-auto p-6">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 via-sky-500 to-green-500 bg-clip-text text-transparent drop-shadow-sm">
            Your Past Collected Orders
          </h2>
          <div className="mt-3 flex justify-center">
            <span className="w-98 h-1 bg-gradient-to-r from-indigo-500 via-sky-400 to-green-400 rounded-full shadow-md"></span>
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

        <div className="space-y-4">
          {orders.length === 0 ? (
            <p className="text-center text-gray-500">
              No collected orders found for {yourEmail}.
            </p>
          ) : (
            orders.map((order, index) => (
              <div
                key={order._id}
                className="bg-slate-100 border-2 border-white rounded-lg shadow-sm overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Left Section */}
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
                      <div><span className="font-semibold text-gray-700">Meal :</span> <span className="text-gray-600">{order.meal}</span></div>
                      <div><span className="font-semibold text-gray-700">Category :</span> <span className="text-gray-600">{order.category}</span></div>
                      <div><span className="font-semibold text-gray-700">Quantity :</span> <span className="text-gray-600">{order.quantity} kg</span></div>
                      <div><span className="font-semibold text-gray-700">Address :</span> <span className="text-gray-600">{order.address}</span></div>
                      <div><span className="font-semibold text-gray-700">District :</span> <span className="text-gray-600">{order.district}</span></div>
                      <div><span className="font-semibold text-gray-700">Phone :</span> <span className="text-gray-600">{order.phoneno}</span></div>
                      <div><span className="font-semibold text-gray-700">Email :</span> <span className="text-green-600 font-medium">{order.email}</span></div>
                    </div>

                    <div className="mt-6 flex flex-row text-lg items-center">
                      <span className="text-sm mr-2 mt-1.5 font-semibold text-gray-700">
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
                      <div className="mb-6 flex flex-col items-end">
                        <h4 className="text-lg font-bold text-indigo-700 ">
                          {order.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>

                      {/* ⭐ Rating Section */}
                      <div className="text-yellow-500 font-semibold flex flex-col items-end space-y-2">
                        {submittedRatings[order._id] ? (
                          // ⭐ Show saved rating
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <FaStar
                                key={star}
                                size={24}
                                className={
                                  star <= submittedRatings[order._id]
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }
                              />
                            ))}
                          </div>
                        ) : !showRatingBox[order._id] ? (
                          <button
                            onClick={() => handleShowRating(order._id)}
                            className="text-sm px-4 py-1 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg hover:bg-yellow-200 transition"
                          >
                            ⭐ Give Rating
                          </button>
                        ) : (
                          <div className="flex flex-col items-center">
                            <div className="flex space-x-1 mb-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <FaStar
                                  key={star}
                                  size={24}
                                  className={`cursor-pointer transition ${star <=
                                      (hoveredStars[order._id] ||
                                        ratings[order._id] ||
                                        0)
                                      ? "text-yellow-400"
                                      : "text-gray-300"
                                    }`}
                                  onMouseEnter={() =>
                                    setHoveredStars((prev) => ({
                                      ...prev,
                                      [order._id]: star,
                                    }))
                                  }
                                  onMouseLeave={() =>
                                    setHoveredStars((prev) => ({
                                      ...prev,
                                      [order._id]: null,
                                    }))
                                  }
                                  onClick={() =>
                                    handleSetRating(order._id, star)
                                  }
                                />
                              ))}
                            </div>
                            <button
                              onClick={() => handleSubmitRating(order._id)}
                              className="text-xs px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                            >
                              Submit
                            </button>
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

export default PastOrder;

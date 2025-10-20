import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader, Package } from "lucide-react";

const OrderListScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get("/api/orders");

        // Defensive check: ensure data is an array
        if (Array.isArray(data)) {
          setOrders(data);
        } else if (data && typeof data === "object") {
          setOrders([data]); // wrap single object in array
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]); // fallback to empty array
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin text-green-600" size={30} />
      </div>
    );

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
        All Food Donation Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300">No orders available.</p>
      ) : (
        <div className="grid gap-4">
          {orders.map((order, index) => (
            <div
              key={order.id || index}
              className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow flex items-center justify-between"
            >
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">
                  {order.foodName || "Food Donation"}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Donor: {order.donorName || "Anonymous"} — NGO: {order.ngoName || "Unknown"}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-400">
                  Status: {order.status || "Pending"}
                </p>
              </div>
              <Package className="text-green-500" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderListScreen;

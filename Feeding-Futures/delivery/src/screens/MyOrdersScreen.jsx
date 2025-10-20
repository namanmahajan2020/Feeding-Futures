import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader, ClipboardList } from "lucide-react";

const MyOrdersScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Safely get user info
  const user = JSON.parse(localStorage.getItem("userInfo") || "null");

  useEffect(() => {
    const fetchMyOrders = async () => {
      if (!user || !user.id) {
        setOrders([]);
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get(`/api/orders/my/${user.id}`);

        // Ensure data is an array
        if (Array.isArray(data)) setOrders(data);
        else if (data && typeof data === "object") setOrders([data]);
        else setOrders([]);
      } catch (error) {
        console.error("Error fetching my orders:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, [user]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin text-green-600" size={30} />
      </div>
    );

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
        My Food Donations
      </h1>

      {!user || !user.id ? (
        <p className="text-gray-500 dark:text-gray-300">
          Please log in to view your orders.
        </p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300">You haven’t donated yet.</p>
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
                  Status: {order.status || "Pending"}
                </p>
              </div>
              <ClipboardList className="text-green-500" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrdersScreen;

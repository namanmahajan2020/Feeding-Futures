import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Header from "./components/Header";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import OrderListScreen from "./screens/OrderListScreen";
import MyOrdersScreen from "./screens/MyOrdersScreen";
import MapScreen from "./screens/MapScreen";

import {
  initialMockOrders,
  MOCK_DELIVERY_PERSON_ID,
  MOCK_DELIVERY_PERSON_NAME,
} from "./data/mockData";

const App = () => {
  const [orders, setOrders] = useState(initialMockOrders);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  // ---- Check LocalStorage for Login ----
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      setIsLoggedIn(true);
      setUserName(userInfo.name || "User");
    }
  }, []);

  // ---- Logout Handler ----
  const logoutUser = () => {
    localStorage.removeItem("userInfo");
    setIsLoggedIn(false);
    setUserName("");
    navigate("/login");
  };

  // ---- Protect Private Routes ----
  const ProtectedRoute = ({ children }) => {
    if (!isLoggedIn) return <Navigate to="/login" replace />;
    return children;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans antialiased">
      {isLoggedIn && (
        <Header
          isLoggedIn={isLoggedIn}
          logout={logoutUser}
          userName={userName}
        />
      )}

      <main className="pt-6 pb-12">
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={<LoginScreen setIsLoggedIn={setIsLoggedIn} setUserName={setUserName} />}
          />
          <Route path="/signup" element={<SignupScreen />} />

          {/* Private Routes */}
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <OrderListScreen
                  orders={orders}
                  setOrders={setOrders}
                  userId={MOCK_DELIVERY_PERSON_ID}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/myorders"
            element={
              <ProtectedRoute>
                <MyOrdersScreen orders={orders} userId={MOCK_DELIVERY_PERSON_ID} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/map"
            element={
              <ProtectedRoute>
                <MapScreen />
              </ProtectedRoute>
            }
          />

          {/* Default Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;

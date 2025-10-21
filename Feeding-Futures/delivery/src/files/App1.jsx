import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Header from "./Header";
import AuthForm from "../components/Signup"; // unified login/signup form
import OrderListScreen from "./OrderListScreen";
import MyOrdersScreen from "./MyOrdersScreen";
import MapScreen from "./MapScreen";

import {
  initialMockOrders,
  MOCK_DELIVERY_PERSON_ID,
  MOCK_DELIVERY_PERSON_NAME,
} from "./mockData";

const App = () => {
  const [orders, setOrders] = useState(initialMockOrders);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  // ---- Check LocalStorage for Login ----
  useEffect(() => {
    const name = localStorage.getItem("name");
    if (name) {
      setIsLoggedIn(true);
      setUserName(name);
    }
  }, []);

  // ---- Logout Handler ----
  const logoutUser = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserName("");
    navigate("/auth");
  };

  // ---- Protect Private Routes ----
  const ProtectedRoute = ({ children }) => {
    if (!isLoggedIn) return <Navigate to="/auth" replace />;
    return children;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans antialiased">
      {/* Header only when logged in */}
      {isLoggedIn && (
        <Header
          isLoggedIn={isLoggedIn}
          logout={logoutUser}
          userName={userName}
        />
      )}

      <main className="pt-6 pb-12">
        <Routes>
          {/* Auth (Signup + Login combined) */}
          <Route
            path="/auth"
            element={
              <AuthForm
                setIsLoggedIn={setIsLoggedIn}
                setUserName={setUserName}
              />
            }
          />

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
                <MyOrdersScreen
                  orders={orders}
                  userId={MOCK_DELIVERY_PERSON_ID}
                />
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

          {/* Default redirect */}
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;

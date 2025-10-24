import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./AppContext.jsx"; // Import context

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AppContext);

  // ✅ Environment credentials (for demo/testing)
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

  // ✅ Redirect if already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const role = localStorage.getItem("role");

    if (isLoggedIn === "true" && role === "admin") {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    try {
      // Validate credentials
      if (formData.email === adminEmail && formData.password === adminPassword) {
        // ✅ Store login status
        localStorage.setItem("role", "admin");
        localStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);

        // Redirect to dashboard
        navigate("/dashboard");
      } else {
        setError("Invalid email or password.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  const autoFillCredentials = () => {
    setFormData({
      email: adminEmail,
      password: adminPassword,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b relative">
      {/* === LOGIN FORM === */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gradient-to-b from-white to-green-100 p-8 rounded-2xl shadow-2xl border border-green-200 z-10"
        aria-labelledby="admin-login-title"
      >
        <h2
          id="admin-login-title"
          className="text-3xl font-bold text-green-600 text-center mb-6"
        >
          Admin Login
        </h2>

        <label className="block text-gray-700 mb-1">Email</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
          className="w-full mb-4 p-3 rounded-lg border border-green-500 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-green-600"
        />

        <label className="block text-gray-700 mb-1">Password</label>
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
          required
          className="w-full mb-4 p-3 rounded-lg bg-gray-50 border border-green-500 focus:outline-none focus:ring-1 focus:ring-green-600"
        />

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg font-semibold mb-4 shadow-lg transition-all duration-200 transform hover:-translate-y-1"
        >
          Login
        </button>

        {error && <p className="text-red-500 text-center mb-2">{error}</p>}

        <p className="text-gray-600 text-center">
          <span
            onClick={() => navigate("/start")}
            className="text-red-400 cursor-pointer ml-2 font-semibold hover:underline"
          >
            Not an admin?
          </span>
        </p>
      </form>

      {/* === DEMO CREDENTIAL CARD === */}
      <div
        aria-hidden="false"
        className="pointer-events-auto select-none absolute bottom-6 left-6 transform-gpu md:left-12 md:bottom-12"
      >
        <div
          className="relative w-72 md:w-80 p-4 rounded-3xl bg-gradient-to-b from-black via-teal-900 to-green-500 text-white ring-2 overflow-hidden"
          role="region"
          aria-label="Demo credentials (for demo only)"
        >
          {/* Decorative animated blobs */}
          <span className="absolute -left-6 -top-6 w-36 h-36 bg-white/10 rounded-full blur-3xl animate-[spin_10s_linear_infinite]" />
          <span className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/8 rounded-full blur-2xl animate-[spin_12s_linear_infinite]" />

          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-lg font-extrabold tracking-tight">
                DEMO ACCESS
              </h3>
              <p className="text-xs opacity-90">
                Use these for demo / testing only
              </p>
            </div>
            <div
              title="This is just a demo card"
              className="text-sm font-semibold px-2 py-1 bg-white/10 rounded-md"
            >
              demo
            </div>
          </div>

          {/* Email row */}
          <div className="flex items-center justify-between bg-white/10 rounded-md p-2 mb-2">
            <div className="truncate">
              <div className="text-xs opacity-90">Email</div>
              <div className="text-sm font-medium">{adminEmail}</div>
            </div>
          </div>

          {/* Password row */}
          <div className="flex items-center justify-between bg-white/10 rounded-md p-2">
            <div className="truncate">
              <div className="text-xs opacity-90">Password</div>
              <div className="text-sm font-medium tracking-wider">
                {adminPassword}
              </div>
            </div>
          </div>

          {/* Auto-fill button */}
          <div className="mt-3 text-center text-xs text-gray-700">
            <button
              type="button"
              onClick={autoFillCredentials}
              className="border inline-block px-3 py-2 bg-gradient-to-b from-red-500 via-black to-red-500 hover:bg-gradient-to-br hover:from-red-500 hover:via-black hover:to-red-500 text-white font-bold rounded-lg"
            >
              ✨ Auto-fill Demo Credentials ✨
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

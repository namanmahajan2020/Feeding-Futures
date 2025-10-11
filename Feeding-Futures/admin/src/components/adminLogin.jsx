import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Demo credentials (explicitly hard-coded for demo only)
    // Access environment variables correctly (Vite)
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        try {
            // Validate the login credentials against the demo values
            if (formData.email === adminEmail && formData.password === adminPassword) {
                localStorage.setItem("role", "admin");
                navigate("/"); // Navigate to the home page
            } else {
                setError("Invalid email or password.");
            }
        } catch (err) {
            console.error("Error during login attempt:", err);
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white px-4 relative">
            {/* Main login form */}
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-gradient-to-b from-white to-green-100 p-8 rounded-2xl shadow-2xl border border-green-200 z-10"
                aria-labelledby="admin-login-title"
            >
                <h2 id="admin-login-title" className="text-3xl font-bold text-green-600 text-center mb-6">
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

                {/* Auto-fill button */}
            </form>

            {/* Adjusted demo credentials container */}
            <div
                aria-hidden="false"
                className="pointer-events-auto select-none absolute bottom-6 left-6 transform-gpu md:left-12 md:bottom-12"
            >
                <div
                    className="relative w-72 md:w-80 p-4 rounded-3xl bg-gradient-to-br from-green-700 via-sky-700 to-indigo-700 text-white shadow-[0_20px_60px_rgba(99,102,241,0.18)] ring-2 ring-pink-300/30 backdrop-blur-sm overflow-hidden"
                    role="region"
                    aria-label="Demo credentials (for demo only)"
                >
                    {/* Decorative animated blobs */}
                    <span className="absolute -left-6 -top-6 w-36 h-36 bg-white/10 rounded-full blur-3xl animate-[spin_10s_linear_infinite]" />
                    <span className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/8 rounded-full blur-2xl animate-[spin_12s_linear_infinite]" />

                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <h3 className="text-lg font-extrabold tracking-tight">DEMO ACCESS</h3>
                            <p className="text-xs opacity-90">Use these for demo / testing only</p>
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
                            <div className="text-sm font-medium tracking-wider">{adminPassword}</div>
                        </div>
                    </div>
                    <div className="mt-3 text-center text-xs text-gray-700">
                        <button
                    type="button"
                    onClick={autoFillCredentials}
                    className="inline-block px-2 py-1 bg-red-600 hover:scale-105 text-white font-bold rounded-lg"
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
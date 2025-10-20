import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";

const SignupScreen = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle signup submission
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("/api/users/signup", formData);
      console.log("Signup successful:", response.data);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
          Create an Account
        </h2>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mb-3">{error}</p>}

        {/* Signup Form */}
        <form onSubmit={handleSignup} className="space-y-5">
          {/* Name Field */}
          <div>
            <label className="text-gray-700 dark:text-gray-200 text-sm font-medium">
              Full Name
            </label>
            <div className="flex items-center border rounded-lg p-2 mt-1 bg-gray-50 dark:bg-gray-700">
              <User className="text-gray-400 mr-2" size={18} />
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
                className="bg-transparent w-full outline-none text-gray-800 dark:text-gray-100"
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="text-gray-700 dark:text-gray-200 text-sm font-medium">
              Email Address
            </label>
            <div className="flex items-center border rounded-lg p-2 mt-1 bg-gray-50 dark:bg-gray-700">
              <Mail className="text-gray-400 mr-2" size={18} />
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="bg-transparent w-full outline-none text-gray-800 dark:text-gray-100"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="text-gray-700 dark:text-gray-200 text-sm font-medium">
              Password
            </label>
            <div className="flex items-center border rounded-lg p-2 mt-1 bg-gray-50 dark:bg-gray-700">
              <Lock className="text-gray-400 mr-2" size={18} />
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
                className="bg-transparent w-full outline-none text-gray-800 dark:text-gray-100"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white transition duration-300 ${
              loading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {/* Login Redirect */}
        <p className="text-center text-gray-500 dark:text-gray-300 text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupScreen;

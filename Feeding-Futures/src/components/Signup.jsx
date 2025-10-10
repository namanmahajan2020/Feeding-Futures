import React, { useState } from "react";
import axios from "axios";

const AuthForm = () => {
  const [isSignup, setIsSignup] = useState(true); // toggle form
  const [formData, setFormData] = useState({ name: "", email: "", password: "", gender: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const url = isSignup ? "/api/users/signup" : "/api/users/login";
      const res = await axios.post(url, formData);
      setSuccess(res.data.message);
      if (!isSignup && res.data.user) {
        localStorage.setItem("name", res.data.user.name);
        localStorage.setItem("email", res.data.user.email);
        localStorage.setItem("gender", res.data.user.gender);
        window.location.href = "/profile"; // redirect after login
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-green-500 text-center mb-6">
          {isSignup ? "Create your account" : "Login to your account"}
        </h2>

        {isSignup && (
          <>
            <label className="block text-gray-200 mb-1">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full mb-4 p-3 rounded-md bg-gray-700 text-white focus:outline-green-500"
            />

            <label className="block text-gray-200 mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full mb-4 p-3 rounded-md bg-gray-700 text-white focus:outline-green-500"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="preferNotToSay">Prefer not to say</option>
            </select>
          </>
        )}

        <label className="block text-gray-200 mb-1">Email</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
          className="w-full mb-4 p-3 rounded-md bg-gray-700 text-white focus:outline-green-500"
        />

        <label className="block text-gray-200 mb-1">Password</label>
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
          required
          className="w-full mb-4 p-3 rounded-md bg-gray-700 text-white focus:outline-green-500"
        />

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded-md font-semibold mb-4"
        >
          {isSignup ? "Sign Up" : "Login"}
        </button>

        {error && <p className="text-red-500 text-center mb-2">{error}</p>}
        {success && <p className="text-green-400 text-center mb-2">{success}</p>}

        <p className="text-gray-400 text-center">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            onClick={() => {
              setIsSignup(!isSignup);
              setError("");
              setSuccess("");
            }}
            className="text-green-500 cursor-pointer font-semibold"
          >
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default AuthForm;

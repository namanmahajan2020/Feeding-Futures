import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const GenderSelect = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const options = ["Male", "Female", "Other", "Prefer not to say"];
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full mb-4" ref={ref}>
     <div
  className={`w-full mb-4 p-3 rounded-lg border border-green-500 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-green-600 flex flex-row justify-between ${
    value ? "text-gray-800" : "text-gray-500"
  }`}
  onClick={() => setOpen(!open)}
>
  {value || "Select gender"}
  <svg
    className={`w-5 h-5 text-green-600 transform ${open ? "rotate-180" : ""} transition-transform duration-200`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
  </svg>
</div>


      {open && (
        <ul className="absolute z-10 w-full bg-gray-50 border border-green-500 rounded-lg mt-1 shadow-lg max-h-60 overflow-auto">
          {options.map((opt) => (
            <li
              key={opt}
              className="p-3 hover:bg-gradient-to-b from-green-100 to-green-300 text-gray-700 cursor-pointer transition-colors"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const AuthForm = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const url = isSignup
        ? "http://localhost:5000/api/users/signup"
        : "http://localhost:5000/api/users/login";

      const res = await axios.post(url, formData);
      setSuccess(res.data.message);

      if (res.data.user) {
        localStorage.setItem("name", res.data.user.name);
        localStorage.setItem("email", res.data.user.email);
        localStorage.setItem("gender", res.data.user.gender);
        navigate("/");
      } else if (isSignup) {
        const loginRes = await axios.post("http://localhost:5000/api/users/login", {
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem("name", loginRes.data.user.name);
        localStorage.setItem("email", loginRes.data.user.email);
        localStorage.setItem("gender", loginRes.data.user.gender);
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center mt-10 bg-gradient-to-b from-green-50 to-white px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gradient-to-b from-white to-green-100 p-8 rounded-2xl shadow-2xl border border-green-200"
      >
        <h2 className="text-3xl font-bold text-green-600 text-center mb-6">
          {isSignup ? "Create Your Account" : "Login to Your Account"}
        </h2>

        {isSignup && (
          <>
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full mb-4 p-3 rounded-lg border border-green-500 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-green-600"
            />

            <label className="block  text-gray-700 mb-1">Gender</label>
            <GenderSelect
              value={formData.gender}
              onChange={(val) => setFormData({ ...formData, gender: val })}
            />
          </>
        )}

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
          className="w-full mb-4 p-3 rounded-lg  bg-gray-50 border border-green-500 focus:outline-none focus:ring-1 focus:ring-green-600"
        />

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg font-semibold mb-4 shadow-lg transition-all duration-200 transform hover:-translate-y-1"
        >
          {isSignup ? "Sign Up" : "Login"}
        </button>

        {error && <p className="text-red-500 text-center mb-2">{error}</p>}
        {success && <p className="text-green-600 text-center mb-2">{success}</p>}

        <p className="text-gray-600 text-center">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            onClick={() => {
              setIsSignup(!isSignup);
              setError("");
              setSuccess("");
            }}
            className="text-green-600 cursor-pointer font-semibold hover:underline"
          >
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default AuthForm;

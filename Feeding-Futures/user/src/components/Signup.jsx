import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const inputClassName =
  "w-full rounded-2xl border border-emerald-200 bg-[#f4fbf6] px-4 py-3.5 text-sm text-slate-900 shadow-[0_10px_22px_rgba(15,23,42,0.06)] outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100";

const fieldLabelClassName =
  "mb-1.5 block text-sm font-semibold tracking-[0.03em] text-slate-800";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Gender Select Component
const GenderSelect = ({ value, onChange, disabled = false }) => {
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
    <div className="relative w-full" ref={ref}>
      <button
        type="button"
        className={`${inputClassName} flex items-center justify-between text-left ${
          value ? "text-slate-900" : "text-slate-400"
        } ${disabled ? "cursor-not-allowed opacity-70" : ""}`}
        onClick={() => {
          if (!disabled) setOpen((prev) => !prev);
        }}
        disabled={disabled}
      >
        <span>{value || "Select gender"}</span>
        <svg
          className={`h-5 w-5 text-emerald-600 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      {open && !disabled && (
        <ul className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-2xl border border-emerald-200 bg-white p-2 shadow-xl">
          {options.map((opt) => (
            <li
              key={opt}
              className="cursor-pointer rounded-xl px-3 py-2.5 text-sm text-slate-700 transition hover:bg-emerald-50"
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

// Location Select Component
const LocationSelect = ({ value, onChange, disabled = false }) => {
  const [open, setOpen] = useState(false);
  const options = ["Chennai", "Coimbatore", "Madurai"];
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={ref}>
      <button
        type="button"
        className={`${inputClassName} flex items-center justify-between text-left ${
          value ? "text-slate-900" : "text-slate-400"
        } ${disabled ? "cursor-not-allowed opacity-70" : ""}`}
        onClick={() => {
          if (!disabled) setOpen((prev) => !prev);
        }}
        disabled={disabled}
      >
        <span>{value || "Select location"}</span>
        <svg
          className={`h-5 w-5 text-emerald-600 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      {open && !disabled && (
        <ul className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-2xl border border-emerald-200 bg-white p-2 shadow-xl">
          {options.map((opt) => (
            <li
              key={opt}
              className="cursor-pointer rounded-xl px-3 py-2.5 text-sm text-slate-700 transition hover:bg-emerald-50"
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

// Auth Form Component
const AuthForm = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    location: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isProcessing) return;

    setIsProcessing(true);
    setError("");
    setSuccess("");

    try {
      const url = isSignup
        ? `${import.meta.env.VITE_API_BASE_URL}/api/users/signup`
        : `${import.meta.env.VITE_API_BASE_URL}/api/users/login`;

      const res = await axios.post(url, formData);
      setSuccess(res.data.message);

      const user = res.data.user;

      if (user) {
        setSuccess(isSignup ? "Creating your account..." : "Logging you in...");
        await delay(1400);
        localStorage.setItem("name", user.name);
        localStorage.setItem("email", user.email);
        localStorage.setItem("gender", user.gender);
        localStorage.setItem("location", user.location);
        navigate("/");
      } else if (isSignup) {
        const loginRes = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/users/login`,
          {
            email: formData.email,
            password: formData.password,
          }
        );

        const loginUser = loginRes.data.user;
        setSuccess("Creating your account...");
        await delay(1400);

        localStorage.setItem("name", loginUser.name);
        localStorage.setItem("email", loginUser.email);
        localStorage.setItem("gender", loginUser.gender);
        localStorage.setItem("location", loginUser.location);
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      await delay(1200);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section
      className={`relative overflow-hidden bg-[#eef5ef] px-4 sm:px-6 lg:px-8 ${
        isSignup
          ? "flex min-h-[calc(100vh-4.5rem)] items-center pt-24 pb-4 sm:pt-26 sm:pb-5"
          : "flex flex-1 min-h-full items-center pt-24 pb-0 sm:pt-26 sm:pb-0"
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(174,230,194,0.45),_transparent_26%),radial-gradient(circle_at_bottom_right,_rgba(186,231,201,0.35),_transparent_24%)]" />
      <div className="relative mx-auto w-full max-w-2xl rounded-[1.8rem] shadow-[0_20px_42px_rgba(15,23,42,0.08),0_0_0_2px_rgba(220,252,231,0.88),0_0_30px_rgba(167,243,208,0.36)]">
        <div
          className={`rounded-[1.8rem] p-4 text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.45),inset_0_-10px_18px_rgba(22,101,52,0.05),0_10px_22px_rgba(15,23,42,0.05)] sm:p-5 lg:p-6 ${
            isSignup
              ? "bg-[linear-gradient(145deg,#eef9f1_0%,#e2f4e8_45%,#d6eedf_100%)]"
              : "bg-[linear-gradient(145deg,#f4fcf6_0%,#eaf8ee_45%,#e0f3e6_100%)]"
          }`}
        >
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mx-auto max-w-2xl">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <span className="inline-flex rounded-full bg-[linear-gradient(135deg,#f4fff6_0%,#d7f4df_100%)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-emerald-700 shadow-[0_6px_14px_rgba(34,197,94,0.10)]">
                    {isSignup ? "New User" : "Existing User"}
                  </span>
                  <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                    {isSignup ? "Create your account" : "Login to continue"}
                  </h2>
                </div>

                <div className="inline-flex rounded-full border border-emerald-200 bg-[linear-gradient(135deg,#f4fff6_0%,#d8efe0_100%)] p-1 shadow-[0_10px_20px_rgba(15,23,42,0.06)]">
                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={() => {
                      setIsSignup(true);
                      setError("");
                      setSuccess("");
                    }}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      isSignup
                        ? "bg-[linear-gradient(135deg,#16a34a_0%,#22c55e_100%)] text-white shadow-[0_10px_18px_rgba(22,163,74,0.24)] ring-2 ring-emerald-100"
                        : "bg-transparent text-slate-700"
                    } ${isProcessing ? "cursor-not-allowed opacity-60" : ""}`}
                  >
                    Sign Up
                  </button>
                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={() => {
                      setIsSignup(false);
                      setError("");
                      setSuccess("");
                    }}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      !isSignup
                        ? "bg-[linear-gradient(135deg,#0f172a_0%,#1e293b_100%)] text-white shadow-[0_10px_18px_rgba(15,23,42,0.22)] ring-2 ring-slate-100/80"
                        : "bg-transparent text-slate-700"
                    } ${isProcessing ? "cursor-not-allowed opacity-60" : ""}`}
                  >
                    Login
                  </button>
                </div>
              </div>

              <div className="mt-5 space-y-3.5">
                {isSignup && (
                  <div className="grid gap-3.5 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className={fieldLabelClassName}>Name</label>
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={isProcessing}
                        placeholder="Enter your name"
                        required
                        className={inputClassName}
                      />
                    </div>

                    <div>
                      <label className={fieldLabelClassName}>Gender</label>
                      <GenderSelect
                        value={formData.gender}
                        disabled={isProcessing}
                        onChange={(val) => setFormData({ ...formData, gender: val })}
                      />
                    </div>

                    <div>
                      <label className={fieldLabelClassName}>Location</label>
                      <LocationSelect
                        value={formData.location}
                        disabled={isProcessing}
                        onChange={(val) => setFormData({ ...formData, location: val })}
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className={fieldLabelClassName}>Email</label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isProcessing}
                    placeholder="Enter your email"
                    required
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label className={fieldLabelClassName}>Password</label>
                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isProcessing}
                    placeholder="Enter your password"
                    required
                    className={inputClassName}
                  />
                </div>

                {error && (
                  <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                    {success}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`w-full rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_22px_rgba(15,23,42,0.12)] transition ${
                    isProcessing
                      ? "cursor-not-allowed opacity-80"
                      : "hover:-translate-y-0.5 hover:bg-emerald-600"
                  }`}
                >
                  {isProcessing
                    ? isSignup
                      ? "Processing..."
                      : "Logging in..."
                    : isSignup
                      ? "Create account"
                      : "Login now"}
                </button>

                <p className="text-center text-sm leading-6 text-slate-600">
                  {isSignup ? "Already have an account?" : "Do not have an account?"}{" "}
                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={() => {
                      setIsSignup(!isSignup);
                      setError("");
                      setSuccess("");
                    }}
                    className={`font-semibold text-emerald-700 underline-offset-4 transition hover:text-emerald-600 hover:underline ${
                      isProcessing ? "cursor-not-allowed opacity-60 no-underline" : ""
                    }`}
                  >
                    {isSignup ? "Login here" : "Sign up here"}
                  </button>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AuthForm;

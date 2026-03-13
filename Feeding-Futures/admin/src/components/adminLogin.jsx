import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./AppContext.jsx";

const inputClassName =
  "admin-interactive w-full rounded-2xl border border-emerald-200/24 bg-white/14 px-4 py-3.5 text-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_10px_22px_rgba(0,0,0,0.10)] outline-none transition placeholder:text-emerald-50/50 focus:border-emerald-200/45 focus:ring-4 focus:ring-emerald-200/10";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AppContext);

  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

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
      if (formData.email === adminEmail && formData.password === adminPassword) {
        localStorage.setItem("role", "admin");
        localStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
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
    <section className="admin-page relative flex min-h-screen items-center overflow-hidden bg-[linear-gradient(180deg,#f8fcf9_0%,#edf5f0_100%)] px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.08),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(15,23,42,0.06),_transparent_26%)]" />
      <div className="relative mx-auto w-full max-w-5xl rounded-[1.8rem] shadow-[0_20px_48px_rgba(15,23,42,0.06),0_0_0_1px_rgba(167,243,208,0.22),0_0_14px_rgba(110,231,183,0.08)]">
        <div className="grid gap-4 rounded-[1.9rem] bg-[#eef3ef]/85 p-4 sm:p-5 lg:grid-cols-[1.02fr_0.78fr] lg:p-6">
          <div className="mx-auto w-full max-w-2xl">
            <form
              onSubmit={handleSubmit}
              className="admin-card admin-fade-up rounded-[1.6rem] bg-gradient-to-br from-[#355f6f] via-[#4b8c85] to-[#7dc8bc] p-5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-10px_18px_rgba(0,0,0,0.04),0_10px_22px_rgba(10,40,32,0.10)] sm:p-6"
              aria-labelledby="admin-login-title"
            >
              <span className="inline-flex rounded-full border border-white/12 bg-white/16 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-emerald-50">
                Admin Login
              </span>
              <h2
                id="admin-login-title"
                className="mt-4 text-2xl font-black tracking-tight text-white sm:text-3xl"
              >
                Welcome back
              </h2>
              <p className="mt-2 text-sm leading-6 text-emerald-50/88">
                Secure access for the admin workspace.
              </p>

              <div className="mt-5 space-y-3.5">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold tracking-[0.03em] text-emerald-50/90">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold tracking-[0.03em] text-emerald-50/90">
                    Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    className={inputClassName}
                  />
                </div>

                {error && (
                  <div className="rounded-2xl border border-rose-300/30 bg-rose-500/10 px-4 py-3 text-sm font-medium text-rose-100">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="admin-interactive w-full rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(2,18,38,0.22)] transition hover:-translate-y-0.5 hover:bg-emerald-300 hover:text-slate-950"
                >
                  Login to dashboard
                </button>

                <button
                  type="button"
                  onClick={() => (window.location.href = import.meta.env.VITE_API_START)}
                  className="admin-interactive w-full rounded-2xl border border-white/15 px-5 py-3 text-sm font-semibold text-emerald-50/90 transition hover:bg-white/8"
                >
                  Not an admin? Go back
                </button>

                <button
                  type="button"
                  onClick={autoFillCredentials}
                  className="admin-interactive w-full rounded-2xl border border-emerald-300/25 bg-white/8 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/12"
                >
                  Auto-fill demo credentials
                </button>
              </div>
            </form>
          </div>

          <div className="admin-card admin-fade-up overflow-hidden rounded-[1.6rem] bg-gradient-to-br from-[#355f6f] via-[#4b8c85] to-[#86cfc3] p-5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-10px_18px_rgba(0,0,0,0.04),0_10px_22px_rgba(10,40,32,0.10)] sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div className="inline-flex rounded-full bg-white/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.26em] text-emerald-50">
                Demo Access
              </div>
              <div className="rounded-full bg-white/14 px-3 py-1 text-sm font-semibold text-white/95">
                demo
              </div>
            </div>

            <h3 className="mt-4 text-2xl font-black leading-tight sm:text-3xl">
              Testing credentials
            </h3>
            <p className="mt-3 text-sm leading-6 text-emerald-50/85">
              Use these values for local demo or testing only.
            </p>

            <div className="mt-5 space-y-3">
              <div className="rounded-[1.3rem] bg-white/10 p-4">
                <div className="text-xs uppercase tracking-[0.24em] text-emerald-100/75">
                  Email
                </div>
                <div className="mt-2 break-all text-lg font-semibold text-white/95">
                  {adminEmail}
                </div>
              </div>

              <div className="rounded-[1.3rem] bg-white/10 p-4">
                <div className="text-xs uppercase tracking-[0.24em] text-emerald-100/75">
                  Password
                </div>
                <div className="mt-2 break-all text-lg font-semibold tracking-[0.16em] text-white/95">
                  {adminPassword}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;

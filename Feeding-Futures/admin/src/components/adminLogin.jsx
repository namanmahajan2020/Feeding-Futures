import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./AppContext.jsx";
import { FaGithub, FaInstagram, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";

const inputClassName =
  "admin-interactive w-full rounded-2xl border border-emerald-200/24 bg-white/14 px-4 py-3.5 text-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_10px_22px_rgba(0,0,0,0.10)] outline-none transition placeholder:text-emerald-50/50 focus:border-emerald-200/45 focus:ring-4 focus:ring-emerald-200/10";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AppContext);

  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

  useEffect(() => {
    const isLoggedIn =
      localStorage.getItem("isLoggedIn") || sessionStorage.getItem("isLoggedIn");
    const role = localStorage.getItem("role") || sessionStorage.getItem("role");

    if (isLoggedIn === "true" && role === "admin") {
      navigate("/dashboard", { replace: true });
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
        sessionStorage.setItem("role", "admin");
        sessionStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
        navigate("/dashboard", { replace: true });
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
    <div className="admin-page flex min-h-screen flex-col bg-[linear-gradient(180deg,#eef6f2_0%,#e7f0ec_100%)] text-slate-100">
<header className="fixed top-0 left-0 right-0 z-40 border-b border-cyan-300/15 bg-[linear-gradient(120deg,#122041_0%,#1a2f57_58%,#1f3d6e_100%)] shadow-[0_10px_20px_rgba(6,23,46,0.24)]">
  <div className="flex h-18 w-full items-center justify-between px-4 sm:px-6 md:px-10 lg:px-14">
          <h1 className="ml-1 text-[1.2rem] font-extrabold leading-none text-slate-100 sm:text-[1.35rem] md:ml-0 md:text-[1.5rem] lg:text-[1.6rem]">
      Feeding <span className="text-emerald-400">Futures</span>{" "}
      <span className="text-slate-300">- Admin</span>
    </h1>
  </div>
</header>

      <main className="relative flex flex-1 items-center justify-center overflow-hidden px-4 pt-24 pb-6 sm:px-6 sm:pt-24 sm:pb-8 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(20,184,166,0.10),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.10),_transparent_34%)]" />
        <div className="relative mx-auto w-full max-w-2xl rounded-[1.8rem] shadow-[0_20px_42px_rgba(15,23,42,0.10),0_0_0_2px_rgba(167,243,208,0.22),0_0_28px_rgba(94,234,212,0.22)]">
          <form
            onSubmit={handleSubmit}
            className="admin-card admin-fade-up rounded-[1.8rem] border border-emerald-100/25 bg-gradient-to-br from-[#355f6f] via-[#4b8c85] to-[#7dc8bc] p-4 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-10px_18px_rgba(0,0,0,0.04),0_14px_26px_rgba(10,40,32,0.14)] sm:p-5 lg:p-6"
            aria-labelledby="admin-login-title"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex rounded-full border border-white/15 bg-white/14 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-emerald-50">
                Admin Login
              </span>
              <span className="inline-flex rounded-full border border-white/12 bg-white/16 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-50">
                Demo Access
              </span>
            </div>
            <h2 id="admin-login-title" className="mt-4 text-[2rem] font-black tracking-tight text-white sm:text-3xl">
              Welcome Back Naman
            </h2>
            <p className="mt-2 text-base leading-7 text-emerald-50/88">
              Managing food today, creating smiles tomorrow
            </p>

            <div className="mt-6 space-y-4">
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
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    className={`${inputClassName} admin-password-input pr-12`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-emerald-50/85 transition hover:text-white"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                  </button>
                </div>
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
                className="admin-interactive w-full rounded-2xl border border-white/20 px-5 py-3 text-sm font-semibold text-emerald-50/90 transition hover:bg-white/8"
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
      </main>

      <footer className="border-t border-cyan-300/20 bg-[linear-gradient(120deg,#08152c_0%,#0a1f3d_55%,#0b2749_100%)] px-4 py-4 text-sm text-cyan-50 md:px-10 lg:px-14">
        <div className="grid w-full grid-cols-1 items-center gap-4 text-center md:grid-cols-[auto_1fr_auto] md:text-left">
          <h2 className="justify-self-center text-[1.65rem] font-semibold text-slate-100 md:justify-self-start md:text-[1.75rem]">
            Feeding <span className="text-emerald-400">Futures</span>
          </h2>

          <div className="text-center text-sm text-gray-400 md:justify-self-center">
            <p >&copy; {new Date().getFullYear()} Feeding Futures Admin. All Rights Reserved.</p>
            <p className="mt-1 italic text-cyan-100/90">
              Track the food, plan the share - creating smiles everywhere{"\u2764\uFE0F"}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 md:justify-self-end">
            <a
              href="https://www.instagram.com/namanmahajan_17/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-emerald-300/35 bg-cyan-100/5 p-2 text-cyan-50 shadow-[0_8px_18px_rgba(20,184,166,0.15)] transition hover:-translate-y-0.5 hover:text-emerald-300"
              aria-label="Instagram"
            >
              <FaInstagram className="h-5 w-5" />
            </a>
            <a
              href="mailto:mahajannaman2020@gmail.com"
              className="rounded-full border border-emerald-300/35 bg-cyan-100/5 p-2 text-cyan-50 shadow-[0_8px_18px_rgba(20,184,166,0.15)] transition hover:-translate-y-0.5 hover:text-emerald-300"
              aria-label="Email"
            >
              <FaEnvelope className="h-5 w-5" />
            </a>
            <a
              href="https://github.com/namanmahajan2020"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-emerald-300/35 bg-cyan-100/5 p-2 text-cyan-50 shadow-[0_8px_18px_rgba(20,184,166,0.15)] transition hover:-translate-y-0.5 hover:text-emerald-300"
              aria-label="GitHub"
            >
              <FaGithub className="h-5 w-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminLogin;


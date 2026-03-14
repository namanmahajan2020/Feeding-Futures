import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LogOut } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const [donations, setDonations] = useState([]);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const gender = localStorage.getItem("gender");

  useEffect(() => {
    if (!name || !email) {
      navigate("/signup");
    } else {
      fetchDonations();
    }
  }, []);

  const fetchDonations = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/food-donation/get`,
        {
          email: localStorage.getItem("email"),
        }
      );
      setDonations(res.data);
    } catch (error) {
      console.error("Error fetching donations:", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/start");
  };

  useEffect(() => {
    if (!showLogoutConfirm) return undefined;

    const timer = window.setTimeout(() => {
      setShowLogoutConfirm(false);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [showLogoutConfirm]);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-green-50 to-white">
      <div className="flex flex-grow items-start justify-center px-4 pb-10 pt-24 sm:px-6 md:pt-28">
        <div className="mt-2 w-full max-w-3xl rounded-2xl border border-emerald-100 bg-gradient-to-t from-green-50 to-teal-50 p-4 shadow-md sm:mt-6 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="flex items-center text-2xl font-semibold text-gray-800 sm:text-3xl sm:font-semibold sm:text-slate-900">
              <span className="mr-3 inline-flex rounded-full bg-[linear-gradient(135deg,#22c55e,#06b6d4)] p-[2px]">
                <span className="inline-flex rounded-full bg-white p-1">
                  <img src="img/user.png" alt="user" className="h-8 w-8 sm:h-10 sm:w-10" />
                </span>
              </span>
              Your Profile
            </h2>

            <div className="relative w-full sm:w-auto">
              {!showLogoutConfirm && (
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 font-bold text-white transition hover:scale-[1.01] hover:bg-red-500 sm:w-auto"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
              )}
              {showLogoutConfirm && (
                <div className="absolute right-0 top-0 z-20 w-[13rem] rounded-2xl border border-white/60 bg-white/35 p-3 shadow-[0_18px_42px_rgba(15,23,42,0.22)] backdrop-blur-xl sm:w-[14rem] md:w-[15rem] md:p-4">
                  <p className="text-sm font-semibold text-rose-700 md:text-base">
                    Confirm logout
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="rounded-lg bg-rose-600 px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-rose-500 md:px-3 md:py-1.5 md:text-sm"
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowLogoutConfirm(false)}
                      className="rounded-lg bg-slate-200/90 px-3.5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-300 md:px-3 md:py-1.5 md:text-sm"
                    >
                      No
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 grid gap-3 text-gray-700 sm:grid-cols-1 sm:gap-2">
            <div className="rounded-xl bg-white/75 px-4 py-3 shadow-sm sm:bg-transparent sm:px-0 sm:py-0 sm:shadow-none">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-700 sm:text-base sm:tracking-normal sm:text-slate-800">
                Name: <span className="font-medium text-slate-800">{name}</span>
              </p>
            </div>
            <div className="rounded-xl bg-white/75 px-4 py-3 shadow-sm sm:bg-transparent sm:px-0 sm:py-0 sm:shadow-none">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-700 sm:text-base sm:tracking-normal sm:text-slate-800">
                Email: <span className="font-medium normal-case text-slate-800">{email}</span>
              </p>
            </div>
            <div className="rounded-xl bg-white/75 px-4 py-3 shadow-sm sm:bg-transparent sm:px-0 sm:py-0 sm:shadow-none">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-700 sm:text-base sm:tracking-normal sm:text-slate-800">
                Gender: <span className="font-medium capitalize text-slate-800">{gender || "Not specified"}</span>
              </p>
            </div>
          </div>

          <hr className="my-6 border-green-100" />

          <h3 className="mb-3 text-xl font-semibold text-cyan-800 sm:text-2xl">
            Your Donations
          </h3>

          {donations.length > 0 ? (
            <>
              <div className="grid gap-3 md:hidden">
                {donations.map((item, index) => (
                  <div
                    key={index}
                    className="mb-4 rounded-2xl border border-cyan-100 bg-[linear-gradient(180deg,#ffffff_0%,#f0fdfa_100%)] p-4 shadow-sm"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-0">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-green-700">
                          Food
                        </p>
                        <p className="mt-1 text-sm font-medium text-slate-800">
                          {item.foodname}
                        </p>
                      </div>
                      <div className="p-0">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-green-700">
                          Type
                        </p>
                        <p className="mt-1 text-sm text-slate-700">{item.meal}</p>
                      </div>
                      <div className="p-0">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-green-700">
                          Category
                        </p>
                        <p className="mt-1 text-sm text-slate-700">
                          {item.category}
                        </p>
                      </div>
                      <div className="p-0">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-green-700">
                          Date
                        </p>
                        <p className="mt-1 text-sm text-slate-700">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="hidden overflow-x-auto rounded-xl border border-cyan-600 p-4 shadow-lg md:block">
                <div className="overflow-hidden rounded-t-xl">
                  <table className="min-w-full bg-gradient-to-r from-white to-teal-50 text-sm text-gray-700">
                    <thead className="bg-gradient-to-r from-green-400 to-teal-500 text-white">
                      <tr>
                        <th className="px-4 py-3 pl-10 text-left">Food</th>
                        <th className="px-4 py-3 text-center">Type</th>
                        <th className="px-4 py-3 text-center">Category</th>
                        <th className="px-4 py-3 text-center">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {donations.map((item, index) => (
                        <tr
                          key={index}
                          className="border-b border-green-600 text-center transition-all hover:bg-gray-50"
                        >
                          <td className="max-w-40 px-4 py-3 pl-10 text-left truncate">
                            {item.foodname}
                          </td>
                          <td className="px-4 py-3">{item.meal}</td>
                          <td className="px-4 py-3">{item.category}</td>
                          <td className="px-4 py-3">
                            {new Date(item.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            <div className="rounded-xl border border-cyan-100 bg-white/80 px-4 py-8 text-center text-sm text-gray-500 shadow-sm sm:text-base">
              No donations found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

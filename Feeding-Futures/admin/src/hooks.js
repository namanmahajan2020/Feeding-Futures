// src/hooks.js
import { useState, useEffect } from "react";
import axios from "axios";

export const useDataFetcher = () => {
  const [data, setData] = useState({ donations: [], feedback: [], users: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // 🧩 Use environment variable or fallback to localhost
        const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

        // 🔐 Admin API routes (avoid clashes with user routes)
        const [donationsRes, feedbackRes, usersRes] = await Promise.all([
          axios.get(`${BASE_URL}/api/admin/donations`),
          axios.get(`${BASE_URL}/api/admin/feedback`),
          axios.get(`${BASE_URL}/api/admin/users`),
        ]);

        setData({
          donations: donationsRes.data || [],
          feedback: feedbackRes.data || [],
          users: usersRes.data || [],
        });
      } catch (err) {
        console.error("❌ Error fetching admin data:", err);
        setError("Failed to fetch admin data from server.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error };
};

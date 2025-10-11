// src/hooks.js
import { useState, useEffect } from "react";

const MOCK_DONATIONS = [
  { id: "D001", name: "Ravi Kumar", food: "Bread & Pastries", category: "Baked Goods", phoneno: "9876543210", date: "2025-10-10 14:00", address: "12/A, Gandhi St, Madurai", quantity: "5kg", status: "Pending" },
  { id: "D002", name: "Priya Sharma", food: "Vegetables", category: "Produce", phoneno: "9988776655", date: "2025-10-09 09:30", address: "45, Anna Salai, Chennai", quantity: "10kg", status: "Collected" },
  { id: "D003", name: "Ahmed Khan", food: "Cooked Meals", category: "Prepared Food", phoneno: "9000111222", date: "2025-10-09 18:45", address: "Plot 7, Ring Rd, Coimbatore", quantity: "20 servings", status: "Collected" },
  { id: "D004", name: "Lakshmi V.", food: "Canned Goods", category: "Pantry", phoneno: "8877665544", date: "2025-10-08 11:15", address: "Old No 3, Market St, Madurai", quantity: "15 cans", status: "Pending" },
];

const MOCK_FEEDBACK = [
  { id: "F001", name: "Asha M.", email: "asha@example.com", message: "The collection process was very efficient, thank you!", date: "2025-10-10" },
  { id: "F002", name: "Gopal S.", email: "gopal@test.com", message: "I suggest adding a map feature for tracking drivers.", date: "2025-10-07" },
  { id: "F003", name: "Anonymous", email: "n/a", message: "Great initiative!", date: "2025-10-05" },
];

const MOCK_USERS = [
  { id: "U101", name: "Admin One", role: "Super Admin", location: "Chennai", lastActive: "2025-10-10 16:00" },
  { id: "U102", name: "Field Agent A", role: "Collector", location: "Madurai", lastActive: "2025-10-10 18:30" },
  { id: "U103", name: "Field Agent B", role: "Collector", location: "Coimbatore", lastActive: "2025-10-09 11:00" },
  { id: "U104", name: "Data Analyst", role: "Analyst", location: "Chennai", lastActive: "2025-10-10 09:00" },
];

export const useDataFetcher = () => {
  const [data, setData] = useState({ donations: [], feedback: [], users: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setTimeout(() => {
        setData({ donations: MOCK_DONATIONS, feedback: MOCK_FEEDBACK, users: MOCK_USERS });
        setIsLoading(false);
      }, 1000);
    };
    fetchData();
  }, []);

  return { data, isLoading };
};

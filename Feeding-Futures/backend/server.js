import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import favicon from "serve-favicon";
import connectToDatabase from "./utils/db.js";

// Normal routes
import userRoutes from "./routes/userRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import foodDonationRoutes from "./routes/foodDonationRoutes.js";

// Admin routes
import adminRoutes from "./routes/adminRoutes.js";

// ✅ New delivery routes
import deliveryRoutes from "./routes/deliveryRoutes.js";

dotenv.config();
const app = express();

// ✅ Fix __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Use favicon middleware safely
app.use(favicon(path.join(__dirname, "./Public", "favicon.ico")));

app.use(cors());
app.use(express.json());

// Avoid 500 on missing favicon requests
app.get("/favicon.ico", (req, res) => res.status(204).end());

// ✅ MongoDB Connection
connectToDatabase()
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ API Routes
app.use("/api/users", userRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/food-donation", foodDonationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/delivery", deliveryRoutes);

// Root Endpoint
app.get("/", (req, res) => {
  res.send("🌍 Feeding Futures Backend Running with Delivery API");
});

// ✅ For Vercel Serverless Environment
export default async function handler(req, res) {
  try {
    await connectToDatabase();
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
  return app(req, res);
}

// ✅ If running locally, uncomment below:
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// server.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";


import userRoutes from "./routes/userRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import foodDonationRoutes from "./routes/foodDonationRoutes.js";

// Admin routes
import adminRoutes from "./routes/adminRoutes.js";

// ✅ New delivery routes
import deliveryRoutes from "./routes/deliveryRoutes.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// DB connect (use MONGO_URI in your Vercel env)
const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
if (!mongoUri) {
  console.error("❌ Missing MONGO_URI (or MONGODB_URI) env var");
}
mongoose
  .connect(mongoUri, { dbName: process.env.MONGO_DB || "app" })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/delivery", deliveryRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/donations", foodDonationRoutes);

// Health check
app.get("/", (_req, res) => res.send("API Working"));

// Local dev: listen. On Vercel, export the app.
const port = process.env.PORT || 4000;
if (process.env.VERCEL !== "1") {
  app.listen(port, () => console.log("Server started on PORT:", port));
}

// ✅ Export for Vercel
export default app;

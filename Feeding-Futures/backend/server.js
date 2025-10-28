import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import connectToDatabase from "./utils/db.js";
import serverless from "serverless-http";

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

app.use(cors());
app.use(express.json());

// MongoDB Connection (cached for serverless)
connectToDatabase()
	.then(() => console.log("✅ MongoDB Connected"))
	.catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/food-donation", foodDonationRoutes);
app.use("/api/admin", adminRoutes);

// ✅ Delivery API routes
app.use("/api/delivery", deliveryRoutes);


// Root Endpoint
app.get("/", (req, res) => {
  res.send("🌍 Feeding Futures Backend Running with Delivery API");
});

// ✅ Export the handler for Vercel serverless
const handler = serverless(app);
export default handler;

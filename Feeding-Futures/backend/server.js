import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

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

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);

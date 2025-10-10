
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Import routes
import userRoutes from "./routes/userRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js"; // ✅ import feedbackRoutes.js

// Initialize dotenv to access environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse incoming JSON requests

// MongoDB connection
const mongoURI = process.env.MONGO_URI; // Fetch MongoDB URI from environment variables
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/users", userRoutes); // User routes
app.use("/api/feedback", feedbackRoutes); // Feedback routes

// Start the server
const PORT = process.env.PORT || 5000; // Use PORT from environment variables, or default to 5000
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

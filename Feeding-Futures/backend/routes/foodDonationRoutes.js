// routes/foodDonationRoutes.js

import express from "express";
import FoodDonation from "../models/foodDonation.js";

const router = express.Router();

// @route   POST /api/food-donation
// @desc    Create a new food donation entry
router.post("/", async (req, res) => {
  const {
    foodname,
    meal,
    category,
    quantity,
    phoneno,
    district,
    address,
    name,
    email,
  } = req.body;

  // Basic validation
  if (!foodname || !meal || !category || !quantity || !phoneno || !district || !address || !name) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const donation = new FoodDonation({
      foodname,
      meal,
      category,
      quantity,
      phoneno,
      district,
      address,
      name,
      email,
    });

    await donation.save();
    res.status(201).json({ message: "Donation submitted successfully" });
  } catch (error) {
    console.error("Error saving food donation:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

export default router;

import express from "express";
import FoodDonation from "../models/foodDonation.js";

const router = express.Router();

// POST /api/food-donation — create a new donation
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
      status: "Pending",
    });

    await donation.save();
    res.status(201).json({ message: "Donation submitted successfully" });
  } catch (error) {
    console.error("Error saving food donation:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

// POST /api/food-donation/get — get donations by email
router.post("/get", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const donations = await FoodDonation.find({ email });
    res.status(200).json(donations);
  } catch (error) {
    console.error("Error fetching donations:", error);
    res.status(500).json({ message: "Server error while fetching donations" });
  }
});

// NEW: GET /api/food-donation — get all donations (for orders page)
router.get("/", async (req, res) => {
  try {
    const donations = await FoodDonation.find().sort({ createdAt: -1 });
    res.status(200).json(donations);
  } catch (error) {
    console.error("Error fetching all donations:", error);
    res.status(500).json({ message: "Server error while fetching donations" });
  }
});

// Update delivery partner email
router.put("/assign/:id", async (req, res) => {
  const { deliveryPartner } = req.body;
  try {
    const donation = await FoodDonation.findByIdAndUpdate(
      req.params.id,
      { deliveryPartner },
      { new: true }
    );
    res.json(donation);
  } catch (error) {
    res.status(500).json({ message: "Error assigning delivery partner" });
  }
});

// Update rating
router.put("/rate/:id", async (req, res) => {
  const { rating } = req.body;
  try {
    const donation = await FoodDonation.findByIdAndUpdate(
      req.params.id,
      { rating },
      { new: true }
    );
    res.json(donation);
  } catch (error) {
    res.status(500).json({ message: "Error updating rating" });
  }
});


export default router;

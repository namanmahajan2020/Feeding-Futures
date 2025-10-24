import express from "express";
import FoodDonation from "../models/foodDonation.js";

const router = express.Router();

// ✅ POST /api/food-donation — Create a new donation
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

  if (
    !foodname ||
    !meal ||
    !category ||
    !quantity ||
    !phoneno ||
    !district ||
    !address ||
    !name
  ) {
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


// ✅ POST /api/food-donation/get — Get donations by email
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


// ✅ GET /api/food-donation — Get all donations (for Orders page)
router.get("/", async (req, res) => {
  try {
    const donations = await FoodDonation.find().sort({ createdAt: -1 });
    res.status(200).json(donations);
  } catch (error) {
    console.error("Error fetching all donations:", error);
    res.status(500).json({ message: "Server error while fetching donations" });
  }
});


// ✅ PUT /api/food-donation/:id/status — Update order status + delivery partner email
router.put("/:id/status", async (req, res) => {
  const { status, deliveryPartner } = req.body;

  if (!status) {
    return res.status(400).json({ message: "Status is required" });
  }

  try {
    const updatedDonation = await FoodDonation.findByIdAndUpdate(
      req.params.id,
      { status, deliveryPartner },
      { new: true }
    );

    if (!updatedDonation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    res.status(200).json(updatedDonation);
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Server error while updating status" });
  }
});


// ✅ PUT /api/food-donation/assign/:id — Assign delivery partner manually
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
    console.error("Error assigning delivery partner:", error);
    res.status(500).json({ message: "Error assigning delivery partner" });
  }
});


// ✅ PUT /api/food-donation/rate/:id — Update rating
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
    console.error("Error updating rating:", error);
    res.status(500).json({ message: "Error updating rating" });
  }
});

export default router;

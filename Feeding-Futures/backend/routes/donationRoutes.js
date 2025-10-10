import express from "express";
import Donation from "../models/Donations.js";

const router = express.Router();

// ✅ Get donations by email
router.post("/get", async (req, res) => {
  try {
    const { email } = req.body;
    const donations = await Donation.find({ email });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// ✅ Add a donation (optional)
router.post("/add", async (req, res) => {
  try {
    const newDonation = new Donationn(req.body);
    await newDonation.save();
    res.json({ message: "Donation added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add donation", error });
  }
});

export default router;

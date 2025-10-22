import express from "express";
import bcrypt from "bcryptjs";
import Delivery from "../models/delivery.js";

const router = express.Router();

// ------------------------
// DELIVERY SIGNUP
// ------------------------
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, gender, location } = req.body;

    // Check if email already exists
    const existingDelivery = await Delivery.findOne({ email });
    if (existingDelivery) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new delivery partner
    const newDelivery = new Delivery({
      name,
      email,
      password: hashedPassword,
      gender,
      location,
    });

    await newDelivery.save();

    res.status(201).json({
      message: "Delivery partner registered successfully",
      user: {
        name: newDelivery.name,
        email: newDelivery.email,
        gender: newDelivery.gender,
        location: newDelivery.location,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Error during signup", error: err.message });
  }
});

// ------------------------
// DELIVERY LOGIN
// ------------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const delivery = await Delivery.findOne({ email });
    if (!delivery) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, delivery.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.json({
      message: "Login successful",
      user: {
        name: delivery.name,
        email: delivery.email,
        gender: delivery.gender,
        location: delivery.location,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Error during login", error: err.message });
  }
});

export default router;

import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/Users";

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  const { name, email, password, gender } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });
    
    const user = new userser({ name, email, password, gender });
    await user.save();
    res.json({ message: "Signup successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    res.json({ message: "Login successful", user: { name: user.name, email: user.email, gender: user.gender } });
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
});

export default router;

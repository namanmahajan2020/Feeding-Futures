import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.js";

const router = express.Router();

// Signup
// Signup
// Signup
router.post("/signup", async (req, res) => {
  const { name, email, password, gender } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const user = new User({ name, email, password, gender });
    await user.save();

    // ✅ Return user data along with success message
    res.json({
      message: "Signup successful",
      user: { name: user.name, email: user.email, gender: user.gender },
    });
  } catch (err) {
    console.error(err);
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
    console.error(err);
    res.status(500).json({ message: "Server error", err });
  }
});

export default router;

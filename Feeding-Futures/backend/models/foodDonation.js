// models/foodDonation.js

import mongoose from "mongoose";

const foodDonationSchema = new mongoose.Schema({
  foodname: { type: String, required: true },
  meal: { type: String, enum: ['veg', 'Non-veg'], required: true },
  category: { type: String, enum: ['raw-food', 'cooked-food', 'packed-food'], required: true },
  quantity: { type: String, required: true },
  phoneno: { type: String, required: true },
  district: { type: String, required: true },
  address: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true }, 
}, {
  timestamps: true
});

const FoodDonation = mongoose.model("FoodDonation", foodDonationSchema);

export default FoodDonation;

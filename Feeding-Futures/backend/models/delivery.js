import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other", "Prefer not to say"], required: true },
  location: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Delivery", deliverySchema);

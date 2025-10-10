import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  name: String,
  email: String,
  gender: String,
  food: String,
  type: String,
  category: String,
  date: { type: Date, default: Date.now },
});

const Donation = mongoose.model("Donation", donationSchema);

export default Donation;

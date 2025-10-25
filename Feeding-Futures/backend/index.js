import connectDB from "./db.js";

await connectDB(process.env.MONGO_URI);
console.log("✅ MongoDB Connected");

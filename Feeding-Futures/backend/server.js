import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://nm4746_db_user:Na%4015082005@cluster0.18b8ybu.mongodb.net/",
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.use("/api/users", userRoutes);

app.listen(5000, () => console.log("Server running on http://localhost:5000"));

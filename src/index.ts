import express from "express";
import { json } from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import cardRoutes from "./routes/cardRoutes";
import errorHandler from "./middleware/errorHandler";

dotenv.config();

mongoose.connect(process.env.MONGODB_URI!, (err) => {
  if (!err) {
    console.log("MongoDB Connection Succeeded.");
  } else {
    console.log("Error in DB connection: " + err);
  }
});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(json());

app.use(cors());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/cards", cardRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`This app is running on port ${PORT} !!`);
});

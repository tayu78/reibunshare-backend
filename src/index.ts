import express from "express";
import { json } from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import http from "http";

import socket from "./utils/socket";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import cardRoutes from "./routes/cardRoutes";
import bookRoutes from "./routes/bookRoutes";
import notificationRoutes from "./routes/notificationRoutes";
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
const httpServer = new http.Server(app);
const PORT = process.env.PORT || 5000;

app.use(json());
app.use(cors());
socket(httpServer);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/cards", cardRoutes);
app.use("/api/v1/books", bookRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use(errorHandler);

httpServer.listen(PORT, () => {
  console.log(`This app is running on port ${PORT} !!`);
});

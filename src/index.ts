import express from "express";
import { json } from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes";
import errorHandler from "./middleware/errorHandler";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(json());

app.use(cors());

app.use("/api/v1/users", userRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`This app is running on port ${PORT} !!`);
});

import express from "express";
import checkAuth from "../middleware/checkAuth";
import { newBook } from "../controllers/bookController";

const router = express.Router();

router.post("/", checkAuth, newBook);

export default router;

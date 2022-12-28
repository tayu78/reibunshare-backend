import express from "express";
import checkAuth from "../middleware/checkAuth";
import { makeCard } from "../controllers/cardController";

const router = express.Router();

router.post("/", checkAuth, makeCard);

export default router;

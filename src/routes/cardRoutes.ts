import express from "express";
import checkAuth from "../middleware/checkAuth";
import { getCard, makeCard, manageLikes } from "../controllers/cardController";

const router = express.Router();

router.get("/", getCard);
router.post("/", checkAuth, makeCard);
router.put("/likes/:cardId", checkAuth, manageLikes);

export default router;

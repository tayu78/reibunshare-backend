import express from "express";
import checkAuth from "../middleware/checkAuth";
import {
  getCards,
  getBookCards,
  makeCard,
  manageLikes,
} from "../controllers/cardController";

const router = express.Router();

router.get("/", getCards);
router.post("/getBookCards", checkAuth, getBookCards);
router.post("/", checkAuth, makeCard);
router.put("/likes/:cardId", checkAuth, manageLikes);

export default router;

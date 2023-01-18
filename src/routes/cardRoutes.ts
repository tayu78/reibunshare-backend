import express from "express";
import checkAuth from "../middleware/checkAuth";
import {
  getCards,
  getBookCards,
  makeCard,
  manageLikes,
  searchCardByTag,
} from "../controllers/cardController";

const router = express.Router();

router.get("/", getCards);
router.post("/getBookCards", checkAuth, getBookCards);
router.post("/", checkAuth, makeCard);
router.put("/likes/:cardId", checkAuth, manageLikes);
router.get("/search", searchCardByTag);

export default router;

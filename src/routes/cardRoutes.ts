import express from "express";
import checkAuth from "../middleware/checkAuth";
import {
  getCards,
  getBookCards,
  makeCard,
  manageLikes,
  searchCardByTag,
  getComments,
  makeComment,
  getCard,
} from "../controllers/cardController";

const router = express.Router();

router.get("/", getCards);
router.post("/getBookCards", checkAuth, getBookCards);
router.post("/", checkAuth, makeCard);
router.put("/likes/:cardId", checkAuth, manageLikes);
router.get("/search", searchCardByTag);
router.get("/comments/:cardId", checkAuth, getComments);
router.post("/comments/:cardId", checkAuth, makeComment);
router.get("/:cardId", getCard);

export default router;

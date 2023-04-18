import express from "express";
import checkAuth from "../middleware/checkAuth";
import {
  getCards,
  getBookCards,
  makeCard,
  manageLikes,
  searchCard,
  getComments,
  makeComment,
  getCard,
  getCardsOfFollowingUser,
} from "../controllers/cardController";

const router = express.Router();

router.get("/", getCards);
router.get("/getCardsOfFollowingUser", checkAuth, getCardsOfFollowingUser);
router.post("/getBookCards", checkAuth, getBookCards);
router.post("/", checkAuth, makeCard);
router.put("/likes/:cardId", checkAuth, manageLikes);
router.get("/search", searchCard);
router.get("/comments/:cardId", checkAuth, getComments);
router.post("/comments/:cardId", checkAuth, makeComment);
router.get("/:cardId", getCard);

export default router;

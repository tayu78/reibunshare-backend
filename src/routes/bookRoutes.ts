import express from "express";
import checkAuth from "../middleware/checkAuth";
import {
  newBook,
  addToBook,
  getUserBooks,
  getBook,
} from "../controllers/bookController";

const router = express.Router();

router.get("/:bookId", getBook);
router.get("/getUserBooks/:userId", getUserBooks);
router.post("/", checkAuth, newBook);
router.put("/add/:bookId", checkAuth, addToBook);

export default router;

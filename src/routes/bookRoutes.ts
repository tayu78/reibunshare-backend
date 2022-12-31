import express from "express";
import checkAuth from "../middleware/checkAuth";
import { newBook, addToBook } from "../controllers/bookController";

const router = express.Router();

router.post("/", checkAuth, newBook);
router.put("/add/:bookId", checkAuth, addToBook);

export default router;

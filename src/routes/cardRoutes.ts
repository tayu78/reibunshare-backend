import express from "express";
import { makeCard } from "../controllers/cardController";


const router = express.Router();

router.post("/", makeCard);


export default router;

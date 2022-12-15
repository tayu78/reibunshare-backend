import express from "express";

import { getUserData } from "../controllers/userController";
import checkAuth from "../middleware/checkAuth";


const router = express.Router();

router.get("/", checkAuth, getUserData);

export default router;

import express from "express";
import checkAuth from "../middleware/checkAuth";
import { getUserNotifications } from "../controllers/notificationController";

const router = express.Router();

router.get("/", checkAuth, getUserNotifications);

export default router;

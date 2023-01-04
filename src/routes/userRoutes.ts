import express from "express";

import { getUserData, manageFollowing } from "../controllers/userController";
import checkAuth from "../middleware/checkAuth";

const router = express.Router();

router.get("/me", checkAuth, getUserData);
router.put("/:followingUserId/manageFollowing", checkAuth, manageFollowing);

export default router;

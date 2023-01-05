import express from "express";

import {
  getLoggedInUserProfile,
  manageFollowing,
  getOtherUserProfile,
} from "../controllers/userController";
import checkAuth from "../middleware/checkAuth";

const router = express.Router();

router.get("/me", checkAuth, getLoggedInUserProfile);
router.get("/them/:userId", getOtherUserProfile);
router.put("/:followingUserId/manageFollowing", manageFollowing);

export default router;

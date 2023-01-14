import express from "express";
import {
  getLoggedInUserProfile,
  manageFollowing,
  getOtherUserProfile,
  updateProfileInfo,
  updateProfileImg,
} from "../controllers/userController";
import checkAuth from "../middleware/checkAuth";
import upload from "../middleware/multer";

const router = express.Router();

router.get("/me", checkAuth, getLoggedInUserProfile);
router.get("/them/:userId", getOtherUserProfile);
router.put("/:followingUserId/manageFollowing", checkAuth, manageFollowing);
router.put("/updateProfileInfo", checkAuth, updateProfileInfo);
router.put(
  "/updateProfileImg",
  checkAuth,
  upload.single("profileImg"),
  updateProfileImg
);

export default router;

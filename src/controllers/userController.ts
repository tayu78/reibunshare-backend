import { RequestHandler } from "express";
import { Types } from "mongoose";
import User from "../models/user";
import Book from "../models/book";

export const getUserData: RequestHandler = async (req, res, next) => {
  const { user } = req.userData!;
  try {
    const userBooks = await Book.find({
      createdBy: user._id,
    });
    return res.status(200).json({
      user: {
        ...user._doc,
        userBooks,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const updateUserInfo: RequestHandler = async (req, res, next) => {
  const { user } = req.userData!;
  try {
  } catch (err) {
    next(err);
  }
};

export const manageFollowing: RequestHandler = async (req, res, next) => {
  const { user: u } = req.userData!;
  const { isFollowing } = req.query;
  const { followingUserId } = req.params;

  try {
    const user = new User(u);

    const followingUser = await User.findById(followingUserId);
    if (!followingUser) {
      return res.status(404).json({
        message: "User with provided ID does not exist.",
      });
    }

    if (isFollowing === "true") {
      user.following.push(new Types.ObjectId(followingUserId));
      followingUser.follower.push(user._id);
    } else {
      user.following = user.following.filter((id) => {
        return !id.equals(followingUserId);
      });
      followingUser.follower = followingUser.follower.filter((id) => {
        return !id.equals(user._id);
      });
    }

    await user.save();
    await followingUser.save();

    return res.status(200).json({
      message: "Managed following successfully!",
    });
  } catch (err) {
    next(err);
  }
};

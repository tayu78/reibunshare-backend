import { RequestHandler } from "express";
import { Types } from "mongoose";
import User from "../models/user";
import Book from "../models/book";
import uploadFile from "../utils/uploadFile";

export const getLoggedInUserProfile: RequestHandler = async (
  req,
  res,
  next
) => {
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

export const getOtherUserProfile: RequestHandler = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User with provided Id does not exist.",
      });
    }
    return res.status(200).json({
      user,
    });
  } catch (err) {
    next(err);
  }
};

export const updateProfileInfo: RequestHandler = async (req, res, next) => {
  const { user: u } = req.userData!;
  const { username, email } = req.body;
  try {
    const user = new User(u);

    if (username) user.username = username;
    if (email) user.email = email;
    await user.save();

    return res.status(200).json({
      message: "User information updated successfully!!",
    });
  } catch (err) {
    next(err);
  }
};

export const updateProfileImg: RequestHandler = async (req, res, next) => {
  const { user: u } = req.userData!;

  try {
    const user = new User(u);

    if (!req.file) {
      return res.status(400).json({
        message: "Please upload profile image.",
      });
    }
    const { url } = await uploadFile(
      req.file.filename,
      u._id.toHexString(),
      "users"
    );
    user.img = url;
    await user.save();

    return res.status(200).json({
      message: "User's profile image updated successfully!!",
    });
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

export const searchUser: RequestHandler = async (req, res, next) => {
  const { keyword } = req.query;
  try {
    const users = await User.find({
      $or: [
        { accountName: { $regex: keyword, $options: "i" } },
        { username: { $regex: keyword, $options: "i" } },
      ],
    });

    return res.status(200).json({
      users,
    });
  } catch (err) {
    next(err);
  }
};

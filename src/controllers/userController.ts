import { RequestHandler } from "express";
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

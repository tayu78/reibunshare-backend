import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";

export const signup: RequestHandler = async (req, res, next) => {
  const { accountName, username, email, password } = req.body;
  try {
    if (!accountName || !username || !email || !password) {
      return res.status(400).json({
        message: "Please fill all required input.",
      });
    }

    const isUsedEmail = await User.findOne({ email });
    if (isUsedEmail) {
      return res.status(400).json({
        message: "User with provided email already exists.",
      });
    }

    const isUsedAccoutName = await User.findOne({ accountName });
    if (isUsedAccoutName) {
      return res.status(400).json({
        message: "User with provided accountName already exists.",
      });
    }
    const user = await User.create({
      accountName,
      username,
      email,
      password,
    });

    const token = jwt.sign({ user }, process.env.JWT_SECRET!, {
      expiresIn: process.env.AUTH_EXPIRESIN!,
    });

    return res.status(201).json({
      message: "New user sccessfully signed up !",
      user,
      token,
    });
  } catch (err) {
    next(err);
  }
};

export const login: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "Please fill all required input.",
      });
    }
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(404).json({
        message: "User with provided email and password does not exist.",
      });
    }

    const token = jwt.sign({ user }, process.env.JWT_SECRET!, {
      expiresIn: process.env.AUTH_EXPIRESIN!,
    });

    return res.status(200).json({
      message: "User logged in successfully!",
      user,
      token,
    });
  } catch (err) {
    next(err);
  }
};

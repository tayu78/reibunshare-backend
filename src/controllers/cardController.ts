import { RequestHandler } from "express";
import Card from "../models/card";

export const makeCard: RequestHandler = async (req, res, next) => {
  const { user } = req.userData!;
  const { phrase, usages, description, img, meaning } = req.body;
  try {
    const card = await Card.create({
      userId: user._id,
      phrase,
      usages,
      description,
      img,
      meaning,
    });

    return res.status(201).json({
      message: "New card created successfully!!",
      card,
    });
  } catch (err) {
    next(err);
  }
};

export const getCard: RequestHandler = (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

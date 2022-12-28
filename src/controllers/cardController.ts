import { RequestHandler } from "express";
import Card from "../models/card";
import Tag from "../models/tag";

export const makeCard: RequestHandler = async (req, res, next) => {
  const { user } = req.userData!;
  const { phrase, usages, description, img, meaning, tags } = req.body;

  try {
    const createTagPromise = tags.map((tag: string) => {
      return Tag.findOneAndUpdate(
        { name: tag },
        { name: tag },
        { upsert: true, new: true }
      );
    });

    const cardTags = await Promise.all(createTagPromise);
    const tagIds = cardTags.map(({ _id }) => _id);

    const card = await Card.create({
      userId: user._id,
      phrase,
      usages,
      description,
      img,
      meaning,
      tags: tagIds,
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

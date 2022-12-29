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

export const getCard: RequestHandler = async (req, res, next) => {
  try {
    const cards = await Card.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
          pipeline: [{ $project: { _id: 0, accountName: 1, img: 1 } }],
        },
      },
      {
        $unwind: "$user",
      },
      {
        $lookup: {
          from: "tags",
          localField: "tags",
          foreignField: "_id",
          as: "tags",
          pipeline: [{ $project: { _id: 0, name: 1 } }],
        },
      },
    ]);

    return res.status(200).json({
      cards,
    });
  } catch (err) {
    next(err);
  }
};

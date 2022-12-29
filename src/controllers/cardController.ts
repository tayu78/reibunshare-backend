import { RequestHandler } from "express";
import Card from "../models/card";
import Tag from "../models/tag";

export const makeCard: RequestHandler = async (req, res, next) => {
  const { user } = req.userData!;
  const { phrase, usages, description, img, meaning, tags } = req.body;

  try {
    const createTagPromise = tags.map(({ name }: { name: string }) => {
      return Tag.findOneAndUpdate(
        { name },
        { name },
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
    ]).sort({ createdAt: -1 });

    return res.status(200).json({
      cards,
    });
  } catch (err) {
    next(err);
  }
};

export const manageLikes: RequestHandler = async (req, res, next) => {
  const { cardId } = req.params;
  const { isLike } = req.query;
  const { user } = req.userData!;

  try {
    const card = await Card.findById(cardId);
    if (!card) {
      return res.status(404).json({
        message: "Card with provided Id does not exist.",
      });
    }
    if (isLike) card.likes.push(user._id);
    else
      card.likes = card.likes.filter((id) => {
        id !== user._id;
      });

    await card.save();

    return res.status(200).json({
      message: "likes for the card is successfully managed.",
    });
  } catch (err) {
    next(err);
  }
};

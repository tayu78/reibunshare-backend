import { RequestHandler } from "express";
import { Types } from "mongoose";
import Card from "../models/card";
import Tag from "../models/tag";

export const makeCard: RequestHandler = async (req, res, next) => {
  const { user } = req.userData!;
  const { phrase, usages, description, img, meaning, tags } = req.body;

  try {
    let tagIds = [];
    if (tags) {
      const createTagPromise = tags.map(({ name }: { name: string }) => {
        return Tag.findOneAndUpdate(
          { name },
          { name },
          { upsert: true, new: true }
        );
      });

      const cardTags = await Promise.all(createTagPromise);
      tagIds = cardTags?.map(({ _id }) => _id);
    }

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

export const getCards: RequestHandler = async (req, res, next) => {
  try {
    const cards = await Card.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
          pipeline: [{ $project: { accountName: 1, img: 1 } }],
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
    if (isLike === "true") card.likes.push(user._id);
    else
      card.likes = card.likes.filter((id) => {
        return !id.equals(user._id);
      });
    await card.save();

    console.log("card", card.likes);

    return res.status(200).json({
      message: "likes for the card is successfully managed.",
    });
  } catch (err) {
    next(err);
  }
};

export const getBookCards: RequestHandler = async (req, res, next) => {
  const { cardIds } = req.body;
  try {
    const bookCards = await Card.aggregate([
      {
        $match: {
          _id: { $in: cardIds.map((id: string) => new Types.ObjectId(id)) },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
          pipeline: [{ $project: { accountName: 1, img: 1 } }],
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

    if (bookCards.length === 0) {
      return res.status(404).json({
        message: "Cards of the Book with provided Ids do not exist.",
      });
    }

    return res.status(200).json({
      bookCards,
    });
  } catch (err) {
    next(err);
  }
};

export const searchCardByTag: RequestHandler = async (req, res, next) => {
  const { keyword } = req.query;
  try {
    const tagIds = await Tag.find({
      name: { $regex: keyword, $options: "i" },
    }).select({ _id: 1 });

    if (tagIds.length === 0) {
      return res.status(200).json({ cards: [] });
    }

    const cards = await Card.aggregate([
      {
        $match: { tags: { $in: tagIds.map((obj) => obj._id) } },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
          pipeline: [{ $project: { accountName: 1, img: 1 } }],
        },
      },
      {
        $unwind: "$user",
      },
    ]);

    return res.status(200).json({
      cards,
    });
  } catch (err) {
    next(err);
  }
};

import { RequestHandler } from "express";
import { Types } from "mongoose";
import Card from "../models/card";
import Tag from "../models/tag";
import Comment from "../models/comment";

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

export const getCard: RequestHandler = async (req, res, next) => {
  const { cardId } = req.params;
  try {
    // const card = await Card.findById(cardId);
    const card = await Card.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(cardId),
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
    ]);

    if (card.length === 0) {
      return res.status(404).json({
        message: "Card with provided ID does not exist.",
      });
    }
    return res.status(200).json({
      card: card[0],
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

export const getCardsOfFollowingUser: RequestHandler = async (
  req,
  res,
  next
) => {
  const { user } = req.userData!;
  try {
    console.log("user>>>>>", user);

    const cards = await Card.aggregate([
      {
        $match: {
          userId: {
            $in: user.following,
          },
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

    res.status(200).json({
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
    if (isLike === "true") {
      if (card.likes.includes(user._id)) {
        return res.status(200).json({
          message: "likes for the card is successfully managed.",
        });
      }
      card.likes.push(user._id);
    } else
      card.likes = card.likes.filter((id) => {
        return !id.equals(user._id);
      });
    await card.save();
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

export const searchCard: RequestHandler = async (req, res, next) => {
  const { keyword, type } = req.query;
  try {
    let cards;
    if (type === "tag") {
      const tagIds = await Tag.find({
        name: { $regex: keyword, $options: "i" },
      }).select({ _id: 1 });

      if (tagIds.length === 0) {
        return res.status(200).json({ cards: [] });
      }

      cards = await Card.aggregate([
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
    } else if (type === "phrase") {
      cards = await Card.aggregate([
        {
          $match: { phrase: { $regex: keyword, $options: "i" } },
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
      ]);
    } else {
      return res.status(400).json({
        message: "Please provide valid search type.",
      });
    }

    return res.status(200).json({
      cards,
    });
  } catch (err) {
    next(err);
  }
};

export const getComments: RequestHandler = async (req, res, next) => {
  const { cardId } = req.params;
  try {
    const comments = await Comment.aggregate([
      {
        $match: {
          cardId: new Types.ObjectId(cardId),
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
      { $unwind: "$user" },
    ]).sort({ createdAt: -1 });
    res.status(200).json({
      comments,
    });
  } catch (err) {
    next(err);
  }
};

export const makeComment: RequestHandler = async (req, res, next) => {
  const { user } = req.userData!;
  const { cardId } = req.params;
  const { content } = req.body;

  try {
    const comment = await Comment.create({
      userId: user._id,
      cardId,
      content,
    });

    res.status(201).json({
      message: "New comment created successfully!!",
      comment,
    });
  } catch (err) {
    next(err);
  }
};

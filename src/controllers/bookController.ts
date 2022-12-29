import { RequestHandler } from "express";
import Book from "../models/book";

export const newBook: RequestHandler = async (req, res, next) => {
  const { user } = req.userData!;
  const { bookName, bookDescription, cardId } = req.body;

  try {
    const book = await Book.create({
      name: bookName,
      description: bookDescription,
      createdBy: user._id,
      cards: [cardId],
    });
    return res.status(201).json({
      message: "New book created successfully!!",
      book,
    });
  } catch (err) {
    next(err);
  }
};

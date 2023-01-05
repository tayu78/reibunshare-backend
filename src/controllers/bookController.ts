import { RequestHandler } from "express";
import Book from "../models/book";

export const getBook: RequestHandler = async (req, res, next) => {
  const { bookId } = req.params;
  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        message: "The book with provided ID does not exist.",
      });
    }
    return res.status(200).json({
      book,
    });
  } catch (err) {
    next(err);
  }
};

export const getUserBooks: RequestHandler = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const books = await Book.find({ createdBy: userId });
    return res.status(200).json({
      books,
    });
  } catch (err) {
    next(err);
  }
};

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

export const addToBook: RequestHandler = async (req, res, next) => {
  const { isAdding } = req.query;
  const { bookId } = req.params;
  const { cardId } = req.body;
  try {
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        message: "Book with provided ID does not exist.",
      });
    }

    console.log("cards: ", book.cards);

    if (isAdding === "true") {
      book.cards.push(cardId);
      await book.save();
      return res.status(200).json({
        message: "The card is added to the book successfully!!",
      });
    } else {
      book.cards = book.cards.filter((id) => {
        return !id.equals(cardId);
      });
      await book.save();
      return res.status(200).json({
        message: "The card is removed from the book successfully!!",
      });
    }
  } catch (err) {
    next(err);
  }
};

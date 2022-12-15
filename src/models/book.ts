import { Schema, Types, model } from "mongoose";
import { IBook } from "../types";

const bookSchema = new Schema<IBook>({
  createdBy: Types.ObjectId,
  cards: [Types.ObjectId],
  description: String,
});

const Book = model("Book", bookSchema);

export default Book;

import { Schema, model } from "mongoose";
import { IComment } from "../types";

const commentSchema = new Schema<IComment>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    cardId: {
      type: Schema.Types.ObjectId,
      ref: "Card",
    },
    content: String,
  },
  { timestamps: true }
);

const Comment = model("Comment", commentSchema);

export default Comment;

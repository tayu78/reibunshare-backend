import { Schema, Types, model } from "mongoose";
import { INotification } from "../types";

const notificationSchema = new Schema<INotification>(
  {
    sendTo: [Types.ObjectId],
    sendFrom: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    content: String,
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Notification = model("Notification", notificationSchema);

export default Notification;

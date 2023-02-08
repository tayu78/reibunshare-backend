import { Schema, model } from "mongoose";
import { IOnlineUser } from "../types/index.d";

const onlineUserSchema = new Schema<IOnlineUser>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    socketId: String,
  },
  { timestamps: true }
);

const OnlineUser = model("onlineUser", onlineUserSchema);

export default OnlineUser;

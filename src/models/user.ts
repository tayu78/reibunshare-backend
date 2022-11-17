import { Schema, Types, model } from "mongoose";
import { IUser } from "../types";

const userSchema = new Schema<IUser>({
    accountName: String,
    username: String,
    email: String,
    password: String,
    img: String,
    follower: [Types.ObjectId],
    following: [Types.ObjectId],
})

const User = model("User",userSchema)


export default User;

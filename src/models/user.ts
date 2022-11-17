import { Schema, Types, model } from "mongoose";


interface User{
    _id: Types.ObjectId,
    accountName: string,
    username: string,
    email: string,
    password: string,
    img: string,
    follower: Types.ObjectId[],
    following: Types.ObjectId[],
}

const userSchema = new Schema<User>({
    accountName: String,
    username: String,
    email: String,
    password: String,
    img: String,
    follower: [Types.ObjectId],
    following: [Types.ObjectId],
})

const user = model("User",userSchema)


export default user;

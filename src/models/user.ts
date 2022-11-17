import { Schema, Types, model } from "mongoose";


interface IUser{
    _id: Types.ObjectId,
    accountName: string,
    username: string,
    email: string,
    password: string,
    img: string,
    follower: Types.ObjectId[],
    following: Types.ObjectId[],
}

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

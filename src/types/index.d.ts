import { Types } from "mongoose";

export interface IUser{
    _id: Types.ObjectId,
    accountName: string,
    username: string,
    email: string,
    password: string,
    img: string,
    follower: Types.ObjectId[],
    following: Types.ObjectId[],
}

export interface IBook {
    _id: Types.ObjectId,
    createdBy: Types.ObjectId,
    cards: Types.ObjectId[],
    description: string
}

export interface ICard {
    _id: Types.ObjectId,
    userId: Types.ObjectId,
    reibun: Reibun[]
    description: string,
    img: string,
    likes: Types.ObjectId[],
    tags: Types.ObjectId[]
    createdAt: Date,
    updatedAt: Date
}

export interface INotification {
    _id: Types.ObjectId,
    sendTo: Types.ObjectId[],
    content: string,
    createdAt: Date
}

export interface ITag {
    _id: Types.ObjectId,
    name: string
}

export interface Reibun {
    A?: string,
    B?: string
}


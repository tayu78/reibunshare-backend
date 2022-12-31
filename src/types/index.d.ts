import { Types, Document } from "mongoose";

interface MongoDoc {
  _doc: any;
}
export interface IUser extends MongoDoc {
  _id: Types.ObjectId;
  accountName: string;
  username: string;
  email: string;
  password: string;
  img: string;
  follower: Types.ObjectId[];
  following: Types.ObjectId[];
}

export interface IBook extends MongoDoc {
  _id: Types.ObjectId;
  name: string;
  createdBy: Types.ObjectId;
  cards: Types.ObjectId[];
  description: string;
}

export interface ICard extends MongoDoc {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  phrase: string;
  usages: Reibun[];
  description: string;
  meaning: string;
  img: string;
  likes: Types.ObjectId[];
  tags: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export interface INotification extends MongoDoc {
  _id: Types.ObjectId;
  sendTo: Types.ObjectId[];
  content: string;
  createdAt: Date;
}

export interface ITag extends MongoDoc {
  _id: Types.ObjectId;
  name: string;
}

export interface Reibun {
  A?: string;
  B?: string;
}

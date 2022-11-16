import { Schema, Types, model } from "mongoose";
import { Reibun } from "../types/card"

interface Card {
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



const cardSchema = new Schema<Card>({
    userId: Types.ObjectId,
    reibun: [{}],
    description: String,
    img: String,
    likes: [Types.ObjectId],
    tags: [Types.ObjectId]
},{timestamps: true})

const card = model("Card", cardSchema)

export default card;
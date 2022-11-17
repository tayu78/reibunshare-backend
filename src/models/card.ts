import { Schema, Types, model } from "mongoose";
import {ICard} from "../types"



const cardSchema = new Schema<ICard>({
    userId: Types.ObjectId,
    reibun: [{}],
    description: String,
    img: String,
    likes: [Types.ObjectId],
    tags: [Types.ObjectId]
},{timestamps: true})

const Card = model("Card", cardSchema)

export default Card;
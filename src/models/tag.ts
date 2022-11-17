import { Schema, model, Types } from "mongoose";

interface Tag {
    _id: Types.ObjectId,
    name: string
}

const tagSchema = new Schema<Tag>({
    name: String
})

const card = model("Tag", tagSchema)

export default card;
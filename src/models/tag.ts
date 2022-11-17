import { Schema, model, Types } from "mongoose";

interface ITag {
    _id: Types.ObjectId,
    name: string
}

const tagSchema = new Schema<ITag>({
    name: String
})

const Tag = model("Tag", tagSchema)

export default Tag;
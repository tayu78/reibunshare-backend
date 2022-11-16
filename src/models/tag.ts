import { Schema, model } from "mongoose";

interface Tag {
    name: string
}

const tagSchema = new Schema<Tag>({
    name: String
})

const card = model("Tag", tagSchema)

export default card;
import { Schema, model, Types } from "mongoose";
import { ITag } from "../types";



const tagSchema = new Schema<ITag>({
    name: String
})

const Tag = model("Tag", tagSchema)

export default Tag;
import { Schema, Types, model } from "mongoose";

interface Book {
    _id: Types.ObjectId,
    createdBy: Types.ObjectId,
    cards: Types.ObjectId[],
    description: string
}


const bookSchema = new Schema<Book>({
    createdBy: Types.ObjectId,
    cards: [Types.ObjectId],
    description: String
})

const book = model("Book", bookSchema)

export default book;
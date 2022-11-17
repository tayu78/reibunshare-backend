import { Schema, Types, model } from "mongoose";

interface IBook {
    _id: Types.ObjectId,
    createdBy: Types.ObjectId,
    cards: Types.ObjectId[],
    description: string
}


const bookSchema = new Schema<IBook>({
    createdBy: Types.ObjectId,
    cards: [Types.ObjectId],
    description: String
})

const Book = model("Book", bookSchema)

export default Book;
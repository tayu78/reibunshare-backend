import { Schema, Types, model } from "mongoose";

interface Notification {
    _id: Types.ObjectId,
    sendTo: Types.ObjectId[],
    content: string,
    createdAt: Date
}

const notificationSchema = new Schema<Notification>({
    sendTo: [Types.ObjectId],
    content: String,
},{timestamps: true})

const notification = model("Notification",notificationSchema)

export default notification;
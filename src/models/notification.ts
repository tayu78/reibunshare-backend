import { Schema, Types, model } from "mongoose";

interface INotification {
    _id: Types.ObjectId,
    sendTo: Types.ObjectId[],
    content: string,
    createdAt: Date
}

const notificationSchema = new Schema<INotification>({
    sendTo: [Types.ObjectId],
    content: String,
},{timestamps: true})

const Notification = model("Notification",notificationSchema)

export default Notification;
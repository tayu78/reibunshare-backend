import { Schema, Types, model } from "mongoose";
import { INotification } from "../types";


const notificationSchema = new Schema<INotification>({
    sendTo: [Types.ObjectId],
    content: String,
},{timestamps: true})

const Notification = model("Notification",notificationSchema)

export default Notification;
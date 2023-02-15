import { RequestHandler } from "express";
import Notification from "../models/notification";
import { NOTIFICATION_SEND_NUM } from "../config/variables";

export const getUserNotifications: RequestHandler = async (req, res, next) => {
  const { user } = req.userData!;
  try {
    const notifications = await Notification.aggregate([
      {
        $match: {
          sendTo: user._id,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "sendFrom",
          foreignField: "_id",
          as: "sendFrom",
        },
      },
      { $unwind: "$sendFrom" },
    ])
      .sort({ createdAt: -1 })
      .limit(NOTIFICATION_SEND_NUM);

    res.status(200).json({
      notifications,
    });
  } catch (err) {
    next(err);
  }
};

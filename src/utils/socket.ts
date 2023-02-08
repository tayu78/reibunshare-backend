import { Server } from "socket.io";
import http from "http";
import OnlineUser from "../models/onlineUser";
import Notification from "../models/notification";

const io = (http: http.Server) => {
  const socketIO = new Server(http, {
    cors: {
      origin: process.env.CLIENT_URL,
    },
  });

  socketIO.on("connection", (socket) => {
    console.log(`${socket.id} user just connected.`);
    socket.on("activeUser", async ({ userId, socketId }) => {
      const onlineUser = await OnlineUser.find({ userId });

      if (onlineUser.length > 0) {
        await OnlineUser.deleteMany({ userId });
      }

      await OnlineUser.create({
        userId,
        socketId,
      });
    });

    socket.on("following", async ({ followingUserId }) => {
      const user = await OnlineUser.aggregate([
        {
          $match: {
            socketId: socket.id,
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
            pipeline: [{ $project: { accountName: 1, img: 1 } }],
          },
        },
        {
          $unwind: "$user",
        },
        { $project: { _id: 0, user: 1 } },
      ]);

      if (user.length === 0) return;

      const content = `@${user[0].user.accountName} just followed you`;
      const notification = await Notification.create({
        sendTo: followingUserId,
        content,
      });

      const isFollowingUser = await OnlineUser.findOne({
        userId: followingUserId,
      });

      if (!isFollowingUser) return;
      socketIO.to(isFollowingUser.socketId).emit("notification", notification);
    });

    socket.on("disconnect", async () => {
      console.log("disconnected", socket.id);
      await OnlineUser.deleteOne({ socketId: socket.id });
    });
  });
};

export default io;

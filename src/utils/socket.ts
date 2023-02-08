import { Server } from "socket.io";
import http from "http";
import OnlineUser from "../models/onlineUser";

const io = (http: http.Server) => {
  const socketIO = new Server(http, {
    cors: {
      origin: process.env.CLIENT_URL,
    },
  });

  socketIO.on("connection", (socket) => {
    console.log(`${socket.id} user just connected.`);
    socket.on("activeUser", async ({ userId, socketId }) => {
      console.log("userid: ", userId);
      console.log("socketId ", socketId);
      const onlineUser = await OnlineUser.find({ userId });

      if (onlineUser.length > 0) {
        await OnlineUser.deleteMany({ userId });
      }

      await OnlineUser.create({
        userId,
        socketId,
      });
    });

    socket.on("disconnect", async () => {
      // delete user from activeuser collection
      console.log("disconnected", socket.id);
      await OnlineUser.deleteOne({ socketId: socket.id });
    });
  });
};

export default io;

import { Server } from "socket.io";
import http from "http";

const io = (http: http.Server) => {
  const socketIO = new Server(http, {
    cors: {
      origin: process.env.CLIENT_URL,
    },
  });

  socketIO.on("connection", (socket) => {
    console.log(`${socket.id} user just connected.`);
    // socket.on("hello", () => {
    //   console.log("hello from socket");
    // });
  });
};

export default io;

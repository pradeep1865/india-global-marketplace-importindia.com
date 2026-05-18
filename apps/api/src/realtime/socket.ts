import type { Server as HttpServer } from "node:http";
import { Server } from "socket.io";
import { env } from "../config/env.js";

export function attachRealtime(httpServer: HttpServer) {
  const io = new Server(httpServer, {
    cors: { origin: env.WEB_URL, credentials: true }
  });

  io.on("connection", (socket) => {
    socket.on("chat:message", (payload) => {
      io.to(payload.roomId).emit("chat:message", payload);
    });
    socket.on("notification:subscribe", (userId) => socket.join(`user:${userId}`));
  });

  return io;
}

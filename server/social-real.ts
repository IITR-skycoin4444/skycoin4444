// SKYCOIN4444 - Real Social Network with WebSocket
import { Server as SocketIOServer } from "socket.io";
import { Server as HTTPServer } from "http";

let io: SocketIOServer;

export function initializeSocket(server: HTTPServer) {
  io = new SocketIOServer(server, {
    cors: { origin: "*", methods: ["GET", "POST"] },
  });

  io.on("connection", (socket: any) => {
    console.log(`[Social] User connected: ${socket.id}`);

    socket.on("post:create", (data: any) => {
      io.emit("post:new", data);
    });

    socket.on("message:send", (data: any) => {
      io.to(data.recipientId).emit("message:receive", data);
    });

    socket.on("feed:subscribe", (userId: string) => {
      socket.join(`feed:${userId}`);
    });

    socket.on("disconnect", () => {
      console.log(`[Social] User disconnected: ${socket.id}`);
    });
  });

  return io;
}

export function broadcastPost(post: any) {
  io?.emit("post:new", post);
}

export function sendDirectMessage(recipientId: string, message: any) {
  io?.to(recipientId).emit("message:receive", message);
}

export function notifyUser(userId: string, notification: any) {
  io?.to(userId).emit("notification:new", notification);
}

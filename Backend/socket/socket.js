const { Server } = require("socket.io");
const http = require("http");
const express = require("express");
const Message = require("../models/messageModel");
const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
  },
});
const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};
const userSocketMap = {}; 

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("markMessagesAsSeen", async ({ selectedUser }) => {
    try {
      await Message.updateMany(
        { receiverId: userId, senderId: selectedUser, seen: false },
        { $set: { seen: true } }
      );
      io.to(userSocketMap[selectedUser]).emit("messagesSeen", { userId });
    } catch (error) {
      console.error(error);
    }
  });

  // Typing...
  socket.on("typing", ({ recipientId }) => {
    const recipientSocketId = userSocketMap[recipientId];
    if (recipientSocketId) {
      io.to(recipientSocketId).emit("typing", { senderId: userId });
    }
  });

  socket.on("stopTyping", ({ recipientId }) => {
    const recipientSocketId = userSocketMap[recipientId];
    if (recipientSocketId) {
      io.to(recipientSocketId).emit("stopTyping", { senderId: userId });
    }
  });

  // // Drawing
  // socket.on("drawing", (data) => {
  //   const recipientSocketId = userSocketMap[data.conversationId];
  //   if (recipientSocketId) {
  //     io.to(recipientSocketId).emit("drawing", {
  //       conversationId: userId,
  //       canvasData: data.canvasData,
  //     });
  //   }
  // });

  socket.on("deleteMessage", async ({ messageId }) => {
    try {
      // Optionally: You can verify the message exists and the user has permission to delete it

      // Emit event to all clients
      io.emit("messageDeleted", { messageId });
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

module.exports = { app, io, server,getReceiverSocketId };
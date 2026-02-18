const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { Server } = require("socket.io");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const Message = require("./models/Message");

const app = express();
const server = http.createServer(app);

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

app.use("/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ Mongo Error", err));

const io = new Server(server, {
  cors: { origin: "http://localhost:3000", credentials: true }
});

const onlineUsers = new Set();

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) return next(new Error("No token"));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.username = decoded.username; // ✅ ONLY STRING
    next();
  } catch {
    next(new Error("Invalid token"));
  }
});

io.on("connection", async (socket) => {
  console.log("🟢 Connected:", socket.username);
  onlineUsers.add(socket.username);
  io.emit("onlineUsers", onlineUsers.size);

  const messages = await Message.find().sort({ createdAt: 1 }).limit(100);
  socket.emit("initialMessages", messages);

  socket.on("sendMessage", async (text) => {
    if (!text.trim()) return;

    const saved = await Message.create({
      user: socket.username,
      text
    });

    io.emit("receiveMessage", saved);
  });

  socket.on("disconnect", () => {
    onlineUsers.delete(socket.username);
    io.emit("onlineUsers", onlineUsers.size);
    console.log("🔴 Disconnected:", socket.username);
  });
});

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

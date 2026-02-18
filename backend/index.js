const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const { Server } = require("socket.io");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const Message = require("./models/Message");

const app = express();
const server = http.createServer(app);

/* ✅ CORS FIX */
app.use(cors({
  origin: "https://real-time-chat-f8256zeqn-ritik-pandey18s-projects.vercel.app",
  credentials: true,
}));

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/messages", messageRoutes);

/* ✅ MongoDB */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

/* ✅ Socket.IO */
const io = new Server(server, {
  cors: {
    origin: "https://real-time-chat-f8256zeqn-ritik-pandey18s-projects.vercel.app",
    methods: ["GET", "POST"],
    credentials: true,
  }
});

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("sendMessage", async (data) => {
    const message = await Message.create({
      text: data.text,
      user: data.userId, // ✅ ONLY STRING ID
      username: data.username,
    });
    io.emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log("Server running");
});

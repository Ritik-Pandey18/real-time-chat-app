const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const { Server } = require("socket.io");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const Message = require("./models/Message");

const app = express();
const server = http.createServer(app);

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

app.use("/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(console.error);

const io = new Server(server, {
  cors: { origin: "*", credentials: true },
});

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) return next(new Error("No token"));

  try {
    const decoded = require("jsonwebtoken").verify(
      token,
      process.env.JWT_SECRET
    );
    socket.user = decoded;
    next();
  } catch {
    next(new Error("Invalid token"));
  }
});

io.on("connection", (socket) => {
  Message.find().then((msgs) => socket.emit("initialMessages", msgs));

  socket.on("sendMessage", async (msg) => {
    const saved = await Message.create({
      text: msg.text,
      user: socket.user,
    });
    io.emit("receiveMessage", saved);
  });
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log("Server running"));

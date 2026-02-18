import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/message.js";

dotenv.config();

const app = express();

/* ✅ FINAL CORS FIX */
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://real-time-chat-f8256zeqn-ritik-pandey18s-projects.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors()); // IMPORTANT

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/messages", messageRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(process.env.PORT || 5001, () =>
      console.log("Server running")
    );
  })
  .catch((err) => console.log(err));

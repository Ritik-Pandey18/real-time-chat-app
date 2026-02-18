import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getSocket = (token: string) => {
  if (!socket) {
    io("https://real-time-chat-app-pdxq.onrender.com", {
  auth: { token }
});

  }
  return socket;
};

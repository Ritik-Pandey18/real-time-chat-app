"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSocket } from "../lib/socket";

interface Message {
  _id?: string;
  user: string;
  text: string;
}

export default function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [online, setOnline] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (!token || !username) {
      router.push("/login");
      return;
    }

    const socket = getSocket(token);

    socket.on("initialMessages", setMessages);
    socket.on("receiveMessage", (msg) =>
      setMessages((prev) => [...prev, msg])
    );
    socket.on("onlineUsers", setOnline);

    return () => {
      socket.off();
    };
  }, [router]);

  const sendMessage = () => {
    if (!text.trim()) return;
    getSocket(localStorage.getItem("token")!).emit("sendMessage", text);
    setText("");
  };

  return (
    <div className="h-screen flex flex-col bg-slate-900 text-white">
      <header className="p-4 bg-black/40 flex justify-between">
        <h2 className="font-bold">💬 Chat Room</h2>
        <span className="text-green-400">{online} online</span>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((m, i) => (
          <div key={i} className="bg-white/10 p-3 rounded-xl max-w-sm">
            <p className="text-xs text-pink-400">{m.user}</p>
            <p>{m.text}</p>
          </div>
        ))}
      </main>

      <footer className="p-4 flex gap-2 bg-black/40">
        <input
          className="flex-1 px-4 py-2 rounded-xl bg-white/10 outline-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-pink-500 px-6 rounded-xl font-bold"
        >
          Send
        </button>
      </footer>
    </div>
  );
}

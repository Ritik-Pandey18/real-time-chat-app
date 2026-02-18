"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function JoinPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");

  const handleJoin = () => {
    if (!username.trim()) return;
    localStorage.setItem("username", username);
    router.push("/chat");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900">
      <div className="glass-effect w-full max-w-md p-8 rounded-3xl space-y-6">
        <h1 className="text-3xl font-black text-white text-center">
          Join Chat 💬
        </h1>

        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your name"
          className="input"
        />

        <button onClick={handleJoin} className="btn-primary w-full py-3">
          Join Now
        </button>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/app/lib/axios";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
localStorage.setItem("username", res.data.user.username);
localStorage.setItem("user", JSON.stringify(res.data.user));


      toast.success("Login successful");

      // 🔴 IMPORTANT
      router.replace("/chat");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <form onSubmit={login} className="space-y-4 w-80">
          <h1 className="text-2xl font-bold">Login</h1>

          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="input"
          />

          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="input"
          />

          <button disabled={loading} className="btn-primary w-full">
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </>
  );
}

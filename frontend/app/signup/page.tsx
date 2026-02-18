"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/app/lib/axios";
import toast, { Toaster } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value, // 🔴 VERY IMPORTANT
    });
  };

  const signup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/register", {
        username: form.username,
        email: form.email,
        password: form.password,
      });

      // save auth
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.user.username);

      toast.success("Signup successful!");
      router.replace("/chat");
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <form onSubmit={signup} className="w-80 space-y-4">
          <h1 className="text-2xl font-bold text-center">Create Account</h1>

          {/* USERNAME */}
          <input
            type="text"
            name="username"        // ✅ REQUIRED
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            className="input"
          />

          {/* EMAIL */}
          <input
            type="email"
            name="email"           // ✅ REQUIRED
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="input"
          />

          {/* PASSWORD */}
          <input
            type="password"
            name="password"        // ✅ REQUIRED
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="input"
          />

          <button disabled={loading} className="btn-primary w-full">
            {loading ? "Creating..." : "Signup"}
          </button>

          <p className="text-sm text-center text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-pink-400">
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

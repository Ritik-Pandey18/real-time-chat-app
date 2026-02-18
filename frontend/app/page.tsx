"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900 text-white overflow-hidden">
      
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute -bottom-8 left-80 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
      </div>

      {/* Navbar */}
      <nav className="px-6 py-4 flex justify-between items-center relative z-10">
        <div className="text-2xl font-black bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
          💬 Chatly
        </div>

        <div className="flex gap-3">
          <Link
            href="/login"
            className="px-4 py-2 text-sm rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all"
          >
            Login
          </Link>

          <Link href="/signup" className="btn text-sm">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="px-6 pt-20 pb-16 max-w-4xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="lg:pr-12">
            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
              Real-time <br />
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Conversations
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-lg leading-relaxed">
              Connect instantly with friends and teams. Secure, fast, and beautiful.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/signup" className="btn text-lg py-4 px-8">
                🚀 Start Chatting
              </Link>

              <Link
                href="#features"
                className="px-8 py-4 text-lg font-semibold text-white/80 border border-white/30 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-all"
              >
                Features
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                99.9% Uptime
              </div>
              <div>🔒 End-to-End Encrypted</div>
              <div>⚡ Real-time</div>
            </div>
          </div>

          {/* Phone Mockup */}
          <div className="relative">
            <div className="glass p-1 rounded-3xl shadow-soft w-72 h-[600px] mx-auto">
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl h-full flex flex-col overflow-hidden">
                
                {/* Status Bar */}
                <div className="px-4 pt-4 pb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-xs font-semibold text-white/90">9:41</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-white/20 rounded-full"></div>
                    <div className="w-6 h-1 bg-white/20 rounded-full"></div>
                  </div>
                </div>

                {/* Chat Preview */}
                <div className="flex-1 overflow-y-auto px-4 space-y-3 py-4">
                  <div className="flex items-center gap-4 p-3 bg-white/10 rounded-2xl backdrop-blur-sm">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-2xl flex items-center justify-center">
                      <span className="font-bold text-lg">EP</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-white truncate">
                        Eleanor Pena
                      </p>
                      <p className="text-xs text-gray-300 truncate">
                        Hey! Are you there?
                      </p>
                    </div>
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

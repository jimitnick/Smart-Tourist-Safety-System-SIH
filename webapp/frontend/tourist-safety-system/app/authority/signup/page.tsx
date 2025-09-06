"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminAuthForm() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // ⚡ Replace with real API/Supabase/DB logic
    if (mode === "login") {
      if (email === "admin@example.com" && password === "admin123") {
        router.push("/authority/dashboard");
      } else {
        setError("Invalid email or password");
      }
    } else if (mode === "signup") {
      if (email && password) {
        alert("Signup successful! (hook this to your backend)");
        setMode("login");
      } else {
        setError("Please enter valid details");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg shadow-lg bg-white p-8">
        <h2 className="text-2xl font-bold text-center text-[#008994] mb-6">
          Admin Signup
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#008994] text-white font-semibold rounded-md hover:bg-[#064d52] transition"
          >
             Signup
          </button>
        </form>

        {/* Switch between login and signup */}
        <p className="mt-4 text-center text-sm text-gray-600">
          {(
            <>
              Already have an account?{" "}
              <button
                onClick={() => router.replace("/authority/login")}
                className="text-[#008994] font-semibold hover:underline"
              >
                Login
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

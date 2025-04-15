"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
export default function Register() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const registerFun = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await axios.post("/api/user/register", {
        email,
        password,
        name,
      });

      if (!result.data) {
        setError("Invalid Email or Password");
      } else {
        router.push("/auth/login");
      }
    } catch (error) {
      setError("Server error during registration");
      console.error("Registration Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:block">
        <img
          src="/authbg.jpg"
          alt="auth background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex items-center justify-center  px-6 py-12">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
          <div className="bg-gray-900 p-4 rounded-t-2xl flex items-center justify-center space-x-3 shadow-sm">
            <Image alt="logo" height={40} width={40} src="/timewise.png" />
            <span className="text-3xl text-orange-400 font-bold tracking-wide">
              TimeWise
            </span>
          </div>

          <h2 className="text-3xl font-semibold text-center text-orange-500 mb-6 mt-2">
            Create an Account
          </h2>

          <form onSubmit={registerFun} className="space-y-4">
            <input
              className="w-full p-3 bg-gray-100 rounded-lg outline-none"
              type="text"
              value={name}
              placeholder="Full Name"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              className="w-full p-3 bg-gray-100 rounded-lg outline-none"
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="w-full p-3 bg-gray-100 rounded-lg outline-none"
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-lg font-semibold transition duration-200"
            >
              {loading ? "Registering..." : "Register"}
            </button>
            {error && <p className="text-red-600 text-center">{error}</p>}
          </form>

          <p className="mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

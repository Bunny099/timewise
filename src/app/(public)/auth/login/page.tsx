"use client";
import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
export default function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const loginWithGoogle = async () => {
    const result = await signIn("google", { callbackUrl: "/dashboard/home" });
  };
  const loginFun = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await signIn("credentials", {
      email,
      password,
      callbackUrl: "/dashboard/home",
      redirect: false,
    });
    if (result?.error) {
      setError("Invalid Email or Password!");
    } else {
      router.push("/dashboard/home");
    }
    setLoading(false);
  };
  return (
    <div className=" min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:block">
        <img
          src="/authbg.jpg"
          alt="authbg"
          className="w-full h-full object-cover"
        />
      </div>
      <div className=" flex justify-center items-center  px-6 py-12">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
          <div className="bg-gray-900 p-4 rounded-t-2xl flex items-center justify-center space-x-3 shadow-sm">
            <Image alt="logo" height={40} width={40} src="/timewise.png" />
            <span className="text-3xl text-orange-400 font-bold tracking-wide">
              TimeWise
            </span>
          </div>

          <h2 className="text-3xl font-semibold text-center text-orange-500 mb-6 mt-2">
            Login
          </h2>
          <form className="space-y-4 " onSubmit={loginFun}>
            <input
              className="w-full p-3 bg-gray-100 rounded-lg outline-none"
              type="email"
              name=""
              value={email}
              placeholder="Enter a Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="w-full p-3 bg-gray-100 rounded-lg outline-none"
              type="password"
              name=""
              value={password}
              placeholder="Enter a Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-lg font-semibold transition duration-200"
              type="submit"
            >
              {" "}
              {loading ? "Logging in..." : "Login"}
            </button>
            {error && <p className="text-center text-red-600 mt-2">{error}</p>}
          </form>
          <div className="my-4 text-center text-gray-500">OR</div>
          <button
            onClick={loginWithGoogle}
            className="w-full flex justify-center items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition duration-200"
          >
            <img src="/google.svg" alt="google" className="w-5 h-5" />
            Login with Google
          </button>
          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{" "}
            <Link
              href="/auth/register"
              className="text-blue-600 hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="bg-gray-950 md:bg-white py-6 px-6 md:px-24 flex justify-between items-center border-b border-gray-200 sticky top-0 ">
      <div className="flex items-center space-x-2 hover:cursor-pointer">
        <Image alt="logo" height={40} width={40} src="/timewise.png" />
        <span className="text-2xl md:text-3xl text-orange-500 font-semibold">
          TimeWise
        </span>
      </div>
      <div className="flex gap-4 items-center">
        <Link
          className="text-lg bg-white md:bg-black text-black md:text-white hover:bg-gray-100 shadow-md md:hover:bg-gray-900 px-6 py-2 rounded-xl font-medium transition-all duration-300"
          href="/auth/login"
        >
          Login
        </Link>
        <Link
          className="hidden md:flex  items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-lg font-medium px-6 py-2 shadow-md rounded-xl transition-all duration-300"
          href="/auth/register"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}

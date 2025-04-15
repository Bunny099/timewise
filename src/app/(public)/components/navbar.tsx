import Image from "next/image";
import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="bg-blue-50 py-6 px-6 md:px-24 flex justify-between items-center border-b border-gray-200">
      <div className="flex items-center space-x-2">
        <Image alt="logo" height={40} width={40} src="/timewise.png" />
        <span className="text-2xl md:text-3xl text-orange-500 font-semibold">
          TimeWise
        </span>
      </div>
      <div className="flex gap-4 items-center">
        <Link
          className="text-lg text-blue-800 hover:underline transition-all duration-200"
          href="/auth/login"
        >
          Login
        </Link>
        <Link
          className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-4 py-2 rounded-full transition-all duration-200"
          href="/auth/register"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6 md:px-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <Image alt="logo" src="/timewise.png" height={45} width={45} />
            <span className="text-3xl font-semibold text-orange-500">
              TimeWise
            </span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            TimeWise helps you track time effortlessly, manage projects, and generate insightful reports to boost productivity.
          </p>
        </div>

       
        <div>
          <h3 className="text-lg font-semibold mb-4 text-orange-400">Navigation</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-orange-300 transition-all">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-orange-300 transition-all">
                About
              </Link>
            </li>
            <li>
              <Link href="/auth/login" className="hover:text-orange-300 transition-all">
                Login
              </Link>
            </li>
            <li>
              <Link href="/auth/register" className="hover:text-orange-300 transition-all">
                Get Started
              </Link>
            </li>
          </ul>
        </div>

       
        <div>
          <h3 className="text-lg font-semibold mb-4 text-orange-400">Contact</h3>
          <p className="text-sm text-gray-400 mb-2">Email: support@timewise.com</p>
          <p className="text-sm text-gray-400">Phone: +91 98765 43210</p>
        </div>
      </div>

      
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} TimeWise. All rights reserved.
      </div>
    </footer>
  );
}

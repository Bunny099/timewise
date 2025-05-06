"use client"
import Link from "next/link";
import LogoutBtn from "./logout";
import { useState } from "react";
import { Menu, X } from "lucide-react"; 
interface props {
  name?: string;
  image?: string;
}
export default function DashboardNavbar({ name, image }: props) {
  const [isOpen, setIsOpen] = useState(false);
  const isValidImage = image && image.trim() !== "" && image !== "null" && image !== "undefined";
  return (  <nav className="bg-orange-500 py-3 px-4 md:px-24 text-white sticky top-0 z-50">
    
    <div className="flex justify-between items-center">
    
      <button
        className="md:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

     
      <div className="hidden md:flex justify-between items-center w-full">
       
        <ul className="flex gap-4 items-center">
          <li>
            <Link
              href="/dashboard/home"
              className="hover:bg-orange-400 py-2 px-3 rounded"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/timehistory"
              className="hover:bg-orange-400 py-2 px-3 rounded"
            >
              Time
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/project"
              className="hover:bg-orange-400 py-2 px-3 rounded"
            >
              Project
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/report"
              className="hover:bg-orange-400 py-2 px-3 rounded"
            >
              Report
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/settings"
              className="hover:bg-orange-400 py-2 px-3 rounded"
            >
              Settings
            </Link>
          </li>
        </ul>

       
        <div className="flex items-center gap-2">
          {image && (
            <img
              src={isValidImage ? image.trim() : "/user.png"}
              alt="User Avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
          )}
          <Link
            href="/dashboard/settings"
            className="hover:underline text-md"
          >
            {name}
          </Link>
          <LogoutBtn />
        </div>
      </div>
    </div>

   
    {isOpen && (
      <ul className="md:hidden flex flex-col gap-2 mt-3">
        <li>
          <Link
            href="/dashboard/home"
            className="hover:bg-orange-400 py-2 px-2 block rounded"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/timehistory"
            className="hover:bg-orange-400 py-2 px-2 block rounded"
          >
            Time
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/project"
            className="hover:bg-orange-400 py-2 px-2 block rounded"
          >
            Project
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/report"
            className="hover:bg-orange-400 py-2 px-2 block rounded"
          >
            Report
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/settings"
            className="hover:bg-orange-400 py-2 px-2 block rounded"
          >
            Settings
          </Link>
        </li>
        <li className="flex items-center gap-2 px-2 mt-2">
          {image && (
            <img
              src={isValidImage ? image.trim() : "/user.png"}
              alt="User Avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
          )}
          <Link href="/dashboard/settings">{name}</Link>
          <LogoutBtn />
        </li>
      </ul>
    )}
  </nav>
  

  );
}

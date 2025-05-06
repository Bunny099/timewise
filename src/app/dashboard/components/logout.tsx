"use client"
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function LogoutBtn(){
    const router = useRouter();
    async function handleLogout(){
        await signOut({redirect:false});
        router.push("/")
    }
    return <button className="bg-gray-950 hover:bg-gray-900 rounded-md hover:cursor-pointer  text-white text-lg  px-2 transition-all duration-200" onClick={handleLogout}>Logout</button>
}
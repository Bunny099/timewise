"use client"
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function LogoutBtn(){
    const router = useRouter();
    async function handleLogout(){
        await signOut({redirect:false});
        router.push("/")
    }
    return <button className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-4 py-2 rounded-full transition-all duration-200" onClick={handleLogout}>logout</button>
}
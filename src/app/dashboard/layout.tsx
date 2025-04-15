import DashboardNavbar from "./components/DashNavbar";
import Sidebar from "./components/sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  return (
    <div className="min-h-screen  w-full flex flex-col">
       
      <DashboardNavbar />
      <main className="px-24">{children} </main>
      
    </div> 
  );
}

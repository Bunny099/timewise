import DashboardNavbar from "./components/DashNavbar";
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
  const image =session.user?.image ?? undefined;;
  const name = session.user?.name ?? undefined;
  return (
    <div className="min-h-screen  w-full flex flex-col">
       
      <DashboardNavbar name={name} image={image} />
      <main className="px-6 md:px-24">{children} </main>
      
    </div> 
  );
}

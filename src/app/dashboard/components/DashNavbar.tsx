import Link from "next/link";
import LogoutBtn from "./logout";

export default function DashboardNavbar() {
  return (
    <div className="bg-orange-500 py-1 px-6 md:px-24 flex justify-between items-center border-b border-gray-200 text-white sticky top-0">
      <ul className="flex text-xl gap-2">
        <li>
          <Link className="" href={"/dashboard/home"}>
            Home
          </Link>
        </li>
        <li>
          <Link className="" href={"/dashboard/timeentry"}>
            Time
          </Link>
        </li>
        <li>
          <Link href={"/dashboard/project"}>Project</Link>
        </li>
        <li>
          <Link href={"/dashboard/task"}>Task</Link>
        </li>
        <li>
          <Link href={"/dashboard/report"}>report</Link>
        </li>
      </ul>
      <div className="flex items-center">
        <h1>name</h1>
      <LogoutBtn />
      </div>
      
    </div>
  );
}

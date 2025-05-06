import ProfileSettingClient from "../components/profilesettingclient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
export default async function SettingPage() {
  const session = await getServerSession(authOptions);
  if(!session || !session.user){
    return console.log("Must loged in!")
  }
  const userData={
    id: session.user.id!,
    name:session.user.name!,
    image:session.user.image!,
    email:session.user.email!
  }
  return (
    <div className="p-2">
      <ProfileSettingClient userData={userData} />
    </div>
  );
}

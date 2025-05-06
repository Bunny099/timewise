"use client";
import axios from "axios";
import { useEffect, useState } from "react";

interface profileUserData {
  id: string;
  name: string;
  email: string;
  image: string;
}
export default function ProfileSettingClient({userData}:{userData:profileUserData}) {

  const [newName, setNewName] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  
  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.put("/api/user", {
        name: newName,
        email: newEmail,
        password: newPassword,
      });
      setMessage("Updated Successfully!");
    
    } catch (error) {
      console.error("Error Put user:", error);
      setMessage("Failed to Update!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row gap-4 p-2">
      <div className="w-full md:w-1/4   flex flex-col items-center gap-4">
        {userData && (
          <>
            <img
              src={userData.image || "/user.png"}
              alt={"./user.png"}
              className="h-20 w-20 rounded-full object-cover border border-gray-300"
            />
            <div className="text-center">
              <h1 className="text-xl font-semibold ">{userData.name}</h1>
              <h1 className="text-sm text-gray-600">{userData.email}</h1>
            </div>
          </>
        )}
      </div>
      <div className=" w-full md:w-3/4">
        <h1 className="text-3xl pb-2 font-semibold border-b border-gray-400">
          Your basic info
        </h1>
        <form onSubmit={handleUpdateUser} className="space-y-6 mt-4 ">
          <div className="flex items-center ">
            <label className="block w-30 text-sm md:text-lg font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full  px-4 py-1 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-400"
              placeholder={userData?.name}
            />
          </div>
          <div className="flex items-center">
            <label className="block w-30 text-sm md:text-lg font-medium mb-1">
              Email
            </label>
            <input
              type="text"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="w-full px-4 py-1 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-400"
              placeholder={userData?.email}
            />
          </div>
          <div className="flex items-center">
            <label className="block w-30 text-sm md:text-lg font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-1 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-400"
            />
          </div>
          <button
            disabled={loading}
            type="submit"
            className="bg-green-700 hover:bg-green-600 text-white font-semibold px-6 py-1 rounded transition duration-200 mr-4"
          >
            {loading ? "Updating..." : "Update"}
          </button>

          {message && <p className="text-sm text-orange-500 mt-2">{message}</p>}
        </form>
      </div>
    </div>
  );
}

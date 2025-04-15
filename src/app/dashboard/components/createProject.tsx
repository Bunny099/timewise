"use client";
import { GoPlus } from "react-icons/go";
import { useState } from "react";
import axios from "axios";

export default function CreateProject() {
  const [openModal, setOpenModal] = useState(false);
  const [projectName, setProjectName] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/project", { name: projectName });
      if (response.data.project) {
        setMessage("Project Created Successfully!");
        setTimeout(() => {
          setOpenModal(false);
          setMessage(null);
          setProjectName("");
        }, 1500);
      } else {
        setMessage("Try Again Later!");
      }
    } catch (error) {
      console.error("Post Error while creating Project:", error);
      setMessage("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex">
      {/* Open Modal Button */}
      <div
        onClick={() => setOpenModal(true)}
        className="text-white flex items-center gap-1 bg-green-800 text-xl px-4 py-1 rounded-xl hover:cursor-pointer hover:bg-green-700 transition-all"
      >
        <GoPlus /> New Project
      </div>

      {/* Modal Overlay */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Dim Background with Blur */}
          <div
            onClick={() => setOpenModal(false)}
            className="absolute inset-0 bg-white/30 backdrop-blur-sm"
          ></div>

          {/* Modal Content */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-xl p-6 shadow-xl w-[400px] h-[200px] flex flex-col justify-between border border-gray-200"
          >
            <h1 className="text-2xl font-semibold text-center">Create Project</h1>
            <form onSubmit={handleCreateProject} className="flex flex-col gap-y-3">
              <input
                className="bg-white px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-400"
                type="text"
                placeholder="Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
              <button
                disabled={loading}
                type="submit"
                className={`bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-md transition-all ${
                  loading ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Creating..." : "Submit"}
              </button>
              {message && (
                <p className="text-center text-sm text-green-700 font-medium">
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

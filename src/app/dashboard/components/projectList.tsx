"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
type Project = {
  id: string;
  name: string;
};
export default function ProjectListAction() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      const reponse = await axios.get("/api/project");
      if (reponse.data.projects) {
        setProjects(reponse.data.projects);
      }
    } catch (error) {
      console.error("Error fetching Project:", error);
    }
  };

  const handleDeleteProject = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete("/api/project", {
        headers: { "Content-Type": "application/json" },
        data: { id },
      });
      fetchProjects();
    } catch (error) {
      console.error("Failed to Delete Project:", error);
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4">Projects</h1>

      <div className="overflow-x-auto ">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100 text-left text-gray-600">
            <tr>
              <th className="px-4 py-2 font-medium">SR</th>
              <th className="px-4 py-2 font-medium">Project Name</th>
              <th className="px-4 py-2 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td colSpan={2} className="text-center px-4 py-2 text-gray-500">
                  No Project Found.
                </td>
              </tr>
            ) : (
              projects.map((project, index) => (
                <tr
                  key={project.id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{project.name}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      disabled={deletingId == project.id}
                      className="bg-red-600 p-1 rounded-md text-white hover:cursor-pointer hover:bg-red-700 transition-all"
                    >
                      {/* {deletingId === project.id ? "Deleting" : "Delete"} */}
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

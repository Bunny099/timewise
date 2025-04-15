"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";

type Project = {
  id: string;
  name: string;
};
export default function TimeEntry() {
  const [openModal, setOpenModal] = useState(false);
  const [projectId, setProjectId] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [elapsedTime, setElaspedTime] = useState<number>(0);

  // in zod schema duration is number we have parseInt
  const [duration, setDuration] = useState<number>();
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/project");
        if (response.data.projects) {
          setProjects(response.data.projects);
        }
      } catch (error) {
        console.error("Error in get project in TimeEntry:", error);
      } finally {
        setLoading(false);
      }
    };

    if (openModal) {
      fetchProjects();
    }
  }, [openModal]);

  // Time Entry logic
  const handleStartTime = () => {
    if (!projectId) {
      alert("Please select project!");
      return;
    }

    const now = new Date().toISOString();
    setStartTime(now);
    setTimerRunning(true);
    setOpenModal(false);
  };
  
  const handleEndTime = async () => {
    if (!startTime) {
      console.log("start time ie empty!");
      return;
    }
    const now = new Date().toISOString();
    const duration = new Date(now).getTime() - new Date(startTime).getTime();
    const durationInMin = Math.floor(duration / 60000);
    setEndTime(now);
    setTimerRunning(false);
    setElaspedTime(0);

    try {
      const response = await axios.post("/api/timeentries", {
        startTime,
        endTime: now,
        duration: durationInMin,
        projectId,
        description,
      });
      if (!response.data) {
        console.log("Error while creating timeentry");
      } else {
        console.log("Time entry created!");
      }
    } catch (error) {
      console.error(error, "Error while creating entry");
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning && startTime) {
      interval = setInterval(() => {
        const now = new Date().getTime();
        const start = new Date(startTime).getTime();
        setElaspedTime(Math.floor((now - start) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, startTime]);

  const today = new Date().toLocaleDateString("en-us", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex justify-center w-full min-h-screen">
      <div className="p-4 ">
        <div
          onClick={() => setOpenModal(true)}
          className="bg-green-700 p-2 text-2xl text-white rounded hover:cursor-pointer"
        >
          <GoPlus />
        </div>
      </div>

      <div className="w-full p-4 ">
        <p className="text-2xl font-semibold border-b-2 border-gray-300 pb-2">
          Today:{today}
        </p>

        {startTime && (
          <div className="flex justify-between items-center bg-gray-100 rounded p-4 mt-4 border border-gray-300">
            <div className="flex flex-col">
              <p className="text-lg font-semibold text-gray-800">
                {projects.find((p) => p.id === projectId)?.name || "Project"}
              </p>
              <p className="text-sm text-gray-600">{description}</p>
              <p className="text-sm text-gray-500 mt-1">
                Duration: {Math.floor(elapsedTime / 60)}m {elapsedTime % 60}s
              </p>
            </div>

            <div className="flex items-center gap-2">
              {timerRunning ? (
                <button
                  className="bg-red-600 text-white px-4 py-2 hover:bg-red-700 rounded"
                  onClick={handleEndTime}
                >
                  Stop
                </button>
              ) : (
                <>
                  <p className="text-sm text-gray-700 font-medium">
                    Duration:{" "}
                    {Math.floor(
                      (new Date(endTime).getTime() -
                        new Date(startTime).getTime()) /
                        60000
                    )}
                    m
                  </p>
                  <button className="border border-gray-400 text-sm px-3 py-1 rounded hover:bg-gray-100">
                    Edit
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            onClick={() => setOpenModal(false)}
            className="absolute inset-0 bg-white/30 backdrop-blur-sm"
          ></div>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-xl w-[450px] min-h-[350px] flex flex-col shadow-xl border border-gray-200 "
          >
            <h1 className="text-sm text-center py-3 bg-gray-100 border-b text-black font-medium">
              New time entry for {today}
            </h1>

            <div className="flex flex-col gap-4 p-4">
              <label className="text-sm text-gray-700">Select Project</label>
              <select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="border border-gray-300 rounded  px-2 py-1"
              >
                {loading ? (
                  <option>Loading...</option>
                ) : projects.length === 0 ? (
                  <option value="">No Project!</option>
                ) : (
                  <>
                    <option value="">--Select Project</option>
                    {projects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>

            <input
              className="bg-white mx-4 mb-4 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-600"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />

            <div className="flex px-4 gap-2">
              <button
                onClick={handleStartTime}
                className="bg-green-600 text-lg px-2 text-white rounded-lg hover:cursor-pointer hover:bg-green-700"
              >
                Start Timer
              </button>
              <button
                onClick={() => setOpenModal(false)}
                className="border rounded-lg text-lg border-gray-300 px-2 hover:border-gray-500 hover:cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

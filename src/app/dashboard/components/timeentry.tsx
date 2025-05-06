"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { FiTrash2 } from "react-icons/fi";

type Project = {
  id: string;
  name: string;
};
type TimeEntry = {
  id: string;
  duration: number;
  description: string;
  project: {
    name: string;
  };
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
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [todaysEntries, setTodaysEntries] = useState<TimeEntry[]>([]);

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
      console.log("start time is empty!");
      return;
    }
    const now = new Date().toISOString();
    const duration = new Date(now).getTime() - new Date(startTime).getTime();
    const durationInMin = Math.floor(duration / 60000);
    setEndTime(now);
    setTimerRunning(false);
    setElapsedTime(0);

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
        setElapsedTime(Math.floor((now - start) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, startTime]);

  const today = new Date().toLocaleDateString("en-us", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const onlyTodaysTimeEntry = async () => {
    try {
      const response = await axios.get("/api/timeentries");

      if (!response.data) {
        console.log("Error while geting only todays entries!");
      } else {
        setTodaysEntries(response.data.todaysEntries);
      }
    } catch (error) {
      console.error(error, "Error while geting only todys entries");
    }
  };
  useEffect(() => {
    onlyTodaysTimeEntry();
  }, []);

  const totalMinutes = todaysEntries.reduce(
    (arr, entry) => arr + entry.duration,
    0
  );
  const hours = Math.floor(totalMinutes / 60);
  const mintus = totalMinutes % 60;

  const handleDeleteTimeEntry = async (timeEntryId: string) => {
    try {
      await axios.delete("/api/timeentries", {
        headers: {
          "Content-Type": "application/json",
        },
        data: { id: timeEntryId },
      });
      onlyTodaysTimeEntry();
    } catch (error) {
      console.error("Error DELETE time entry:", error);
    }
  };
  return (
    <div className="flex flex-col md:flex-row  md:justify-center w-full min-h-screen">
      <div className="p-0 md:p-4 ">
        <div
          onClick={() => setOpenModal(true)}
          className="flex justify-center bg-green-700 p-2 text-2xl  text-white rounded hover:cursor-pointer"
        >
          <GoPlus />
        </div>
      </div>

      <div className="w-full p-0 md:p-4 py-4 md:py-0 ">
        <div className="flex w-full border-b-2 border-gray-300 pb-2 ">
          <p className="text-2xl font-semibold pl-2 ">Today:{today}</p>
        </div>

        <p className="text-lg font-medium mt-2">
          Total Time Tracked: {hours}h {mintus}m
        </p>
        {todaysEntries.length > 0
          ? todaysEntries.map((entry, index) => (
              <div
                key={entry.id || index}
                className="flex justify-between items-center  rounded p-4 mt-4 border-y border-gray-100"
              >
                <div className="flex flex-col">
                  <p className="text-lg font-semibold text-gray-800">
                    {entry.project.name}
                  </p>
                  <p className="text-sm text-gray-600">{entry.description}</p>
                </div>

                <div className="flex items-center gap-2">
                  <>
                    <p className="text-sm text-gray-700 font-medium">
                      Duration: {entry.duration}m
                    </p>
                    <button
                      onClick={() => handleDeleteTimeEntry(entry.id)}
                      className="border border-gray-400 p-1 text-sm  rounded  bg-red-600 text-white hover:bg-red-700"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </>
                </div>
              </div>
            ))
          : ""}

        {startTime && (
          <div className="flex justify-between items-center  rounded p-4 mt-4 border-y border-gray-100">
            <div className="flex flex-col">
              <p className="text-lg font-semibold text-gray-800">
                {projects.find((p) => p.id === projectId)?.name || "Project"}
              </p>
              <p className="text-sm text-gray-600">{description}</p>
              <div className="flex items-center">
                <p className="text-sm text-gray-500 mt-1">
                  Duration: {Math.floor(elapsedTime / 60)}m {elapsedTime % 60}s
                </p>
              </div>
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
            className="relative w-full max-w-sm sm:max-w-md md:max-w-lg bg-white rounded-xl min-h-[350px] flex flex-col shadow-xl border border-gray-200 "
          >
            <h1 className="text-sm text-center py-3 bg-gray-100 border-b text-black font-medium">
              New time entry for {today}
            </h1>

            <div className="flex flex-col gap-4 p-4">
              <label className="text-sm text-gray-700">Select Project</label>
              <select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="border border-gray-300 rounded  px-2 py-1 text-sm"
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
              className="bg-white mx-4 mb-4 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />

            <div className="flex flex-col md:flex-row justify-end px-4 gap-2 mb-2">
              <button
                onClick={handleStartTime}
                className="bg-green-600 text-sm md:text-base px-2 py-2 md:py-1 text-white rounded-lg hover:cursor-pointer hover:bg-green-700"
              >
                Start Timer
              </button>
              <button
                onClick={() => setOpenModal(false)}
                className="border rounded-lg text-sm md:text-base px-2 py-2 md:py-1  border-gray-300  hover:border-gray-500 hover:cursor-pointer"
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

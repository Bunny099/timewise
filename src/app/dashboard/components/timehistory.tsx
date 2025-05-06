"use client";
import { FiArrowRight } from "react-icons/fi";
import { FiArrowLeft } from "react-icons/fi";
import { useEffect, useState } from "react";
import axios from "axios";
type Project = { id: string; name: string };
interface entryHistoryData {
  id: string;
  duration: number;
  description: string;
  project: Project[];
}
export default function TimeHistory() {
  const [day, setDay] = useState<string>(() =>
    new Date().toLocaleDateString("en-CA")
  );
  const [entryHistory, setEntryHistory] = useState<entryHistoryData[]>([]);

  const handlePrevDay = () => {
    const prev = new Date(day);
    prev.setDate(prev.getDate() - 1);
    const newDay = prev.toLocaleDateString("en-CA");
    setDay(newDay);
  };
  const handleNextDay = () => {
    const next = new Date(day);
    next.setDate(next.getDate() + 1);
    const newDay = next.toLocaleDateString("en-CA");
    setDay(newDay);
  };

  const fetchEntryHistory = async () => {
    try {
      const res = await axios.get(`/api/timeentries/data?day=${day}`);
      if (!res.data) {
        console.log("something went wrong!");
      } else {
        setEntryHistory(res.data.dayEntries);
        console.log(res.data.dayEntries);
      }
    } catch (error) {
      console.error("Error GET Entry History:", error);
    }
  };
  useEffect(() => {
    fetchEntryHistory();
  }, [day]);
  return (
    <div className="w-full">
      <div className=" flex items-center border-b py-2 border-gray-300 mb-2">
        <button
          onClick={handlePrevDay}
          className="border border-gray-300 p-2 rounded-l-lg hover:cursor-pointer hover:border-gray-400"
        >
          <FiArrowLeft />
        </button>
        <button
          onClick={handleNextDay}
          className="border border-gray-300 p-2 rounded-r-lg hover:cursor-pointer hover:border-gray-400"
        >
          <FiArrowRight />
        </button>
        <h1 className="pl-2 text-3xl font-medium">Day:{day}</h1>
      </div>
      <div>
        {entryHistory.length > 0
          ? entryHistory.map((entry) => (
              <div
                key={entry.id}
                className="bg-gray-50 border-t border-gray-200 p-3 r flex items-center justify-between hover:shadow-sm transition"
              >
                <div className="flex flex-col">
                  <span className="text-sm text-gray-600">
                    <span className="font-medium text-gray-800">Project:</span>{" "}
                    {Array.isArray(entry.project) &&
                      entry.project.map((p) => (
                        <span key={p.id}>{p.name}</span>
                      ))}
                  </span>
                  <span className="text-xs text-gray-500 mt-0.5">
                    {entry.description}
                  </span>
                </div>
                <div className="text-sm font-semibold text-orange-500">
                  {entry.duration} m
                </div>
              </div>
            ))
          : ""}

        {entryHistory && entryHistory.length === 0 && (
          <p className="text-gray-600 text-sm font-medium">
            No Entries for this day!
          </p>
        )}
      </div>
    </div>
  );
}

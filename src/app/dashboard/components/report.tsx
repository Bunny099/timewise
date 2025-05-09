"use client";
import { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { FiArrowLeft } from "react-icons/fi";
import { FiSave } from "react-icons/fi";
import axios from "axios";
import { format, subDays, addDays } from "date-fns";

type perDay = { date: string; hours: number };
type perProject = { id: string; name: string; hours: number };

interface reportData {
  totalHours: number;
  perDay: perDay[];
  perProject: perProject[];
}

interface savedReportData {
  id: string;
  title: string;
  dataSnapshot: reportData[];
}

export default function ReportPage() {
  const [report, setReport] = useState<reportData | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [savedReport, setSavedReport] = useState<savedReportData[]>([]);

  const fetchReport = async (start: Date) => {
    const end = addDays(start, 6);
    const formattedStart = format(start, "yyyy-MM-dd");
    const formattedEnd = format(end, "yyyy-MM-dd");

    try {
      const res = await axios.get(
        `/api/report/data?start=${formattedStart}&end=${formattedEnd}`
      );
      setReport(res.data);
      setStartDate(start);
    } catch (error) {
      console.error("Error getting GET Report:", error);
    }
  };

  useEffect(() => {
    const today = new Date();
    const sevenDaysAgo = subDays(today, 6);
    fetchReport(sevenDaysAgo);
  }, []);

  const handlePrevWeek = () => {
    if (startDate) {
      const newStart = subDays(startDate, 7);
      fetchReport(newStart);
    }
  };
  const handleNextWeek = () => {
    if (startDate) {
      const newStart = addDays(startDate, 7);
      fetchReport(newStart);
    }
  };

  const handleCreateReport = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/report", {
        title: title,
        dataSnapshot: report,
        filterUsed: { startDate: formattedStart, endDate: formattedEnd },
      });
      if (res.data.report) {
        setMessage("Report Created Successfully!");
        fetchSavedReport();
        setTimeout(() => {
          setOpenModal(false);
          setTitle("");
          setMessage(null);
        }, 1000);
      } else {
        setMessage("Try Again Latter!");
      }
    } catch (error) {
      console.error("Error Generating POST Repot:", error);
      setMessage("Saving went Wrong!");
    } finally {
      setLoading(false);
    }
  };
  const formattedStart = startDate ? format(startDate, "dd-MM-yyyy") : "";
  const formattedEnd = startDate
    ? format(addDays(startDate, 6), "dd-MM-yyyy")
    : "";

  const fetchSavedReport = async () => {
    try {
      const res = await axios.get("/api/report");
      if (!res.data) {
        console.log("error while geting saved report!");
      } else {
        setSavedReport(res.data.report);
      }
    } catch (error) {
      console.error("Error GET SavedReport:", error);
    }
  };
  useEffect(() => {
    fetchSavedReport();
  }, []);

  const handleDeleteSavedReport = async (id: string) => {
    alert("Are you sure you want to delete report?");
    try {
      const res = await axios.delete("/api/report", {
        headers: { "Content-Type": "application/json" },
        data: { id },
      });
      if (!res) {
        console.log("response not okay");
      } else {
        fetchSavedReport();
      }
    } catch (error) {
      console.error("Error DELETE Report:", error);
    }
  };
  return (
    <div>
      <div className=" flex-col md:flex-row border-b border-gray-400 flex items-start md:items-center gap-4 py-6">
        <div>
          <button
            onClick={handlePrevWeek}
            className="border border-gray-300 p-2 rounded-l-lg hover:cursor-pointer hover:border-gray-400"
          >
            <FiArrowLeft />
          </button>
          <button
            onClick={handleNextWeek}
            className="border border-gray-300 p-2 rounded-r-lg hover:cursor-pointer hover:border-gray-400"
          >
            <FiArrowRight />
          </button>
        </div>
        <h1 className="text-3xl font-semibold">
          This Week:{" "}
          <span className="font-light">
            {formattedStart} to {formattedEnd}
          </span>
        </h1>
      </div>
      <div>
        {report ? (
          <div>
            <div className="border-b border-gray-400 mb-4 py-4 grid md:grid-cols-2 gap-6">
              <div className="p-4 rounded-lg bg-blue-50 shadow">
                <h1 className="text-lg text-gray-700 mb-1">Total Hours</h1>
                <span className="text-3xl font-bold text-blue-600">
                  {report.totalHours}
                </span>
              </div>
              <div className="p-4 rounded-lg bg-green-50 shadow">
                <h3 className="text-lg text-gray-700 mb-2 font-semibold">
                  Daily Breakdown
                </h3>
                <div className="space-y-1 max-h-48 overflow-y-auto">
                  {report.perDay.map((day) => (
                    <div
                      key={day.date}
                      className="flex justify-between text-sm border-b border-gray-200 py-1"
                    >
                      <span>{day.date}</span>
                      <span className="font-medium text-gray-800">
                        {day.hours} hrs
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-md overflow-hidden shadow-sm">
              <button
                onClick={() => setOpenModal(true)}
                className="bg-green-700 flex items-center gap-1 text-white rounded-md mb-2 px-4 py-1 hover:cursor-pointer hover:bg-green-800"
              >
                <FiSave />
                Save
              </button>
              <div className="bg-gray-200 px-4 py-2 font-semibold grid grid-cols-2">
                <span>Project Name</span>
                <span>Hours</span>
              </div>

              {report?.perProject?.length > 0 ? (
                report.perProject.map((project) => (
                  <div
                    key={project.id}
                    className="px-4 text-blue-600 py-2 border-t border-gray-300 grid grid-cols-2"
                  >
                    <span>{project.name}</span>
                    <span>{project.hours}</span>
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500">
                  No project data found.
                </div>
              )}
            </div>
          </div>
        ) : (
          <p>Loading report...</p>
        )}
      </div>

      <div className="mt-4">
        <h1 className="text-white text-xl font-medium bg-orange-500 text-center">
          Saved Reports
        </h1>
        <div className="mt-3 overflow-hidden shadow">
          <div className="grid grid-cols-3 bg-gray-200  px-4 py-2 font-medium">
            <span>Title</span>
            <span>Details</span>
            <span>Action</span>
          </div>
          {savedReport?.length > 0 ? (
            savedReport.map((report) => (
              <div
                key={report.id}
                className="grid grid-cols-3 px-4 py-2 text-blue-500 border-t border-gray-300"
              >
                <span>{report.title}</span>
                <span>
                  {Array.isArray(report?.dataSnapshot) &&
                    report.dataSnapshot.map((snapshot) =>
                      snapshot.perDay.map((item) => (
                        <p key={item.date}>
                          {item.date}, {item.hours}hrs
                        </p>
                      ))
                    )}
                  
                </span>
                <button
                  onClick={() => handleDeleteSavedReport(report.id)}
                  className="text-left text-red-600 hover:underline hover:cursor-pointer"
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-600">No reports found!</div>
          )}
        </div>
      </div>

      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            onClick={() => setOpenModal(false)}
            className="absolute inset-0 bg-white/30 backdrop-blur-sm"
          ></div>
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-xl p-6 shadow-xl w-[400px] h-[200px] flex flex-col justify-between border border-gray-300"
          >
            <h1 className="text-xl font-semibold text-center border-b border-gray-200">
              Create Report
            </h1>
            <form
              onSubmit={handleCreateReport}
              className="flex flex-col gap-y-3"
            >
              <input
                required
                type="text"
                className=" bg-white px-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-orange-400"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <button
                disabled={loading}
                type="submit"
                className="bg-green-800 py-1 text-white rounded-md hover:cursor-pointer hover:bg-green-900"
              >
                {loading ? "Saving..." : "Save"}
              </button>
              {message && (
                <p className="text-green-500 text-sm font-medium">{message}</p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

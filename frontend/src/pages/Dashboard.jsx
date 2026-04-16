import { toast } from "react-hot-toast";

import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await API.get("/application/user");
        setApplications(res.data.applications);
      } catch (error) {
        console.log(error);
      }
    };

    fetchApplications();
  }, []);

  return (
  <div className="min-h-screen bg-gray-100 py-10 px-6">

    <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
      My Applications
    </h2>

    {applications.length === 0 ? (
      <p className="text-center text-gray-500 text-lg">
        No applications yet
      </p>
    ) : (
      <div className="max-w-4xl mx-auto space-y-6">
        {applications.map((app) => (
          <div
            key={app._id}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
          >
            <h3 className="text-2xl font-semibold text-indigo-600 mb-2">
              {app.job.title}
            </h3>

            <div className="flex justify-between items-center flex-wrap gap-3">
              
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  app.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : app.status === "accepted"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {app.status}
              </span>

              <p className="text-gray-500 text-sm">
                Applied On:{" "}
                {new Date(app.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);
}

export default Dashboard;
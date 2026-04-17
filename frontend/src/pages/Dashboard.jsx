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
    {applications.map((app) => {
      if (!app.job) {
        return (
          <div key={app._id} className="bg-white p-6 rounded-xl shadow">
            <p className="text-red-500 font-medium">
              Job has been removed
            </p>
          </div>
        );
      }

      return (
        <div key={app._id} className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-2xl font-semibold text-indigo-600 mb-2">
            {app.job.title}
          </h3>
        </div>
      );
    })}
  </div>
)}
  </div>
);
}

export default Dashboard;
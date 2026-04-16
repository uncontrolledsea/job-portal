import { toast } from "react-hot-toast";

import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom"

function EmployerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchEmployerJobs = async () => {
      const res = await API.get("/job/employer");
      setJobs(res.data.jobs);
    };

    fetchEmployerJobs();
  }, []);
  const updateStatus = async (id, status) => {
    try {
      const res = await API.put(`/application/status/${id}`, { status });

      // update UI without refresh
      setApplications((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, status: status } : app
        )
      );

    } catch (error) {
      console.log(error);
    }
  };
  const viewApplicants = async (jobId) => {
    const res = await API.get(`/application/job/${jobId}`);
    setApplications(res.data.applications);
    setSelectedJob(jobId);
  };
 const deletejob = async (jobId) => {
  try {
    await API.delete(`/job/delete/${jobId}`);

    toast.success("Job deleted successfully");

    // remove job from UI instantly
    setJobs((prev) => prev.filter((job) => job._id !== jobId));

  } catch (error) {
    toast.error(error.response?.data?.message || "Error deleting job");
  }
};

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800">
            Employer Dashboard
          </h2>

          <Link to="/create">
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-xl shadow-md hover:bg-indigo-700 transition duration-300">
              + Create Job
            </button>
          </Link>
        </div>

        {/* Jobs Section */}
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          Your Jobs
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
            >
              <h4 className="text-xl font-semibold text-indigo-600 mb-3">
                {job.title}
              </h4>

              <button
                onClick={() => viewApplicants(job._id)}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
              >
                View Applicants
              </button>
              <button
                onClick={() => deletejob(job._id)}
                className="bg-red-800 text-white px-4 py-2 mx-2 rounded-lg hover:bg-red-900 transition"
              >
                Delete job
              </button>
            </div>
          ))}
        </div>

        {/* Applicants Section */}
        {selectedJob && (
          <div className="mt-12">
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">
              Applicants
            </h3>

            <div className="space-y-6">
              {applications.map((app) => (
                <div
                  key={app._id}
                  className="bg-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row justify-between items-center gap-4"
                >
                  <div>
                    <p className="font-semibold text-lg">
                      {app.applicant.name}
                    </p>
                    <p className="text-gray-500">
                      {app.applicant.email}
                    </p>

                    <span
                      className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium`}
                    >
                      {app.status}
                    </span>
{app.status?.toLowerCase() === "pending" && (                      <div className="flex gap-3 mt-3">
                        <button
                          onClick={() => updateStatus(app._id, "accepted")}
                          className="bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600 transition"
                        >
                          Accept
                        </button>

                        <button
                          onClick={() => updateStatus(app._id, "rejected")}
                          className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>

                  <a
                    href={`http://localhost:5000/${app.resume}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                  >
                    View Resume
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default EmployerDashboard;
import { toast } from "react-hot-toast";

import React from 'react'
import { useState, useEffect } from "react";
import API from "../services/api";


const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    console.log("Jobs loaded ")
    const fetchJobs = async () => {
      try {
        const res = await API.get("/job");
        setJobs(res.data.jobs)
      } catch (error) {
        console.log(error)
      }
    };
    fetchJobs();
  }, []);
  const applyJob = async (jobId, file) => {
    try {
      const formData = new FormData();
      formData.append("resume", file);

      const res = await API.post(
        `/application/apply/${jobId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error applying");
    }
  };
  return (
  <div className="min-h-screen bg-gray-100 py-10 px-6">
    
    <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
      Available Jobs
    </h2>

    {jobs.length === 0 ? (
      <p className="text-center text-gray-500 text-lg">
        No Jobs Available
      </p>
    ) : (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
          >
            <h3 className="text-2xl font-semibold text-indigo-600 mb-2">
              {job.title}
            </h3>

            <p className="text-gray-600 mb-3">
              {job.description}
            </p>

            <p className="text-sm text-gray-500 mb-4">
              Location: {job.location}
            </p>

            <div className="flex flex-col gap-3">
              <input
                type="file"
                accept=".pdf"
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-semibold
                  file:bg-indigo-50 file:text-indigo-700
                  hover:file:bg-indigo-100"
                onChange={(e) =>
                  applyJob(job._id, e.target.files[0])
                }
              />
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);
}

export default Jobs

import { toast } from "react-hot-toast";
import React from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import API from '../services/api'
const CreateJob = () => {
  const [job, setjob] = useState({
    title :"",
    description:"",
    company:"",
    location:""
  })
  const navigate = useNavigate();
  const handleOnchange =(e)=>{
      return setjob({...job,[e.target.name]:e.target.value});
  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      await API.post("/job/create",job);
      toast.success("Job created successfully")
      navigate("/employer-dashboard")
    } catch (error) {
     console.log(error);
     toast.error("Error") 
    }


  }
  
  return (
  <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center p-6">
    
    <div className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-2xl">
      
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Create New Job
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          onChange={handleOnchange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />

        <textarea
          name="description"
          placeholder="Give the description regarding job"
          onChange={handleOnchange}
          rows="4"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        ></textarea>

        <input
          type="text"
          name="company"
          placeholder="Company Name"
          onChange={handleOnchange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          onChange={handleOnchange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />

        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-indigo-600 text-white font-semibold 
                     hover:bg-indigo-700 transition duration-300 shadow-md"
        >
          Create Job
        </button>

      </form>
    </div>
  </div>
);
}

export default CreateJob

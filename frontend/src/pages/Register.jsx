import { toast } from "react-hot-toast";
import React, { useState } from 'react'
import API from "../services/api"
import { Link } from "react-router-dom"
const Register = () => {
  const [form, setform] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  })
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/user/register", form);
      toast.success(res.data.message)
      window.location.href = "/login";
    } catch (error) {
      toast.error(error.response?.data?.message || "Error");

    }
  }
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-500 to-purple-600">      {/* <p className='text-5xl '> Register</p> */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-2xl w-96 flex flex-col gap-3"
      >
        <div className='flex flex-col gap-3'>
          <h2 className="text-3xl font-bold text-center text-gray-700 mb-4">
            Create Account
          </h2>
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Enter name:
            </label>         
               <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" type="text" name='name' placeholder='Enter Name' onChange={handleChange} />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Enter email:
            </label>           
             <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" type="text" name='email' placeholder=' Enter Email' onChange={handleChange} />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Enter password:
            </label>           
             <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" type="password" name='password' placeholder='Create Password' onChange={handleChange} />
          </div>

          <select name="role" id="role" placeholder="Select role" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" onChange={handleChange}>
            <option value="user">User</option>
            <option value="employer">Employer</option>
          </select>

          <button type="submit" className="w-full py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-indigo-700 transition duration-300 shadow-md">Register</button>
          <p className='text-center'>Already have account?
            <Link to="/login" className='text-red-500'>
              Login
            </Link>
          </p>
        </div>
      </form>

    </div>
  )
}

export default Register

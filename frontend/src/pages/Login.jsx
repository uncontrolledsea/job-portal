import { toast } from "react-hot-toast";

import { useState } from "react";
import API from "../services/api";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/user/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login successful");

      if (res.data.user.role === "user") {
        window.location.href = "/dashboard";
      } else if (res.data.user.role === "employer") {
        window.location.href = "/employer-dashboard";
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600  h-screen flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-2xl w-96 flex flex-col gap-3"
      >
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-4">
          Welcome..!
        </h2>
        <div>
          <label className="block text-gray-600 font-medium mb-1">
            Enter email:
          </label>          <input className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" name="email" placeholder="Email" onChange={handleChange} />
        </div>
        <div>
          <label className="block text-gray-600 font-medium mb-1">
            Enter password:
          </label>          <input className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" name="password" type="password" placeholder="Password" onChange={handleChange} />
        </div>
        <button type="submit" className="w-full py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-indigo-700 transition duration-300 shadow-md">Login</button>
        <p className="text-center text-sm text-gray-500 mt-2">
          Don't have an account?
          <a href="/register" className="text-indigo-600 font-medium hover:underline ml-1">
            Register
          </a>
        </p>
      </form>
    </div>
  );
}

export default Login;
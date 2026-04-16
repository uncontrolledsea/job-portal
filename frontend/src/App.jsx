import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import Dashboard from "./pages/Dashboard";
import EmployerDashboard from "./pages/EmployerDashboard";
import CreateJob from "./pages/CreateJob";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar"
function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Navbar/>

        <Routes>
          <Route path="/" element={
            <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                Find Your Dream Job
              </h1>

              <p className="text-xl md:text-2xl font-light">
                Start your journey today !!
              </p>
            </div>
          } />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreateJob />} />

          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route
            path="/employer-dashboard"
            element={
              <ProtectedRoute>
                <EmployerDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
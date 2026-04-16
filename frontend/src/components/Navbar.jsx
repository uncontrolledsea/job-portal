import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);


  useEffect(() => {
    const token = localStorage.getItem("token");
    const user_l = localStorage.getItem("user");

    if(user_l){
      setUser(JSON.parse(user_l));
    }
    setIsLoggedIn(!!token);


  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null)
    navigate("/");
  };

  return (
    <nav className="bg-gray-800 px-8 py-4 flex justify-between items-center">

      <h1 className="text-yellow-400 font-bold text-xl">
        Job Portal
      </h1>

      <div className="flex gap-6 items-center">

        {/* Home always visible */}
        <Link to="/" className="text-white hover:text-yellow-400">
          Home
        </Link>
        <Link to="/jobs" className="text-white hover:text-yellow-400">
          View Jobs
        </Link>

        {!isLoggedIn ? (
          <>

            <Link to="/login" className="bg-red-500 px-4 py-2 rounded-lg text-white">
              Login
            </Link>

            <Link to="/register" className="bg-red-500 px-4 py-2 rounded-lg text-white">
              Register
            </Link>
          </>
        ) : (
          <>
            {user?.role === "employer" ? (
              <Link to="/employer-dashboard" className="text-white">Employer Panel</Link>
            ) : (
              <Link to="/dashboard" className="text-white">Dashboard</Link>
            )}

            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded-lg text-white"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
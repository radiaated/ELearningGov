import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

const Header = () => {
  const userCxt = useContext(UserContext);

  return (
    <header className="fixed top-0 left-0 w-full text-white drop-shadow-md z-40">
      <div className="bg-primary-dark w-full flex justify-between text-xs px-2 py-1 items-center">
        <div>01-4444444, 01-4444442</div>
        <div className="flex gap-2">
          {userCxt.auth ? (
            <>
              <Link
                className="bg-primary-dark/50 px-4 py-1 rounded-sm"
                to="/yourcourses"
              >
                Your Courses
              </Link>
              <Link
                className="bg-primary-dark/50 px-4 py-1 rounded-sm"
                to="/profile"
              >
                Profile
              </Link>
              <Link className="bg-primary-dark/50 px-4 py-1 rounded-sm" to="#">
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link className="bg-primary-dark/50 px-4 py-1 rounded-sm">
                Login
              </Link>
              <Link className="bg-primary-dark/50 px-4 py-1 rounded-sm">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="flex items-center bg-primary-main h-20">
        <div className="w-[1400px] max-w-[90%] mx-auto flex justify-between">
          <div className="text-xl font-semibold">E Learning Government</div>
          <nav>
            <ul className="flex gap-4">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/courses">Online Courses</Link>
              </li>
              <li>
                <Link to="/studymaterials">Study Materials</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

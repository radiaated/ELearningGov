import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import UserContext from "../context/UserContext";
import { NavLink } from "react-router-dom";

const Header = () => {
  const { cart } = useSelector((state) => state.app);

  const userCxt = useContext(UserContext);

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-white">
      <div className="w-full bg-primary-dark text-white flex justify-between text-xs px-2 py-1 items-center">
        <div>01-4444444, 01-4444442</div>
        <div className="flex gap-2 items-center">
          <div>
            <Link to="/cart">
              Cart
              <i class="fa-solid fa-cart-shopping"></i> ({cart.length})
            </Link>
          </div>

          {userCxt.auth ? (
            <>
              <Link className=" px-4 py-1 rounded-sm" to="/yourcourses">
                Your Courses
              </Link>
              <Link
                className="bg-primary-dark/50 px-4 py-1 rounded-sm"
                to="/profile"
              >
                Profile
              </Link>
              <button
                className="bg-primary-dark/50 px-4 py-1 rounded-sm"
                onClick={userCxt.logout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                className="bg-primary-dark/50 px-4 py-1 rounded-sm"
                to="/login"
              >
                Login
              </Link>
              <Link
                className="bg-primary-dark/50 px-4 py-1 rounded-sm"
                to="/signup"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="flex items-center h-16 border-b border-zinc-200 shadow-sm">
        <div className="w-[1400px] max-w-[90%] mx-auto flex justify-between items-center">
          <div className="text-xl font-semibold">E Learning Government</div>
          <nav>
            <ul className="flex gap-8 text-sm font-medium">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "border-b-4 border-primary-light/75 pb-5 px-2"
                      : "px-2"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/courses"
                  className={({ isActive }) =>
                    isActive
                      ? "border-b-4 border-primary-light/75 pb-5 px-2"
                      : "px-2"
                  }
                >
                  Online Courses
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/studymaterials"
                  className={({ isActive }) =>
                    isActive
                      ? "border-b-4 border-primary-light/75 pb-5 px-2"
                      : "px-2"
                  }
                >
                  Study Materials
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive
                      ? "border-b-4 border-primary-light/75 pb-5 px-2"
                      : "px-2"
                  }
                >
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive
                      ? "border-b-4 border-primary-light/75 pb-5 px-2"
                      : "px-2"
                  }
                >
                  About
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

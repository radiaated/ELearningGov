import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import UserContext from "../context/UserContext";
import { NavLink, useLocation } from "react-router-dom";
import LogoWhite from "./../assets/images/logo-white.png";
import LogoBlack from "./../assets/images/logo-black.png";

const Header = () => {
  const { cart } = useSelector((state) => state.app);

  const [headerColor, setHeaderColor] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const location = useLocation();

  const userCxt = useContext(UserContext);

  window.addEventListener("scroll", () => {
    if (window.scrollY >= 200) {
      setHeaderColor(true);
    } else {
      setHeaderColor(false);
    }
  });
  useEffect(() => {}, []);

  return (
    <header className="fixed top-0 left-0 w-full z-[80]">
      <div className="w-full bg-primary-dark text-white flex flex-col md:flex-row justify-between text-xs px-2 py-1 md:items-center">
        <div>01-4444444, 01-4444442</div>
        <div className="flex gap-2 items-center justify-between w-full md:w-fit md:justify-normal">
          <div>
            <Link to="/cart">
              Cart
              <i className="fa-solid fa-cart-shopping"></i> ({cart.length})
            </Link>
          </div>
          <div className="flex gap-2">
            {userCxt.auth ? (
              <>
                {localStorage.getItem("isAdmin") &&
                  JSON.parse(localStorage.getItem("isAdmin")) === true && (
                    <Link
                      className="bg-primary-dark/50 px-4 py-1 rounded-sm"
                      to="/admin/dashboard"
                    >
                      Dashboard
                    </Link>
                  )}
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
      </div>

      <div
        className={`flex items-center h-16 ${
          location.pathname !== "/"
            ? "bg-white border-b border-zinc-200 shadow-sm"
            : `text-zinc-50 ${
                headerColor
                  ? "bg-white text-zinc-800 transition-all duration-500"
                  : "transition-all duration-300"
              }`
        }`}
      >
        <div className="w-[1400px] max-w-[90%] mx-auto flex justify-between items-center">
          <Link to="/">
            <div className="text-xl font-semibold">
              {location.pathname === "/" ? (
                headerColor ? (
                  <img src={LogoBlack} className="h-9 w-auto" />
                ) : (
                  <img src={LogoWhite} className="h-9 w-auto" />
                )
              ) : (
                <img src={LogoBlack} className="h-9 w-auto" />
              )}
            </div>
          </Link>
          <button
            className="block md:hidden bg-primary-dark text-lg text-white border border-primary-light rounded-md px-2 py-1 ml-2 mb-4"
            onClick={() => setMobileMenu((state) => !state)}
          >
            <i className="fa-solid fa-bars"></i>
          </button>
          <nav className="hidden md:block">
            <ul className="flex gap-8 text-sm font-medium">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "border-b-4 border-primary-light/75 pb-5 px-2"
                      : "hover:border-b-4 hover:border-zinc-400 pb-5 px-2 transition-all eas ease-in-out"
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
                      : "hover:border-b-4 hover:border-zinc-400 pb-5 px-2 transition-all eas ease-in-out"
                  }
                >
                  Online Courses
                </NavLink>
              </li>
              {/* <li>
                <NavLink
                  to="/studymaterials"
                  className={({ isActive }) =>
                    isActive
                      ? "border-b-4 border-primary-light/75 pb-5 px-2"
                      : "hover:border-b-4 hover:border-zinc-400 pb-5 px-2 transition-all eas ease-in-out"
                  }
                >
                  Study Materials
                </NavLink>
              </li> */}

              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive
                      ? "border-b-4 border-primary-light/75 pb-5 px-2"
                      : "hover:border-b-4 hover:border-zinc-400 pb-5 px-2 transition-all eas ease-in-out"
                  }
                >
                  About
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <nav
        className={`block fixed md:hidden top-0 left-50% ${
          mobileMenu ? "translate-x-[35%]" : "translate-x-[100%]"
        } w-screen h-screen bg-primary-dark pt-4 transition-all`}
      >
        <button
          className="text-xl text-white border border-primary-main rounded-md px-2 py-1 ml-2 mb-4"
          onClick={() => setMobileMenu((state) => !state)}
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <ul className="flex flex-col text-2xl font-medium  text-white divide-y divide-zinc-100">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "block p-4 bg-[#103d4e] " : "block p-4"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/courses"
              className={({ isActive }) =>
                isActive ? "block p-4 bg-[#103d4e] " : "block p-4"
              }
            >
              Online Courses
            </NavLink>
          </li>
          {/* <li>
            <NavLink
              to="/studymaterials"
              className={({ isActive }) =>
                isActive ? "block p-4 bg-[#103d4e] " : "block p-4"
              }
            >
              Study Materials
            </NavLink>
          </li> */}

          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "block p-4 bg-[#103d4e] " : "block p-4"
              }
            >
              About
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

import UserContext from "../context/UserContext";

const AdminLayout = () => {
  const authCxt = useContext(UserContext);

  return (
    <>
      {authCxt.auth && (
        <header className="bg-zinc-600 py-2">
          <div className="w-[80%] mx-auto flex justify-between items-center">
            <Link to="/admin/dashboard">
              <div className="font-extrabold text-white ">Dashboard</div>
            </Link>
            <button
              onClick={authCxt.logout}
              className="text-sm underline text-white"
            >
              Logout
            </button>
          </div>
        </header>
      )}

      <section
        className={`${
          location.pathname !== "/" ? "mt-16 w-[1400px] max-w-[90%]" : ""
        } mx-auto`}
      >
        <Outlet />
      </section>
    </>
  );
};

export default AdminLayout;

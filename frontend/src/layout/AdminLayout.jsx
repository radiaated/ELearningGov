import React from "react";
import { Outlet } from "react-router-dom";
// import "./admin.css";

const AdminLayout = () => {
  return (
    <div>
      <section
        className={`${
          location.pathname !== "/" ? "mt-32 w-[1400px] max-w-[90%]" : ""
        } mx-auto`}
      >
        <Outlet />
      </section>
    </div>
  );
};

export default AdminLayout;

import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();

  return (
    <>
      <Header />
      <section
        className={`${
          location.pathname !== "/" ? "mt-32 w-[1400px] max-w-[90%]" : ""
        } mx-auto`}
      >
        <Outlet />
      </section>

      <Footer />
    </>
  );
};

export default Layout;

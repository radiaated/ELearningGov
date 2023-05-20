import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />
      <section className="mt-36 w-[1400px] max-w-[90%] mx-auto">
        <Outlet />
      </section>

      <Footer />
    </>
  );
};

export default Layout;

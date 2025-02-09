import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-zinc-800 mt-24 w-screen">
      <div className="py-16 text-zinc-100 w-full max-w-[90%] mx-auto">
        <div className="grid grid-cols-12 md:gap-5">
          <div className="col-span-12 md:col-span-6 mb-16 md:m-0">
            <h3 className="text-3xl font-medium">E Learning Government</h3>
            <hr className="bg-zinc-300 my-2" />
            <p className="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Praesentium eius quae sit officiis aut a odit quaerat consequatur
              vel vero magnam est, voluptates ipsa facere reprehenderit eum et
              delectus quas!
            </p>
          </div>
          <div className="col-span-12 md:col-span-3 mb-16 md:m-0">
            <ul className="underline cursor-pointer">
              <li>
                <Link to="/courses">Online Courses</Link>
              </li>
              <li>
                <Link to="/studymaterials">Study Materials</Link>
              </li>

              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </div>
          <div className="col-span-12 md:col-span-3 mb-16 md:m-0">
            <h3 className="text-lg">Contact</h3>
            <hr className="my-2" />
            <div className="flex text-2xl gap-4 mb-2">
              <Link to="#">
                <i className="fa-brands fa-facebook block"></i>
              </Link>
              <Link to="#">
                <i className="fa-brands fa-twitter block"></i>
              </Link>
              <Link to="#">
                <i className="fa-brands fa-instagram block"></i>
              </Link>
            </div>
            <div className="text-sm">
              <i className="fa-regular fa-envelope"></i> elarnnepal@gov.com
            </div>
          </div>
        </div>
      </div>
      <div className="bg-zinc-900 text-center w-full py-6 text-zinc-100">
        E-Learning by Government | {new Date().getFullYear()}
      </div>
    </footer>
  );
};

export default Footer;

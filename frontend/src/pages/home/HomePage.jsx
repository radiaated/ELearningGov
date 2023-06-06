import React from "react";
import ImageSlider from "./ImageSlider";
import CoursesForYou from "./CoursesForYou";
import Testimonials from "./Testimonials";
import Categories from "./Categories";

const HomePage = () => {
  return (
    <div>
      <ImageSlider />
      <div className="">
        <CoursesForYou />
        <Testimonials />
        <Categories />
      </div>
    </div>
  );
};

export default HomePage;

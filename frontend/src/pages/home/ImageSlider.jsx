import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Image1 from "./../../assets/images/sld1.jpg";
import Image2 from "./../../assets/images/sld2.jpg";
import Image3 from "./../../assets/images/sld3.jpg";
import "@splidejs/react-splide/css/skyblue";
import { Link } from "react-router-dom";

const ImageSlider = () => {
  const imgs = [Image1, Image2, Image3];

  return (
    <div>
      <div className="h-[100vh] relative">
        <div className="absolute z-[60] top-64 left-16">
          <h2 className="text-3xl text-zinc-50 mb-8 italic ">
            <span className="text-4xl font-black">"</span> Learning is a
            lifelong process.
            <span className="text-4xl font-black">"</span>
          </h2>
          <Link className="text-lg py-4 px-8 border-2 border-primary-main w-full font-medium ml-8 rounded-sm text-blue-100 hover:bg-primary-main hover:text-zinc-100 shadow-md">
            Join Courses
          </Link>
        </div>
        <div className="block absolute bottom-20 right-0 z-[60] bg-primary-main w-[50%] py-6">
          <Link
            to="/signup"
            className="block font-semibold py-1 px-2 text-zinc-50 border-b-2 border-border-zinc-200 w-fit ml-8 text-3xl hover:bg-primary-light/40 hover:border-zinc-300"
          >
            Get Started <i className="fa-solid fa-chevron-right"></i>
          </Link>
        </div>
        <Splide
          aria-label="My Favorite Images"
          options={{
            type: "loop",
            // autoplay: true,
            interval: 5000,
            pauseOnHover: false,
            arrows: false,
            cover: true,
          }}
        >
          {imgs.map((im, ind) => (
            <SplideSlide className="h-[100vh]" key={ind}>
              <div className="h-[100vh] w-full absolute bg-black/40 top-0 left-0 z-[39]"></div>
              <img
                src={im}
                alt="Image 1"
                className="h-full w-full object-cover"
              />
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  );
};

export default ImageSlider;

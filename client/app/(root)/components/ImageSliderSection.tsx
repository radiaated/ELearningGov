"use client";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";
const ImageSliderSection = () => {
  const imgs = ["sld1.jpg", "sld2.jpg", "sld3.jpg"];
  const [emblaRef, emblaAPI] = useEmblaCarousel({ loop: true });
  const [currSlide, setCurrSlide] = useState<number>(0);

  const scrollTo = (index: number) => emblaAPI?.scrollTo(index);

  useEffect(() => {
    emblaAPI?.on("select", (evt) => {
      setCurrSlide(evt.selectedScrollSnap());
    });
  }, [emblaAPI]);

  return (
    <div className="h-[80vh] relative">
      <div className="absolute z-2 top-64 left-16">
        <h2 className="text-2xl md:text-3xl text-zinc-50 mb-8 italic">
          <span className="text-4xl font-black">"</span> Learning is a lifelong
          process.
          <span className="text-4xl font-black">"</span>
        </h2>
        <Link
          href="/signup"
          className="text-lg py-4 px-8 border-2 border-primary-main w-full font-medium ml-8 rounded-sm text-blue-100 hover:bg-primary-main hover:text-zinc-100 shadow-md"
        >
          Join Courses
        </Link>
      </div>
      <div className="block absolute z-2 bottom-20 right-0 bg-primary-main w-[50%] py-6">
        <Link
          href="/signup"
          className="block font-semibold py-1 px-2 text-zinc-50 border-b-2 border-border-zinc-200 w-fit ml-8 text-xl md:text-3xl hover:bg-primary-light/40 hover:border-zinc-300"
        >
          Get Started <i className="fa-solid fa-chevron-right"></i>
        </Link>
      </div>
      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {imgs.map((im, ind) => (
              <div className="embla__slide h-[80vh]" key={ind}>
                <img
                  src={im}
                  alt="Image 1"
                  className="h-full w-full object-cover brightness-50"
                />
              </div>
            ))}
          </div>
          <div className="embla__dots">
            {Array.from({ length: imgs.length }).map((_, idx) => (
              <button
                className={"embla__dot " + (currSlide === idx ? "active" : "")}
                key={idx}
                onClick={() => scrollTo(idx)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSliderSection;

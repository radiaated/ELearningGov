"use client";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";

const imgs = ["sld1.jpg", "sld2.jpg", "sld3.jpg"];

const ImageSliderSection = () => {
  const [emblaRef, emblaAPI] = useEmblaCarousel({ loop: true });
  const [currSlide, setCurrSlide] = useState<number>(0);

  const scrollTo = (index: number) => emblaAPI?.scrollTo(index);

  useEffect(() => {
    emblaAPI?.on("select", (evt) => {
      setCurrSlide(evt.selectedScrollSnap());
    });
  }, [emblaAPI]);

  return (
    <section>
      <div className="relative h-screen overflow-hidden">
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40 z-10" />

        {/* Hero Content */}
        <div className="absolute left-6 top-1/2 z-20 max-w-xl -translate-y-1/2 md:left-16">
          <h2 className="mb-8 text-xl font-light italic leading-relaxed text-white md:text-5xl">
            <span className="text-3xl font-black md:text-5xl">"</span>
            Learning is a lifelong process.
            <span className="text-3xl font-black md:text-5xl">"</span>
          </h2>

          <Link href="/signup" className="btn btn-primary-outline px-12 py-4">
            Join Courses
          </Link>
        </div>

        {/* CTA Button */}
        <div className="absolute bottom-20 right-0 z-20">
          <Link
            href="/signup"
            className="flex items-center gap-3 rounded-l-full bg-primary-main px-8 py-5 text-xl font-semibold text-white shadow-lg transition-all duration-300 hover:bg-primary-dark hover:pr-10"
          >
            Get Started
            <i className="fa-solid fa-chevron-right"></i>
          </Link>
        </div>

        {/* Slider */}
        <div className="embla h-full">
          <div className="embla__viewport h-full" ref={emblaRef}>
            <div className="embla__container h-full">
              {imgs.map((im, ind) => (
                <div className="embla__slide h-full" key={ind}>
                  <img
                    src={im}
                    alt={`Slide ${ind + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Dots */}
            <div className="embla__dots">
              {imgs.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollTo(idx)}
                  className={`embla__dot${currSlide === idx ? " active" : ""}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageSliderSection;

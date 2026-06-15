"use client";

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

type Testimonial = {
  author: string;
  message: string;
};

type TestimonialItemProps = {
  testimonial: Testimonial;
};
const testimonials: Testimonial[] = [
  {
    author: "Ram Prasad Adhikari",
    message:
      "eGovLearn has made learning about government policies and civic responsibilities a breeze...",
  },
  {
    author: "Ram Prasad Thapa",
    message:
      "The personalized learning paths on eGovLearn have allowed me to tailor my learning experience...",
  },
  {
    author: "Gautam Dahal",
    message:
      "eGovLearn's discussion forums have been a great platform for me to connect with others...",
  },
  {
    author: "Sita KC",
    message:
      "I can't recommend eGovLearn enough! The website's user-friendly interface...",
  },
  {
    author: "Gautam Dahal",
    message:
      "eGovLearn has helped me gain a deeper understanding of my rights and responsibilities...",
  },
];

const TestimonialItem = ({ testimonial }: TestimonialItemProps) => {
  const { author, message } = testimonial;

  return (
    <div className="px-2">
      <div className="italic px-8 pt-8 pb-2 relative border-b border-primary-light mb-1 drop-shadow-xl">
        <i className="fa-solid fa-quote-left text-4xl absolute top-1 left-0" />
        <p className="bg-primary-light/25 tracking-wide">{message}</p>
      </div>
      <div className="text-right mr-4">- {author}</div>
    </div>
  );
};

const TestimonialsSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  return (
    <section>
      <div className="bg-primary-main w-full min-h-[50vh] p-4 text-zinc-50 md:pt-16">
        <div className="w-full md:w-[75%] mx-auto relative">
          <h2 className="title text-center">Testimonials</h2>
          <div className="embla">
            <div className="embla__viewport" ref={emblaRef}>
              <div className="embla__container">
                {testimonials.map((item, idx) => (
                  <div className="embla__slide" key={`${item.author}-${idx}`}>
                    <TestimonialItem testimonial={item} />
                  </div>
                ))}
              </div>
            </div>

            <div className="embla__control">
              <button
                type="button"
                aria-label="Previous testimonial"
                className="embla__control-left"
                onClick={scrollPrev}
              >
                <i className="fa-solid fa-angle-left" />
              </button>

              <button
                type="button"
                aria-label="Next testimonial"
                className="embla__control-right"
                onClick={scrollNext}
              >
                <i className="fa-solid fa-angle-right" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

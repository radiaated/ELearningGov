import React from "react";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
// import "@splidejs/splide/css/core";

const Testimonial = ({ tes }) => {
  return (
    <SplideSlide className="">
      <div className="">
        <div className="italic px-8 pt-8 pb-2 relative border-b border-primary-light mb-1 drop-shadow-xl">
          <i className="fa-solid fa-quote-left text-4xl absolute top-1 left-0"></i>
          <p className="bg-primary-light/25 text tracking-wide ">
            {tes.message}
          </p>

          {/* <i className="fa-solid fa-quote-right text-4xl absolute bottom-0 right-1"></i> */}
        </div>
        <div className="text-right mr-4">- {tes.author}</div>
      </div>
    </SplideSlide>
  );
};

const Testimonials = () => {
  const testi = [
    {
      author: "Ram Prasad Adhikari",
      message:
        "eGovLearn has made learning about government policies and civic responsibilities a breeze. The interactive modules and engaging content have made complex topics easy to understand. I feel more informed and confident in my role as an engaged citizen.",
    },
    {
      author: "Ram Prasad Thapa",
      message:
        "The personalized learning paths on eGovLearn have allowed me to tailor my learning experience to my specific interests. I appreciate being able to focus on the topics that matter most to me and enhance my knowledge in those areas.",
    },
    {
      author: "Gautam Dahal",
      message:
        "eGovLearn's discussion forums have been a great platform for me to connect with others who share my passion for government and public affairs. The exchange of ideas and perspectives has broadened my understanding and enriched my learning journey.",
    },
    {
      author: "Sita KC",
      message:
        "I can't recommend eGovLearn enough! The website's user-friendly interface and well-structured courses have made it easy for me to navigate and learn at my own pace. ",
    },
    {
      author: "Gautam Dahal",
      message:
        "eGovLearn has helped me gain a deeper understanding of my rights and responsibilities as a citizen. The interactive elements, such as quizzes and simulations, have made learning engaging and enjoyable.",
    },
  ];

  return (
    <div className="bg-primary-main w-full h-[60vh] p-4 text-zinc-50">
      <div className="section relative">
        <h2 className="title text-center ">Testimonials</h2>
        <hr className="opacity-50" />
        <div>
          {/* <Splide
            aria-label="My Favorite Images"
            options={{ perPage: 2, gap: 28, arrows: false, pagination: true }}
          >
            <SplideTrack>
              
            </SplideTrack>

  
          </Splide> */}

          <Splide
            hasTrack={false}
            options={{ perPage: 2, gap: 40, arrows: true, pagination: false }}
          >
            <div className="custom-wrapper w-[90%] mx-auto my-4">
              <SplideTrack>
                {testi.map((tes, ind) => (
                  <Testimonial tes={tes} key={ind} />
                ))}
              </SplideTrack>
            </div>
            <div className="splide__arrows text-zinc-300"></div>
          </Splide>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;

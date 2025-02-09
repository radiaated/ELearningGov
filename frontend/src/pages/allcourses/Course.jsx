import React, { useEffect, useState, useContext } from "react";
import UserContext from "../../context/UserContext";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { appActions } from "../../features/appSlice";
import { fetchCourse } from "../../features/courseSlice";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import axios from "axios";

const CourseReviews = ({ rev, deleteReview }) => {
  const [revMenu, setRevMenu] = useState(false);
  const userCxt = useContext(UserContext);

  return (
    <>
      <div className="bg-zinc-50 p-4 border border-zinc-100 relative">
        {userCxt.auth && userCxt.auth.username === rev.username && (
          <>
            <button
              onClick={() => {
                setRevMenu((state) => !state);
              }}
              className="absolute top-1 right-4 text-zinc-500 text-sm"
            >
              <i className="fa-solid fa-ellipsis"></i>
            </button>
            {revMenu && (
              <>
                <div
                  className="w-[100%] h-[100vh] fixed top-0 left-0  z-[60]"
                  onClick={() => {
                    setRevMenu(false);
                  }}
                ></div>
                <div className="bg-white border border-zinc-200 shadow-md rounded-md absolute right-2 w-fit top-6 text-zinc-700 text-sm  z-[65]">
                  <button
                    className="block py-2 px-4 text-red-700"
                    onClick={() => deleteReview(rev.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </>
        )}

        <div className="text-primary-main">{rev.username}</div>
        <div className="flex justify-between text-xs">
          <div className="">
            <SetStarRating rating={rev.rating} />
          </div>
          <div>
            {new Date(rev.date_created).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
        <hr className="my-2" />

        <div className="text-[15px]">{rev.comment}</div>
      </div>
    </>
  );
};

const SetStarRating = ({ rating }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((item, ind) => (
        <div className=" text-yellow-400" key={ind}>
          {item <= parseInt(rating) ? (
            <i className="fa-solid fa-star"></i>
          ) : (
            <i className="fa-regular fa-star"></i>
          )}
        </div>
      ))}
    </div>
  );
};

const Course = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { course } = useSelector((state) => state.course);
  const { cart } = useSelector((state) => state.app);
  const userCxt = useContext(UserContext);
  const navigate = useNavigate();
  const deleteReview = async (id) => {
    await axios({
      url: `${
        import.meta.env.VITE_API_URL
      }/api/user/coursereview/?review_id=${id}`,
      method: "DELETE",
      withCredentials: true,
    }).then(() => {
      dispatch(fetchCourse(params["courseSlug"]));
    });
  };

  const ownFreeCourse = async (course_slug) => {
    await axios({
      url: `${
        import.meta.env.VITE_API_URL
      }/api/user/ownfreecourse/?course_slug=${course_slug}`,
      method: "POST",
      withCredentials: true,
    }).then(() => {
      navigate("/yourcourses");
    });
  };

  const courseCategories = [
    { title: "Technology and IT", short: "tech_it" },
    { title: "Professional Development", short: "prof_dev" },
    { title: "Creative Arts", short: "creative_arts" },
    { title: "Health and Wellness", short: "health_wellness" },
    { title: "Language Learning", short: "language" },
    { title: "Vocational and Trade Skills", short: "vocational_trade" },
    { title: "Environmental Studies", short: "environmental_studies" },
    { title: "Social Sciences", short: "social_sciences" },
    { title: "Law and Legal Studies", short: "law_studies" },
  ];

  useEffect(() => {
    dispatch(
      fetchCourse({
        slug: params["courseSlug"],
        access: userCxt.auth ? userCxt.auth.access : null,
      })
    );
  }, []);

  return (
    <div className="text-zinc-800 md:w-[90%] md:mx-auto">
      {!course.loading ? (
        <>
          <div className="grid grid-cols-12 gap-8">
            <div className="flex flex-col gap-2 col-span-12 md:col-span-6">
              <h3 className="text-2xl font-bold">{course.course.title}</h3>
              <p>{course.course.description}</p>
              <div className="flex gap-2 my-2">
                <span className="font-medium text-yellow-700">
                  {course.course.avg_rating}
                </span>
                <SetStarRating rating={course.course.avg_rating} /> (
                {course.course.count_rating} Review
                {course.course.count_rating > 1 && "s"})
              </div>
              <div className="bg-zinc-100 border border-zinc-300/25 text-xs w-fit px-1">
                {course.course.category &&
                  courseCategories.find(
                    (cat) => cat.short === course.course.category
                  ).title}
              </div>
              <div className="text-xs">
                by <i className="fa-regular fa-user"></i>{" "}
                <span className="text-primary-main">John Smith</span>
              </div>
              <div className="flex text-xs">
                <div>
                  <i className="fa-solid fa-globe"></i> English
                </div>
              </div>
              <div className="">
                <h3 className="text-xl font-medium my-4">Contents:</h3>
                <Accordion allowMultipleExpanded={false}>
                  {course.course.syllabus &&
                    course.course.syllabus.map((syl, ind) => (
                      <AccordionItem key={ind}>
                        <AccordionItemHeading>
                          <AccordionItemButton className="bg-zinc-50 border border-zinc-200 rounded-t-md py-4 px-3">
                            <div className="font-medium text-xl flex justify-between">
                              <div>
                                <div className="mb-1">
                                  {syl.chpt}. {syl.title}
                                </div>
                                <div className="align-middle text-xs text-zinc-400">
                                  <i className="fa-regular fa-clock mr-2"></i>
                                  <span className="">
                                    {syl.duration > 60
                                      ? `${parseInt(syl.duration / 60)} hour${
                                          parseInt(syl.duration / 60) > 1
                                            ? "s"
                                            : ""
                                        }, ${
                                          syl.duration -
                                          parseInt(syl.duration / 60) * 60
                                        } minute${
                                          syl.duration -
                                            parseInt(syl.duration / 60) * 60 >
                                          1
                                            ? "s"
                                            : ""
                                        }`
                                      : `${syl.duration} minute${
                                          syl.duration > 1 ? "s" : ""
                                        }`}
                                  </span>
                                </div>
                              </div>
                              <div>
                                <i className="fa-solid fa-grip text-zinc-400 hover:text-zinc-500 active:scale-125"></i>
                              </div>
                            </div>
                          </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel className="bg-white border-b border-x border-zinc-200 p-4 pl-6">
                          <p>{syl.description}</p>
                        </AccordionItemPanel>
                      </AccordionItem>
                    ))}
                </Accordion>
              </div>
              <hr />
              <div>
                <h3 className="text-lg font-medium my-3">Reviews</h3>
                <div className="flex flex-col gap-2">
                  {course.course.reviews?.length === 0 && "No reviews"}
                  {course.course.reviews &&
                    course.course.reviews.map((rev, ind) => (
                      <CourseReviews
                        rev={rev}
                        deleteReview={deleteReview}
                        key={ind}
                      />
                    ))}
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6">
              <div className="border border-primary-dark rounded-xl flex flex-col divide-y divide-zinc-300 overflow-hidden h-fit w-full md:w-[70%] mx-auto right-[15%] shadow-lg">
                <div>
                  <img
                    src={import.meta.env.VITE_API_URL + course.course.thumbnail}
                    className="h-64 w-full object-cover "
                  />
                </div>

                <div className="text-xl px-6 py-6">
                  {course.course.price === 0 ? (
                    <span className="block font-medium">Free</span>
                  ) : (
                    <>
                      {" "}
                      <h5 className="text-sm">Price: </h5>
                      <span className="block  font-medium">
                        Rs. {course.course.price / 100}{" "}
                      </span>
                    </>
                  )}
                </div>

                <div className="text-sm px-6 py-6 space-y-2">
                  <span className="block">
                    <i className="fa-solid fa-layer-group"></i>{" "}
                    {course.course.level}
                  </span>

                  <span className="block">
                    <i className="fa-regular fa-clock"></i> Updated: {"  "}
                    {new Date(course.course.date_created).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </span>
                </div>
                <div className="text-sm px-6 py-6 space-y-2">
                  <span className="block text-base">
                    <i className="fa-solid fa-info text-sm"></i> Requirements
                  </span>

                  <span className="block">{course.course.requirements}</span>
                </div>
                <div>
                  <button
                    className="block group w-full text-center px-5 py-4 bg-primary-main text-zinc-100 hover:bg-primary-main/90 hover:text-zinc-100 duration-100 disabled:bg-zinc-100 disabled:text-zinc-700"
                    disabled={
                      course.course.own_status &&
                      course.course.own_status.status
                    }
                    onClick={() => {
                      if (course.course.price === 0 && userCxt.auth !== null) {
                        ownFreeCourse(course.course.slug);
                      } else {
                        navigate(
                          `/buycourse?type=course&course=${course.course.slug}`
                        );
                      }
                    }}
                  >
                    {course.course.own_status &&
                    course.course.own_status.status ? (
                      <>
                        Enrolled{"  "} <i className="fa-solid fa-check"></i>
                      </>
                    ) : (
                      <>
                        Enroll{"  "}
                        <i className="fa-solid fa-graduation-cap group-hover:text-zinc-100"></i>
                      </>
                    )}
                  </button>
                </div>
              </div>
              {(!course.course.own_status?.status || userCxt.auth == null) &&
                course.course.price > 0 && (
                  <button
                    className="block w-fit mx-auto text-center px-5 py-4 text-lg text-zinc-700 hover:text-zinc-500 disabled:hover:text-zinc-700"
                    disabled={cart.find((c) => c.slug === course.course.slug)}
                    onClick={() => {
                      dispatch(appActions.addToCart(course.course));
                    }}
                  >
                    {cart.find((c) => c.slug === course.course.slug) ? (
                      <>
                        Added <i className="fa-solid fa-cart-shopping"></i>
                      </>
                    ) : (
                      <>
                        Add to cart <i className="fa-solid fa-cart-plus"></i>
                      </>
                    )}
                  </button>
                )}
            </div>
          </div>
          {/* <video
            src={import.meta.env.VITE_API_URL + course.course.preview_video}
          ></video> */}

          {/* <hr /> */}
        </>
      ) : (
        <div className="animate-pulse w-full">
          <div className="w-full h-28 bg-zinc-100 rounded-sm "></div>
        </div>
      )}
    </div>
  );
};

export default Course;

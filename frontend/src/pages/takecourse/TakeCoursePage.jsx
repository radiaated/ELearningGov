import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoughtCourse } from "../../features/courseSlice";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

import UserContext from "../../context/UserContext";
import { useParams } from "react-router-dom";

const CourseReviews = ({ rev, deleteReview }) => {
  const [revMenu, setRevMenu] = useState(false);
  const userCxt = useContext(UserContext);

  return (
    <>
      <div className="bg-zinc-50 p-4 border border-zinc-100 relative">
        {userCxt.auth.username === rev.username && (
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
      {[1, 2, 3, 4, 5].map((item) => (
        <div className=" text-yellow-500">
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

const StarRating = ({ data }) => {
  const { starRating, setStarRating, hover, setHover } = data;

  return (
    <div
      className="text-yellow-500"
      onMouseOut={() => {
        if (starRating === 0) {
          setHover(-1);
        }
      }}
    >
      {[1, 2, 3, 4, 5].map((item, ind) => (
        <div
          key={ind}
          onClick={() => setStarRating(item)}
          onMouseOver={() => {
            if (starRating === 0) {
              setHover(item);
            }
          }}
          className="inline-block cursor-pointer"
        >
          {hover > 0 && item <= hover ? (
            <i className="fa-solid fa-star opacity-70"></i>
          ) : starRating > 0 && item <= starRating ? (
            <i className="fa-solid fa-star"></i>
          ) : (
            <i className="fa-regular fa-star"></i>
          )}
        </div>
      ))}
    </div>
  );
};

const TakeCoursePage = () => {
  const [qs, setQs] = useSearchParams();
  const [starRating, setStarRating] = useState(0);
  const [hover, setHover] = useState(0);

  const [comment, setComment] = useState("");

  const commentHandler = async (pl) => {
    await axios({
      url: `${
        import.meta.env.VITE_API_URL
      }/api/user/coursereview/?online_course=${
        params["courseSlug"]
      }&rating=${starRating}`,
      method: "POST",
      data: { comment: pl.comment },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userCxt.auth.access}`,
      },
    }).then((res) => {
      setComment("");
      dispatch(
        fetchBoughtCourse({
          slug: params["courseSlug"],
          access: userCxt.auth.access,
        })
      );
    });
  };

  const params = useParams();
  const dispatch = useDispatch();
  const { boughtCourse } = useSelector((state) => state.course);

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
  const userCxt = useContext(UserContext);
  const deleteReview = async (id) => {
    await axios({
      url: `${
        import.meta.env.VITE_API_URL
      }/api/user/coursereview/?review_id=${id}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${userCxt.auth.access}`,
      },
    }).then(() => {
      dispatch(
        fetchBoughtCourse({
          slug: params["courseSlug"],
          access: userCxt.auth.access,
        })
      );
    });
  };

  useEffect(() => {
    dispatch(
      fetchBoughtCourse({
        slug: params["courseSlug"],
        access: userCxt.auth.access,
      })
    );
    setQs({ view: "content" });
  }, []);
  return (
    <div>
      {!boughtCourse.loading ? (
        <>
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl font-bold">
                {boughtCourse.boughtCourse.title}
              </h3>
              <p>{boughtCourse.boughtCourse.description}</p>
              <div className="flex gap-2 my-2">
                <span className="font-medium text-yellow-700">
                  {boughtCourse.boughtCourse.avg_rating}
                </span>
                <SetStarRating rating={boughtCourse.boughtCourse.avg_rating} />{" "}
                ({boughtCourse.boughtCourse.count_rating} Review
                {boughtCourse.boughtCourse.count_rating > 1 && "s"})
              </div>
              <div className="bg-zinc-100 border border-zinc-300/25 text-xs w-fit px-1">
                {boughtCourse.boughtCourse.category &&
                  courseCategories.find(
                    (cat) => cat.short === boughtCourse.boughtCourse.category
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
                <div className="flex gap-4 border-b border-zinc-200 my-4">
                  <Link
                    onClick={() => {
                      setQs({ view: "content" });
                    }}
                    className={`px-2 pb-2 ${
                      qs.get("view") === "content"
                        ? "border-b-2 border-primary-main"
                        : ""
                    }`}
                  >
                    Contents
                  </Link>
                  <Link
                    onClick={() => {
                      setQs({ view: "review" });
                    }}
                    className={`px-2 pb-2 ${
                      qs.get("view") === "review"
                        ? "border-b-2 border-primary-main"
                        : ""
                    }`}
                  >
                    Review
                  </Link>
                </div>

                {qs.get("view") === "content" && (
                  <Accordion allowMultipleExpanded={false}>
                    {boughtCourse.boughtCourse.syllabus &&
                      boughtCourse.boughtCourse.syllabus.map((syl) => (
                        <AccordionItem>
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
                                            parseInt(syl.duration / 60) >> 1
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
                          <AccordionItemPanel className="bg-white border-b border-x border-zinc-200 p-4 pl-6 text-sm relative pb-16">
                            <p>{syl.description}</p>
                            <Link
                              to={`/takecourse/${boughtCourse.boughtCourse.slug}/${syl.slug}`}
                              className="block align-middle  text-white bg-orange-500 px-4 py-2 w-fit rounded-sm absolute hover:border-b-4 hover:border-orange-600 bottom-5 right-4"
                            >
                              Take <i className="fa-solid fa-arrow-right"></i>
                            </Link>
                          </AccordionItemPanel>
                        </AccordionItem>
                      ))}
                  </Accordion>
                )}

                {qs.get("view") === "review" && (
                  <div>
                    <h3 className="text-lg font-medium mb-2">Reviews</h3>
                    <div className="bg-white border border-zinc-300 shadow-sm mb-4">
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          commentHandler({ comment: comment });
                        }}
                      >
                        <h4 className="px-4 py-2 border-b border-zinc-200">
                          Post your review
                        </h4>
                        <div className="px-4 py-2">
                          <StarRating
                            data={{
                              hover,
                              setHover,
                              starRating,
                              setStarRating,
                            }}
                          />
                        </div>
                        <textarea
                          className="px-4 py-2 w-full resize-none border-b border-zinc-200 bg-zinc-50"
                          value={comment}
                          placeholder="Write your review"
                          onChange={(e) => setComment(e.target.value)}
                        />
                        <input
                          className="mx-4 my-2 cursor-pointer bg-orange-500 hover:bg-orange-400 border border-orange-500 px-4 py-1 rounded-sm text-white"
                          type="submit"
                          value="Post"
                        />
                      </form>
                    </div>
                    <div className="flex flex-col gap-2">
                      {boughtCourse.boughtCourse.reviews &&
                        boughtCourse.boughtCourse.reviews.map((rev) => (
                          <CourseReviews
                            rev={rev}
                            deleteReview={deleteReview}
                          />
                        ))}
                    </div>
                  </div>
                )}
              </div>
              {/* <hr /> */}
            </div>
            <div className="">
              <div className="border border-primary-dark rounded-xl flex flex-col divide-y divide-zinc-300 overflow-hidden h-fit w-[70%] mx-auto right-[15%] shadow-lg">
                <div>
                  <img
                    src={
                      import.meta.env.VITE_API_URL +
                      boughtCourse.boughtCourse.thumbnail
                    }
                    className="h-64 w-full object-cover "
                  />
                </div>
                <div className="text-sm px-6 py-6 space-y-2">
                  <span className="block">
                    <i className="fa-solid fa-layer-group"></i> Intermediate
                  </span>

                  <span className="block">
                    <i className="fa-regular fa-clock"></i> Updated: {"  "}
                    {new Date(
                      boughtCourse.boughtCourse.date_created
                    ).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <div>
                  <div className="block group w-full text-center px-5 py-4 text-zinc-500">
                    Enrolled <i className="fa-solid fa-graduation-cap"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <video
            src={import.meta.env.VITE_API_URL + boughtCourse.boughtCourse.preview_video}
          ></video> */}

          {/* <hr /> */}
        </>
      ) : (
        <div className="grid grid-cols-2 gap-8 animate-pulse">
          <div className="space-y-2">
            <div className="h-8 w-1/2 bg-zinc-200 rounded-md"></div>
            <div className="h-44 w-full bg-zinc-200 rounded-md"></div>
            <div className="h-8 w-1/2 bg-zinc-200 rounded-md"></div>
            <div className="h-[70vh] w-full bg-zinc-200 rounded-md"></div>
            <div className="h-8 w-1/2 bg-zinc-200 rounded-md"></div>
            <div className="h-[70vh] w-full bg-zinc-200 rounded-md"></div>
          </div>
          <div className="h-[70vh] w-[70%] bg-zinc-200 rounded-md mx-auto"></div>
        </div>
      )}
    </div>
  );
};

export default TakeCoursePage;

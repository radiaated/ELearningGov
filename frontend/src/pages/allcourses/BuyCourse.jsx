import React, { useEffect, useState, useContext } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchCourse } from "../../features/courseSlice";
import { Link } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/UserContext";

export const courseCategories = [
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

const BuyCourse = () => {
  const [bought, setBought] = useState(false);

  let [qs, setQs] = useSearchParams();
  const userCxt = useContext(UserContext);
  const dispatch = useDispatch();
  const params = useParams();
  const { course } = useSelector((state) => state.course);

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

  const buyCourse = async (payload) => {
    try {
      const { data } = await axios({
        method: "POST",
        url: `${import.meta.env.VITE_API_URL}/api/user/profilecourses/`,
        data: payload,
        withCredentials: true,
      });

      // console.log(data);

      window.location.href = data.payment_url;
    } catch {}
  };

  const checkCourse = async () => {
    await axios({
      method: "GET",
      url: `${
        import.meta.env.VITE_API_URL
      }/api/user/profilecourse/?slug=${qs.get("course")}`,
      withCredentials: true,
    }).then((res) => {
      setBought(true);
    });
  };

  useEffect(() => {
    if (fetchCourse(qs.get("type") === "course")) {
      dispatch(
        fetchCourse({
          slug: qs.get("course"),
          access: userCxt.auth ? userCxt.auth.access : null,
        })
      );
    }
    checkCourse();
  }, []);

  return (
    <div className="w-full md:w-[50%] mx-auto">
      {qs.get("type") === "course" && (
        <div>
          <div className="">
            {!course.loading ? (
              <>
                <h3 className="text-xl md:text-3xl font-semi-bold mb-4">
                  Purchase
                </h3>
                <hr className="mb-4" />
                <div className="flex flex-col md:flex-row gap-4">
                  <img
                    src={import.meta.env.VITE_API_URL + course.course.thumbnail}
                    className="h-36 md:-*24 rounded-md object-cover"
                  />
                  <div className="flex flex-col gap-1">
                    <Link
                      to={bought ? `/takecourse/${course.course.slug}` : "#"}
                    >
                      <h3 className="text-xl font-medium">
                        {course.course.title}
                      </h3>
                    </Link>

                    {/* <p>
                    {course.course.description &&
                      course.course.description.slice(0, 100)}
                    ...
                  </p> */}
                    <div className="bg-zinc-100 border border-zinc-300/25 text-sm w-fit px-1">
                      {course.course.category &&
                        courseCategories.find(
                          (cat) => cat.short === course.course.category
                        ).title}
                    </div>
                  </div>
                  <div>
                    <div className="text-xl font-medium text-center mb-2">
                      Rs. {course.course.price / 100}
                    </div>
                    {!bought ? (
                      <button
                        className="group border border-green-600 rounded-full w-full px-5 py-2 hover:bg-green-600 hover:text-zinc-100 duration-100 md:w-fit"
                        onClick={(e) => {
                          e.preventDefault();
                          buyCourse({
                            course_id: [String(course.course.id)],
                            price: course.course.price,
                          });
                        }}
                      >
                        {"Purchase"}
                      </button>
                    ) : (
                      <div className="border border-green-600 rounded-full w-fit px-5 py-2 bg-green-600 text-zinc-100 flex items-center gap-2">
                        Purchased <i className="fa-solid fa-check"></i>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="animate-pulse w-full">
                <div className="w-full h-28 bg-zinc-100 rounded-sm "></div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyCourse;

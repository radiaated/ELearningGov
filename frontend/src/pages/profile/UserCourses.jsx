import React, { useContext, useEffect } from "react";
import { fetchUserCourses } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";

const UserCourses = () => {
  const dispatch = useDispatch();
  const { userCourses } = useSelector((state) => state.user);
  const userCxt = useContext(UserContext);

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
    dispatch(fetchUserCourses(userCxt.auth.access));
  }, []);

  return (
    <div className="w-full md:w-[60%] mx-auto mb-60">
      <h2 className="text-xl font-semibold">Your Courses</h2>
      <hr className="my-2" />
      <div className="flex flex-col gap-2 divide-y divide-zinc-300">
        {!userCourses.loading
          ? userCourses.userCourses.length > 0
            ? userCourses.userCourses.map((course, ind) => (
                <div
                  key={ind}
                  className="flex flex-col md:flex-row gap-2 relative py-4"
                >
                  <img
                    className="block h-24 w-full md:w-32 object-cover mr-2"
                    src={`${import.meta.env.VITE_API_URL}${course.thumbnail}`}
                    alt=""
                  />
                  <div>
                    <h3 className="text-xl font-medium">{course.title}</h3>
                    <p className="text-sm">
                      {course.description && course.description.slice(0, 75)}...
                    </p>
                    <div className="bg-zinc-100 border border-zinc-300/25 text-sm w-fit px-1">
                      {course.category &&
                        courseCategories.find(
                          (cat) => cat.short === course.category
                        ).title}
                    </div>
                  </div>

                  <Link
                    to={`/takecourse/${course.slug}`}
                    className="flex h-fit items-center gap-2 border border-primary-dark bg-primary-main px-4 py-2 w-fit rounded-sm text-white hover:bg-primary-dark duration-50"
                  >
                    Take
                    <i className="fa-solid fa-arrow-right group-hover:text-zinc-50"></i>
                  </Link>
                </div>
              ))
            : "Empty"
          : "Loading"}
      </div>
    </div>
  );
};

export default UserCourses;

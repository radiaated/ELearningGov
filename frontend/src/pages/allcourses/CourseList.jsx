import React, { useState, useEffect } from "react";
import { fetchCourseList } from "../../features/courseSlice";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CourseList = () => {
  const dispatch = useDispatch();
  let [qs, setQs] = useSearchParams();
  const [cat, setCat] = useState(
    qs.get("category") ? qs.get("category") : "none"
  );
  const { courseList } = useSelector((state) => state.course);

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
    dispatch(fetchCourseList(qs.get("category")));
  }, [qs]);

  return (
    <div className="p-4 flex flex-col gap-2">
      <h2 className="text-2xl font-semibold">Online Courses</h2>
      <div className="flex gap-4 justify-between items-baseline">
        <div className="text-xl">
          Search: {"  "}
          <input
            type="text"
            className="bg-zinc-50 text-xl border border-zinc-300 rounded-sm px-2 py-1  placeholder:font-light"
            placeholder="Search"
          />
        </div>

        <div>
          Filter: {"  "}
          <select
            className="bg-zinc-50 text-md border border-zinc-200 rounded-sm px-1"
            value={cat}
            onChange={(e) => {
              console.log("helo");
              setCat(e.target.value);
              if (e.target.value !== "none") {
                setQs({ category: e.target.value });
              } else {
                setQs(qs.delete("category"));
              }
            }}
          >
            <option value={"none"}>All</option>
            {courseCategories.map((item, index) => (
              <option key={index} value={item.short}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      <hr />
      <div className="grid grid-cols-5 gap-8">
        {!courseList.loading
          ? courseList.courseList.length > 0
            ? courseList.courseList.map((course) => (
                <div key={course.id} className="py-2">
                  <img
                    src={import.meta.env.VITE_API_URL + course.thumbnail}
                    className="h-32 w-full object-cover"
                  />

                  <Link to={`/course/${course.slug}`}>
                    <h3 className="font-semibold text-primary-dark">
                      {course.title}
                    </h3>
                  </Link>
                  <p className="truncate">{course.description}</p>
                  <div>
                    {/* Category:{" "} */}
                    <span className="bg-zinc-200 text-sm text px-1 border border-zinc-300">
                      {
                        courseCategories.find(
                          (cat) => cat.short === course.category
                        ).title
                      }
                    </span>
                  </div>
                  <div>
                    {course.price > 0 ? <>{"Rs. " + course.price}</> : "Free"}
                  </div>
                </div>
              ))
            : "Empty"
          : "Loading"}
      </div>
    </div>
  );
};

export default CourseList;

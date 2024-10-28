import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseList } from "../../features/courseSlice";
import CourseItem from "../allcourses/CourseItem";

const CoursesForYou = () => {
  const dispatch = useDispatch();

  const { courseList } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(fetchCourseList({ category: "tech_it" }));
  }, []);

  return (
    <div className="section">
      <h2 className="title">Courses For you</h2>
      <hr className="mb-4" />
      <div className="grid grid-cols-5 gap-8">
        {!courseList.loading
          ? courseList.courseList.results &&
            courseList.courseList.results.length > 0
            ? courseList.courseList.results.map((course, ind) => (
                <CourseItem course={course} key={ind} />
              ))
            : "Empty"
          : [1, 2, 3, 4, 5].map((_, i) => (
              <div className="animate-pulse" key={i}>
                <div className="w-full h-28 bg-zinc-100 rounded-sm "></div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default CoursesForYou;

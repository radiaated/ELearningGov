import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const { data } = await axios({
        method: "GET",
        url: `${import.meta.env.VITE_API_URL}/api/admins/courses/`,
        withCredentials: true,
      });
      setCourses(data);
    } catch {}
  };

  const deleteCourse = async (slug) => {
    try {
      const { data } = await axios({
        method: "DELETE",
        url: `${import.meta.env.VITE_API_URL}/api/admins/courses/${slug}/`,
        withCredentials: true,
      });
      fetchCourses();
    } catch {}
  };

  useEffect(() => {
    fetchCourses();
  }, []);
  return (
    <div className="w-[80%] mx-auto bg-white p-8 rounded-md border border-zinc-200 shadow-md">
      <h2 className="text-lg font-bold mb-4">Courses</h2>
      <div className="mb-6">
        <Link
          to="/admin/create-course"
          className="border border-primary-dark py-2 px-6 hover:bg-primary-main hover:text-white duration-100"
        >
          Create
        </Link>
      </div>
      <hr className="mb-4" />
      <div className="space-y-4 ">
        {courses.map((course, i) => (
          <div className="grid grid-cols-12 pt-4" key={i}>
            <div className="col-span-1">
              <img
                src={`http://127.0.0.1:8000${course.thumbnail}`}
                className="h-16 w-16 object-cover"
              />
            </div>
            <div className="col-span-8">{course.title}</div>
            <div className="col-span-3 flex gap-1">
              <Link
                to={`/admin/update-course/${course.slug}`}
                className="bg-orange-500 text-white p-2 text-sm h-fit rounded-sm"
              >
                <i className="fa-regular fa-pen-to-square"></i>
              </Link>
              <button
                className="bg-red-500 text-white p-2 text-sm h-fit rounded-sm"
                onClick={() => deleteCourse(course.slug)}
              >
                <i className="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;

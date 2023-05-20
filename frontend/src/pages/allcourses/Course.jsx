import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourse } from "../../features/courseSlice";
import { Link } from "react-router-dom";
import axios from "axios";

const Course = () => {
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

  useEffect(() => {
    dispatch(fetchCourse(params["courseSlug"]));
  }, []);

  return (
    <div className="text-zinc-800">
      {!course.loading ? (
        <>
          <div className="grid grid-cols-2">
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl font-bold">{course.course.title}</h3>
              <p>{course.course.description}</p>
              <div className="bg-zinc-100 border border-zinc-300/25 text-sm w-fit px-1">
                {course.course.category &&
                  courseCategories.find(
                    (cat) => cat.short === course.course.category
                  ).title}
              </div>
              <div className="text-xl font-medium">
                Rs. {course.course.price}
              </div>

              <Link
                className="group border border-zinc-800 rounded-full w-fit px-5 py-2 hover:bg-zinc-600 hover:text-zinc-100 duration-100"
                to={`/buycourse?type=course&course=${course.course.slug}`}
              >
                Enroll{" "}
                <i class="fa-solid fa-graduation-cap group-hover:text-zinc-100"></i>
              </Link>
            </div>
            <img
              src={import.meta.env.VITE_API_URL + course.course.thumbnail}
              className="h-64"
            />
          </div>
          {/* <video
            src={import.meta.env.VITE_API_URL + course.course.preview_video}
          ></video> */}
          <span className="text-xs">
            Updated: {"  "}
            {new Date(course.course.date_created).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          {/* <hr /> */}
          <div className="divide-y divide-zinc-300">
            <h3 className="text-2xl font-semi-bold my-4">Contents:</h3>
            {course.course.syllabus &&
              course.course.syllabus.map((syl) => (
                <div key={syl.id} className="py-2 flex gap-4">
                  <div className="text-center">
                    <div className="text-xs">Chapter</div>
                    <div className="font-bold text-xl">{syl.chpt}</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold">{syl.title}</div>
                    <p>{syl.description}</p>
                    <div className="">
                      <i class="fa-regular fa-clock mr-2"></i>
                      {syl.duration < 60
                        ? "00"
                        : "0" + String(parseInt(syl.duration / 60))}
                      :
                      {syl.duration % 60 > 0 && syl.duration % 60 < 10
                        ? "0" + (syl.duration % 60)
                        : syl.duration % 60 >= 10 && syl.duration % 60 < 60
                        ? syl.duration % 60
                        : syl.duration % 60 > 60 && syl.duration % 60}
                    </div>
                  </div>
                  <hr />
                </div>
              ))}
          </div>
        </>
      ) : (
        "Loading"
      )}
    </div>
  );
};

export default Course;

import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoughtCourse } from "../../features/courseSlice";
import { Link } from "react-router-dom";

import UserContext from "../../context/UserContext";
import { useParams } from "react-router-dom";

const TakeCoursePage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { boughtCourse } = useSelector((state) => state.course);
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
    dispatch(
      fetchBoughtCourse({
        slug: params["courseSlug"],
        access: userCxt.auth.access,
      })
    );
  }, []);
  return (
    <div>
      {!boughtCourse.loading ? (
        <>
          <div className="grid grid-cols-2">
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl font-bold">
                {boughtCourse.boughtCourse.title}
              </h3>
              <p>{boughtCourse.boughtCourse.description}</p>
              <div className="bg-zinc-100 border border-zinc-300/25 text-sm w-fit px-1">
                {boughtCourse.boughtCourse.category &&
                  courseCategories.find(
                    (cat) => cat.short === boughtCourse.boughtCourse.category
                  ).title}
              </div>
            </div>
            <img
              src={
                import.meta.env.VITE_API_URL +
                boughtCourse.boughtCourse.thumbnail
              }
              className="h-48"
            />
          </div>
          {/* <video
            src={import.meta.env.VITE_API_URL + boughtCourse.boughtCourse.preview_video}
          ></video> */}
          <span className="text-xs">
            Updated: {"  "}
            {new Date(
              boughtCourse.boughtCourse.date_created
            ).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          {/* <hr /> */}
          <div className="divide-y divide-zinc-300 w-[90%]">
            <h3 className="text-2xl font-semi-bold my-4">Contents:</h3>
            {boughtCourse.boughtCourse.syllabus &&
              boughtCourse.boughtCourse.syllabus.map((syl) => (
                <div key={syl.id} className="py-2 flex gap-4 justify-between">
                  <div className="text-center">
                    <div className="text-xs">Chapter</div>
                    <div className="font-semibold text-4xl">{syl.chpt}</div>
                  </div>
                  <div className="w-full">
                    <Link
                      to={`/takecourse/${boughtCourse.boughtCourse.slug}/${syl.slug}`}
                      className="text-xl font-bold text-primary-dark"
                    >
                      {syl.title}
                    </Link>
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
                  <Link
                    to={`/takecourse/${boughtCourse.boughtCourse.slug}/${syl.slug}`}
                    className="group flex border border-primary-dark rounded-lg gap-2 h-fit p-2 items-center hover:bg-primary-main hover:text-zinc-100"
                  >
                    Take
                    <i class="fa-solid fa-arrow-right group-hover:text-zinc-50"></i>
                  </Link>
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

export default TakeCoursePage;

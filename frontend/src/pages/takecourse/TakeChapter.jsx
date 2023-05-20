import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserContext from "../../context/UserContext";
import { fetchChapter, fetchBoughtCourse } from "../../features/courseSlice";
import { useParams, Link } from "react-router-dom";

import ReactPlayer from "react-player";
import { LionPlayer } from "lion-player";

const SyllabusList = () => {
  const userCxt = useContext(UserContext);
  const { boughtCourse } = useSelector((state) => state.course);
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchBoughtCourse({
        slug: params["courseSlug"],
        access: userCxt.auth.access,
      })
    );
  }, []);

  return !boughtCourse.loading ? (
    <div className="w-[30%] mt-16">
      <h4 className="text-xl font-semibold mb-4">Chapters</h4>
      <ul className="flex flex-col gap-4 w-fit">
        {boughtCourse.boughtCourse.syllabus &&
          boughtCourse.boughtCourse.syllabus.map((syl, index) => {
            console.log(params["chapterSlug"] === syl.slug);

            return (
              <li
                key={index}
                className={`relative ${
                  params["chapterSlug"] === syl.slug
                    ? "after:block after:w-full after:h-[2px] after:bg-primary-main after:absolute"
                    : ""
                }`}
              >
                <Link to={`/takecourse/${params["courseSlug"]}/${syl.slug}`}>
                  {syl.chpt}. {syl.title}
                </Link>{" "}
              </li>
            );
          })}
      </ul>
    </div>
  ) : (
    "Loading"
  );
};

const TakeChapter = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { boughtChapter } = useSelector((state) => state.course);
  const userCxt = useContext(UserContext);
  useEffect(() => {
    dispatch(
      fetchChapter({
        chapterSlug: params["chapterSlug"],
        courseSlug: params["courseSlug"],
        access: userCxt.auth.access,
      })
    );
  }, [params]);
  return (
    <div className="flex gap-4">
      <SyllabusList />
      {!boughtChapter.loading ? (
        <div className="w-[70%]">
          <div className="flex gap-4 w-[60%]">
            <div className="text-4xl font-semibold border border-zinc-700 rounded-full h-10 w-10 p-10 flex items-center justify-center">
              {boughtChapter.boughtChapter.chpt}
            </div>
            <div>
              <h3 className="text-xl font-semibold ">
                {boughtChapter.boughtChapter.title}
              </h3>
              <p>{boughtChapter.boughtChapter.description}</p>
            </div>
          </div>
          <hr />
          <div className="flex items-center gap-2 my-2">
            <i class="fa-regular fa-clock"></i>
            {boughtChapter.boughtChapter.duration}
          </div>
          {/* <ReactPlayer
            className="react-player fixed-bottom"
            width="100%"
            height="100%"
            controls={true}
            url={`${import.meta.env.VITE_API_URL}${
              boughtChapter.boughtChapter.video
            }`}
          /> */}
          <div className="z-20">
            <LionPlayer
              sources={[
                {
                  src: `${import.meta.env.VITE_API_URL}${
                    boughtChapter.boughtChapter.video
                  }`,
                  type: "video/mp4",
                },
              ]}
              autoplay={false}
            />
          </div>
          {/* <video controls>
            <source
              src={`${import.meta.env.VITE_API_URL}${
                boughtChapter.boughtChapter.video
              }`}
            />
          </video> */}
        </div>
      ) : (
        "Loading"
      )}
    </div>
  );
};

export default TakeChapter;

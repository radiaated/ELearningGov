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
    <div className="w-full md:w-[30%]">
      <div className="mb-14 rounded-sm space-y-1 p-2 border-l-4 border-primary-main bg-zinc-50">
        <h4 className="font-medium">Current Course</h4>
        <div className="flex gap-1">
          <div className="w-[20%]">
            <img
              src={`${import.meta.env.VITE_API_URL}${
                boughtCourse.boughtCourse.thumbnail
              }`}
              className="block object-cover rounded-md"
            />
          </div>
          <h5 className="text-sm w-full">
            <Link
              to={`/takecourse/${boughtCourse.boughtCourse.slug}`}
              className="cursor-pointer hover:underline underline-offset-1"
            >
              {boughtCourse.boughtCourse.title}
            </Link>{" "}
          </h5>
        </div>
      </div>
      <h4 className="text-xl font-semibold mb-4">Chapters</h4>
      <div className="flex flex-col gap-4 w-fit">
        {boughtCourse.boughtCourse.syllabus &&
          boughtCourse.boughtCourse.syllabus.map((syl, index) => {
            return (
              <div
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
              </div>
            );
          })}
      </div>
    </div>
  ) : (
    <div className="animate-pulse w-full">
      <div className="w-full h-28 bg-zinc-100 rounded-sm "></div>
    </div>
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
    <div className="flex flex-col-reverse md:flex-row gap-10">
      <SyllabusList />
      {!boughtChapter.loading ? (
        <div className="w-full md:w-[70%]">
          <div className="w-[70%] mb-4">
            {/* <div className="text-4xl font-semibold border border-zinc-700 rounded-full h-10 w-10 p-10 flex items-center justify-center"> */}

            <h3 className="text-xl font-semibold mb-2">
              {boughtChapter.boughtChapter.chpt}.{" "}
              {boughtChapter.boughtChapter.title}
            </h3>
            <p className="md:pl-5 text-[15px]">
              {boughtChapter.boughtChapter.description}
            </p>
          </div>
          <hr />

          <div className="align-middle text-sm text-zinc-500 my-3">
            <i className="fa-regular fa-clock mr-2"></i>
            <span className="">
              {boughtChapter.boughtChapter.duration > 60
                ? `${parseInt(boughtChapter.boughtChapter.duration / 60)} hour${
                    parseInt(boughtChapter.boughtChapter.duration / 60) > 1
                      ? "s"
                      : ""
                  }, ${
                    boughtChapter.boughtChapter.duration -
                    parseInt(boughtChapter.boughtChapter.duration / 60) * 60
                  } minute${
                    boughtChapter.boughtChapter.duration -
                      parseInt(boughtChapter.boughtChapter.duration / 60) * 60 >
                    1
                      ? "s"
                      : ""
                  }`
                : `${boughtChapter.boughtChapter.duration} minute${
                    boughtChapter.boughtChapter.duration > 1 ? "s" : ""
                  }`}
            </span>
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
          {boughtChapter.boughtChapter.video && (
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
          )}

          {/* <video controls>
            <source
              src={`${import.meta.env.VITE_API_URL}${
                boughtChapter.boughtChapter.video
              }`}
            />
          </video> */}
        </div>
      ) : (
        <div className="animate-pulse w-full">
          <div className="w-full h-28 bg-zinc-100 rounded-sm "></div>
        </div>
      )}
    </div>
  );
};

export default TakeChapter;

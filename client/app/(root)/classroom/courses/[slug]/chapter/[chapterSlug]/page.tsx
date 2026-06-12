"use client";

import ClassroomChapterList from "./components/ClassroomChapterList";
import { api } from "@/app/lib/api";
import { env } from "@/env";
import formatDuration from "@/utils/formatDuration";
import VideoPlayer from "./components/VideoPlayer";
import { useEffect, useState } from "react";
import type { Chapter, Course } from "@/types/course";
import { useParams } from "next/navigation";
import getCourse from "@/app/lib/getCourse";
import getChapter from "@/app/lib/getChapter";

const ClassRoomChapterPage = () => {
  const params = useParams<{ slug: string; chapterSlug: string }>();

  const { slug, chapterSlug } = params;

  const [course, setCourse] = useState<Course | null>(null);
  const [chapter, setChapter] = useState<Chapter | null>(null);

  useEffect(() => {
    getCourse(slug).then((course) => setCourse(course));
    getChapter({ courseSlug: slug, chapterSlug }).then((chapter) =>
      setChapter(chapter),
    );
  }, []);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-10">
      {course && (
        <ClassroomChapterList
          courseSlug={slug}
          chapters={course.course_chapters}
          currentChapterSlug={chapterSlug}
        />
      )}
      <div className="w-full md:w-[70%]">
        <div className="w-[70%] mb-4">
          {/* <div className="text-4xl font-semibold border border-zinc-700 rounded-full h-10 w-10 p-10 flex items-center justify-center"> */}

          <h3 className="text-xl font-semibold mb-2">
            {chapter?.chpt}. {chapter?.title}
          </h3>
          <p className="md:pl-5 text-[15px]">{chapter?.description}</p>
        </div>
        <hr />

        <div className="align-middle text-sm text-zinc-500 my-3">
          <i className="fa-regular fa-clock mr-2"></i>
          <span className="">
            {chapter?.duration && formatDuration(chapter.duration)}
          </span>
        </div>

        {/* <ReactPlayer
            className="react-player fixed-bottom"
            width="100%"
            height="100%"
            controls={true}
            url={`${import.meta.env.VITE_API_URL}${
              chapter.video
            }`}
          /> */}
        {chapter?.video && <VideoPlayer video={chapter.video} />}

        {/* <video controls>
            <source
              src={`${import.meta.env.VITE_API_URL}${
                chapter.video
              }`}
            />
          </video> */}
      </div>
    </div>
  );
};

export default ClassRoomChapterPage;

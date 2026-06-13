import Link from "next/link";
import VideoPlayer from "./components/VideoPlayer";
import ClassroomChapterList from "./components/ClassroomChapterList";
import getCourse from "@/app/lib/getCourse";
import getChapter from "@/app/lib/getChapter";
import type { Chapter, Course } from "@/types/course";
import formatDuration from "@/utils/formatDuration";

interface PageProps {
  params: Promise<{
    slug: string;
    chapterSlug: string;
  }>;
}

const ClassRoomChapterPage = async ({ params }: PageProps) => {
  const { slug, chapterSlug } = await params;

  const [course, chapter]: [Course | null, Chapter | null] = await Promise.all([
    getCourse(slug),
    getChapter({ courseSlug: slug, chapterSlug }),
  ]);

  return (
    <section>
      <div className="section-container my-8">
        <Link
          href={`/classroom/courses/${slug}`}
          className="flex gap-2 items-center w-fit text-xs hover:bg-zinc-100 transition-all py-2 pr-2 hover:pl-2 rounded"
        >
          <i className="fa-solid fa-angle-left text-zinc-500"></i>
          <img src={course?.thumbnail} className="h-6 rounded-sm" />
          <span className="text-zinc-800">{course?.title}</span>
        </Link>

        <div className="grid grid-cols-12 mt-4 gap-x-4">
          <div className="col-span-12 md:col-span-4 order-2 md:order-1">
            {course && (
              <ClassroomChapterList
                courseSlug={slug}
                chapters={course.course_chapters}
                currentChapterSlug={chapterSlug}
              />
            )}
          </div>

          <div className="col-span-12 md:col-span-8 mt-0 md:-mt-12 order-1 md:order-2">
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-semibold">
                {chapter?.chpt}. {chapter?.title}
              </h3>

              <p className="pl-5 text-sm text-zinc-800">
                {chapter?.description}
              </p>

              <div className="pl-5 text-sm text-zinc-500">
                <i className="fa-regular fa-clock mr-2" />
                <span>
                  {chapter?.duration ? formatDuration(chapter.duration) : null}
                </span>
              </div>

              <hr className="border-zinc-300" />

              {chapter?.video && <VideoPlayer video={chapter.video} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClassRoomChapterPage;

import { Chapter } from "@/types/course";
import Link from "next/link";

const ClassroomChapterList = ({
  courseSlug,
  chapters,
  currentChapterSlug,
}: {
  courseSlug: string;
  chapters: Chapter[];
  currentChapterSlug: string;
}) => {
  return (
    <div className="w-full md:w-[30%]">
      <h4 className="text-xl font-semibold mb-4">Chapters</h4>
      <div className="flex flex-col gap-4 w-fit">
        {chapters.map((chapter, index) => {
          return (
            <div
              key={index}
              className={`relative ${
                currentChapterSlug === chapter.slug
                  ? "after:block after:w-full after:h-[2px] after:bg-primary-main after:absolute"
                  : ""
              }`}
            >
              <Link
                href={`/classroom/courses/${courseSlug}/chapter/${chapter.slug}`}
              >
                {chapter.chpt}. {chapter.title}
              </Link>{" "}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClassroomChapterList;

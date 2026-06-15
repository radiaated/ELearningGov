import type { Chapter } from "@/types/course";
import Link from "next/link";

interface ClassroomChapterListProps {
  courseSlug: string;
  chapters: Chapter[];
  currentChapterSlug: string;
}

const ClassroomChapterList = ({
  courseSlug,
  chapters,
  currentChapterSlug,
}: ClassroomChapterListProps) => {
  return (
    <div className="w-full">
      <h4 className="text-lg font-semibold text-gray-900 mb-4">Chapters</h4>

      <nav className="flex flex-col gap-1">
        {chapters.map((chapter) => {
          const isActive = currentChapterSlug === chapter.slug;

          return (
            <Link
              key={chapter.slug}
              href={`/classroom/courses/${courseSlug}/chapter/${chapter.slug}`}
              className={`
                group relative flex items-center gap-2 rounded-md px-3 py-2
                text-sm transition-all duration-200
                ${
                  isActive
                    ? "bg-primary-main/10 text-primary-main font-medium"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }
              `}
            >
              {/* Chapter number badge */}
              <span
                className={`
                  flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium
                  ${
                    isActive
                      ? "bg-primary-main text-white"
                      : "bg-gray-200 text-gray-700 group-hover:bg-gray-300"
                  }
                `}
              >
                {chapter.chpt}
              </span>

              {/* Title */}
              <span className="truncate">{chapter.title}</span>

              {/* Active indicator bar */}
              {isActive && (
                <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-primary-main" />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default ClassroomChapterList;

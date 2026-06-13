import ChapterList from "@/components/ChapterList";
import CourseReviewList from "@/components/CourseReviewList";
import CourseReviewForm from "./components/CourseReviewForm";
import getCourse from "@/app/lib/getCourse";
import courseCategories from "@/data/courseCategories";
import StarRating from "@/components/StarRating";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const ClassroomCoursePage = async ({ params }: Props) => {
  const { slug } = await params;

  const course = await getCourse(slug);

  const categoryTitle =
    courseCategories.find((c) => c.value === course?.category)?.label ??
    "Uncategorized";

  return (
    <section>
      <div className="section-container my-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Left side */}
          <div className="flex flex-col gap-3 col-span-12 lg:col-span-6">
            <h3 className="text-2xl font-bold">{course.title}</h3>{" "}
            <p>{course.description}</p>
            <div className="bg-zinc-100 border border-zinc-300/25 text-xs w-fit px-2 py-1 rounded">
              {categoryTitle}
            </div>
            <div className="flex items-center gap-2">
              {course.avg_rating && (
                <span className="font-medium text-yellow-700">
                  {course.avg_rating}
                </span>
              )}

              {course.avg_rating && <StarRating rating={course.avg_rating} />}
              <span>
                ({course.reviews_count} review
                {course.reviews_count !== 1 ? "s" : ""})
              </span>
            </div>
            <div className="flex gap-4 items-center">
              <div className="text-xs">
                <i className="fa-regular fa-user" />
                <span className="text-primary-main">John Smith</span>
              </div>

              <div className="text-xs">
                <i className="fa-solid fa-globe" /> English
              </div>
            </div>
            <hr className="text-zinc-300" />
            {/* Course Contents */}
            <div>
              <ChapterList
                chapters={course.course_chapters}
                courseSlug={slug}
                showWatchButton
              />
            </div>
            <hr className="text-zinc-300" />
            {/* Reviews */}
            <div className="space-y-6">
              <CourseReviewForm slug={slug} />

              <CourseReviewList
                courseReviews={course.course_reviews}
                courseSlug={slug}
              />
            </div>
          </div>

          {/* Right side */}
          <div className="col-span-12 lg:col-span-6">
            <div className="md:sticky md:top-30">
              <div className="border border-primary-dark rounded-xl overflow-hidden shadow-lg w-full lg:w-2/3 mx-auto divide-y divide-zinc-300">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="h-64 w-full object-cover"
                />

                <div className="text-sm px-4 py-4">
                  <span className="block">
                    <i className="fa-solid fa-layer-group" /> {course.level}
                  </span>
                </div>

                <div className="text-sm px-4 py-4 space-y-2">
                  <span className="block text-base">
                    <i className="fa-solid fa-info text-sm" /> Requirements
                  </span>

                  <span className="block">{course.requirements}</span>
                </div>

                <div className="p-4 text-center text-zinc-500 text-sm">
                  Enrolled <i className="fa-solid fa-graduation-cap" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClassroomCoursePage;

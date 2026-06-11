import type { Course } from "@/types/course";
import StarRating from "./StarRating";
import Link from "next/link";

const CourseItem = ({ course }: { course: Course }) => {
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
  return (
    <div key={course.id}>
      <Link href={`/courses/${course.slug}`}>
        <img
          src={course.thumbnail}
          className="h-32 w-full object-cover rounded-md mb-1 hover:outline hover:outline-primary-light"
        />

        <h3 className="font-medium text-[15px] text-primary-dark hover:underline underline-offset-1">
          {course.title}
        </h3>
      </Link>
      <div className="text-xs flex gap-1 mt-1">
        <span className="text-yellow-700 font-medium">
          {course.avg_rating || 0}
        </span>
        <StarRating rating={course.avg_rating || 0} />
        <span className="text-yellow-700">
          ({course.reviews_count} Review
          {course.reviews_count > 1 && "s"})
        </span>
      </div>
      <div>
        {/* Category:{" "} */}
        <span className="bg-zinc-100 text-xs text px-1 border border-zinc-300">
          {courseCategories.find((cat) => cat.short === course.category)
            ?.title ?? "-"}
        </span>
      </div>
      <div>
        <span className="text-lg font-medium">
          <span className="text-sm">Rs. </span>
          {course.price / 100}
        </span>
      </div>
    </div>
  );
};

export default CourseItem;

import type { Course } from "@/types/course";
import StarRating from "./StarRating";
import Link from "next/link";
import courseCategories from "@/data/courseCategories";

const CourseItem = ({ course }: { course: Course }) => {
  const rating = course.avg_rating ?? 0;
  const reviewCount = course.reviews_count ?? 0;

  const categoryTitle =
    courseCategories.find((cat) => cat.short === course.category)?.title || "-";

  const priceInRupees = (course.price ?? 0) / 100;

  return (
    <div>
      <Link href={`/courses/${course.slug}`} className="block">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="h-32 w-full object-cover rounded-md mb-1 hover:outline hover:outline-primary-light"
        />

        <h3 className="font-medium text-[15px] text-primary-dark hover:underline underline-offset-1">
          {course.title}
        </h3>
      </Link>

      <div className="text-xs flex gap-1 mt-1 items-center">
        <span className="text-yellow-700 font-medium">{rating}</span>

        <StarRating rating={rating} />

        <span className="text-yellow-700">
          ({reviewCount} Review{reviewCount === 1 ? "" : "s"})
        </span>
      </div>

      <div className="mt-1">
        <span className="bg-zinc-100 text-xs px-1 border border-zinc-300 rounded">
          {categoryTitle}
        </span>
      </div>

      <div className="mt-1">
        <span className="text-lg font-medium">
          <span className="text-sm">Rs. </span>
          {priceInRupees.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default CourseItem;

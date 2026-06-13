import type { Course } from "@/types/course";
import Link from "next/link";
import StarRating from "./StarRating";
import courseCategories from "@/data/courseCategories";
import formatPrice from "@/utils/formatPrice";

type CourseItemProps = {
  course: Course;
};

const CourseItem = ({ course }: CourseItemProps) => {
  const { slug, thumbnail, title, avg_rating, reviews_count, category, price } =
    course;

  const rating = avg_rating ?? 0;
  const reviewCount = reviews_count ?? 0;
  const priceInRupees = formatPrice(price);

  const categoryTitle =
    courseCategories.find((cat) => cat.value === category)?.label ?? "-";

  const reviewLabel = reviewCount === 1 ? "Review" : "Reviews";

  return (
    <article className="group">
      <Link href={`/courses/${slug}`} className="block">
        <img
          src={thumbnail}
          alt={title}
          loading="lazy"
          className="h-32 w-full object-cover rounded-md mb-1 group-hover:outline group-hover:outline-primary-light"
        />

        <h3 className="font-medium text-[15px] text-primary-dark group-hover:underline underline-offset-1">
          {title}
        </h3>
      </Link>

      <div className="text-xs flex gap-1 mt-1 items-center">
        <span className="text-yellow-700 font-medium">{rating}</span>
        <StarRating rating={rating} />
        <span className="text-yellow-700">
          ({reviewCount} {reviewLabel})
        </span>
      </div>

      <div className="mt-1">
        <span className="bg-zinc-100 text-xs px-1 border border-zinc-300 rounded">
          {categoryTitle}
        </span>
      </div>

      <div className="mt-1">
        <span className="text-lg font-medium">{priceInRupees}</span>
      </div>
    </article>
  );
};

export default CourseItem;

import CourseReviewList from "@/app/components/CourseReviewList";
import StarRating from "@/app/components/StarRating";
import Link from "next/link";
import { cookies } from "next/headers";

import courseCategories from "@/data/courseCategories";
import ChapterList from "@/app/components/ChapterList";

import getCourse from "@/app/lib/getCourse";
import getCoursePurchaseStatus from "@/app/lib/getCoursePurchaseStatus";
import CartButton from "./components/CartButton";

import formatDate from "@/utils/formatDate";
import formatPrice from "@/utils/formatPrice";

const CoursePage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const course = await getCourse(slug);
  const purchaseStatusData = await getCoursePurchaseStatus(slug, cookieHeader);

  const isEnrolled = Boolean(purchaseStatusData?.purchase_status);

  const categoryTitle =
    courseCategories.find((cat) => cat.value === course.category)?.label ??
    "Uncategorized";

  const priceLabel = formatPrice(course.price);

  const enrollHref = isEnrolled
    ? `/classroom/course/${slug}`
    : `/courses/${slug}/buy`;

  return (
    <section>
      <div className="section-container my-8">
        <div className="grid grid-cols-12 gap-8">
          {/* LEFT SIDE */}
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
            <ChapterList chapters={course.course_chapters} />
            <hr className="text-zinc-300" />
            <CourseReviewList courseReviews={course.course_reviews} />
          </div>

          {/* RIGHT SIDE */}
          <div className="col-span-12 lg:col-span-6">
            <div className="md:sticky md:top-30">
              <div className="border border-primary-dark rounded-xl overflow-hidden shadow-lg w-full lg:w-2/3 mx-auto divide-y divide-zinc-300">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="h-64 w-full object-cover"
                />

                {/* PRICE */}
                <div className="px-4 py-4">
                  {course.price === 0 ? (
                    <span className="block font-medium">Free</span>
                  ) : (
                    <>
                      <h5 className="text-sm">Price</h5>
                      <span className="block font-medium">{priceLabel}</span>
                    </>
                  )}
                </div>

                {/* META */}
                <div className="text-sm px-4 py-4 space-y-2">
                  <span className="block">
                    <i className="fa-solid fa-layer-group" /> {course.level}
                  </span>

                  <span className="block">
                    <i className="fa-regular fa-clock" /> Updated:
                    {formatDate(course.date_created)}
                  </span>
                </div>

                {/* REQUIREMENTS */}
                <div className="text-sm px-4 py-4 space-y-2">
                  <span className="block text-base">
                    <i className="fa-solid fa-info text-sm" /> Requirements
                  </span>
                  <span className="block">{course.requirements}</span>
                </div>

                {/* CTA */}
                <Link
                  href={enrollHref}
                  className="block w-full text-center px-5 py-4 bg-primary-main text-zinc-100 hover:bg-primary-main/90 transition"
                >
                  {isEnrolled ? (
                    <>
                      Enrolled <i className="fa-solid fa-check" />
                    </>
                  ) : (
                    <>
                      Enroll <i className="fa-solid fa-graduation-cap" />
                    </>
                  )}
                </Link>
              </div>

              <CartButton
                course={{
                  id: course.id,
                  slug: course.slug,
                  title: course.title,
                  price: course.price,
                  thumbnail: course.thumbnail,
                }}
                purchased={isEnrolled}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursePage;

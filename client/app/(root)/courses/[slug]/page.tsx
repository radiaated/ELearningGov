import CourseReviewList from "@/app/components/CourseReviewList";
import StarRating from "@/app/components/StarRating";
import { api } from "@/app/lib/api";
import { env } from "@/env";
import Link from "next/link";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { cookies } from "next/headers";
import CartButton from "./components/CartButton";

import courseCategories from "@/data/courseCategories";
import { Chapter } from "@/types/course";
import { getDuration } from "@/app/lib/duration";
import ChapterList from "@/app/components/ChapterList";
import { redirect } from "next/navigation";
import getCourse from "@/app/lib/getCourse";
import getCoursePurchaseStatus from "@/app/lib/getCoursePurchaseStatus";
import deleteCourseReview from "@/app/lib/deleteCourseReview";

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

  return (
    <div className="text-zinc-800 md:w-[90%] md:mx-auto">
      <>
        <div className="grid grid-cols-12 gap-8">
          <div className="flex flex-col gap-2 col-span-12 md:col-span-6">
            <h3 className="text-2xl font-bold">{course.title}</h3>
            <p>{course.description}</p>
            <div className="flex gap-2 my-2">
              <span className="font-medium text-yellow-700">
                {course.avg_rating}
              </span>
              <StarRating rating={course.avg_rating} /> ({course.reviews_count}{" "}
              Review
              {course.reviews_count > 1 && "s"})
            </div>
            <div className="bg-zinc-100 border border-zinc-300/25 text-xs w-fit px-1">
              {
                courseCategories.find((cat) => cat.short === course.category)
                  ?.title
              }
            </div>
            <div className="text-xs">
              by <i className="fa-regular fa-user"></i>
              <span className="text-primary-main">John Smith</span>
            </div>
            <div className="flex text-xs">
              <div>
                <i className="fa-solid fa-globe"></i> English
              </div>
            </div>
            <ChapterList chapters={course.course_chapters} />
            <hr />
            <CourseReviewList couresReviews={course.course_reviews} />
          </div>
          <div className="col-span-12 md:col-span-6">
            <div className="border border-primary-dark rounded-xl flex flex-col divide-y divide-zinc-300 overflow-hidden h-fit w-full md:w-[70%] mx-auto right-[15%] shadow-lg">
              <div>
                <img
                  src={course.thumbnail}
                  className="h-64 w-full object-cover"
                />
              </div>

              <div className="text-xl px-6 py-6">
                {course.price === 0 ? (
                  <span className="block font-medium">Free</span>
                ) : (
                  <>
                    {" "}
                    <h5 className="text-sm">Price: </h5>
                    <span className="block  font-medium">
                      Rs. {course.price / 100}{" "}
                    </span>
                  </>
                )}
              </div>

              <div className="text-sm px-6 py-6 space-y-2">
                <span className="block">
                  <i className="fa-solid fa-layer-group"></i> {course.level}
                </span>

                <span className="block">
                  <i className="fa-regular fa-clock"></i> Updated: {"  "}
                  {new Date(course.date_created).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="text-sm px-6 py-6 space-y-2">
                <span className="block text-base">
                  <i className="fa-solid fa-info text-sm"></i> Requirements
                </span>

                <span className="block">{course.requirements}</span>
              </div>
              <div>
                <Link
                  className="block group w-full text-center px-5 py-4 bg-primary-main text-zinc-100 hover:bg-primary-main/90 hover:text-zinc-100 duration-100 disabled:bg-zinc-100 disabled:text-zinc-700"
                  href={
                    purchaseStatusData?.purchase_status
                      ? `/classroom/course/${slug}`
                      : `/courses/${slug}/buy`
                  }
                >
                  {purchaseStatusData && purchaseStatusData.purchase_status ? (
                    <>
                      Enrolled{"  "} <i className="fa-solid fa-check"></i>
                    </>
                  ) : (
                    <>
                      Enroll{"  "}
                      <i className="fa-solid fa-graduation-cap group-hover:text-zinc-100"></i>
                    </>
                  )}
                </Link>
              </div>
            </div>
            <CartButton
              course={{
                id: course.id,
                slug: course.slug,
                title: course.title,
                price: course.price,
                thumbnail: course.thumbnail,
              }}
              purchased={purchaseStatusData?.purchase_status}
            />
          </div>
        </div>
        {/* <video
            src={import.meta.env.VITE_API_URL + course.preview_video}
          ></video> */}

        {/* <hr /> */}
      </>
    </div>
  );
};

export default CoursePage;

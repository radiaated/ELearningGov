"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

import StarRating from "@/app/components/StarRating";
import ChapterList from "@/app/components/ChapterList";

import deleteCourseReview from "@/app/lib/deleteCourseReview";
import postCoureReview from "@/app/lib/postCoureReview";
import updateCoureReview from "@/app/lib/updateCoureReview";

import getCourse from "@/app/lib/getCourse";
import { Course } from "@/types/course";
import courseCategories from "@/data/courseCategories";
import CourseReviewList from "@/app/components/CourseReviewList";
import { useForm } from "react-hook-form";
import {
  courseReviewSchema,
  CourseReview as CourseReviewFormData,
} from "@/types/course";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "next/navigation";
import SetStarRating from "@/app/components/SetStarRating";

const ClassroomCoursePageClient = () => {
  const { slug } = useParams<{ slug: string }>();

  const qs = useSearchParams();
  const router = useRouter();

  const [course, setCourse] = useState<Course | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(courseReviewSchema),
  });

  const onRatingChange = (rating: number) => {
    setValue("rating", rating);
  };

  const onSubmit = async (data: CourseReviewFormData) => {
    console.log("a");
    await postCoureReview(data, slug).then(() =>
      getCourse(slug).then((course) => setCourse(course)),
    );
  };

  useEffect(() => {
    console.log(slug);
    getCourse(slug).then((course) => setCourse(course));
    router.replace("?view=content");
  }, []);

  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-12 md:col-span-6 flex flex-col gap-3">
        <h3 className="text-2xl font-bold">{course?.title}</h3>
        <p>{course?.description}</p>

        <div className="flex gap-2 items-center">
          <span className="text-yellow-700 font-medium">
            {course?.avg_rating}
          </span>

          {course?.avg_rating && <StarRating rating={course.avg_rating} />}

          <span>
            ({course?.reviews_count} review
            {course?.reviews_count && course?.reviews_count > 1 && "s"})
          </span>
        </div>

        <div className="bg-zinc-100 text-xs w-fit px-2">
          {courseCategories.find((c) => c.short === course?.category)?.title}
        </div>

        <div className="text-xs">
          by <span className="text-primary-main">John Smith</span>
        </div>

        <hr />

        {/* CONTENT / REVIEWS TABS */}
        <div className="flex gap-4 border-b my-4">
          <Link
            href="?view=content"
            className={
              qs.get("view") === "content" ? "border-b-2 border-orange-500" : ""
            }
          >
            Contents
          </Link>

          <Link
            href="?view=review"
            className={
              qs.get("view") === "review" ? "border-b-2 border-orange-500" : ""
            }
          >
            Reviews
          </Link>
        </div>

        {/* CONTENT */}
        {qs.get("view") === "content" && course?.course_chapters && (
          <ChapterList
            chapters={course.course_chapters}
            courseSlug={slug}
            showWatchButton={true}
          />
        )}

        {/* REVIEWS */}
        {qs.get("view") === "review" && (
          <div className="space-y-4">
            {/* POST REVIEW */}
            <form onSubmit={handleSubmit(onSubmit)} className="border p-3">
              <div className="mb-2">
                <SetStarRating onChange={onRatingChange} />
              </div>

              <textarea
                className="w-full border p-2"
                {...register("comment")}
                placeholder="Write your review"
              />
              {errors.comment?.message}

              <input
                type="submit"
                value="Post"
                className="mt-2 bg-orange-500 text-white px-4 py-1"
              />
            </form>

            {/* REVIEW LIST (manual but still uses your logic) */}
            {course?.course_reviews && (
              <CourseReviewList couresReviews={course?.course_reviews} />
            )}
          </div>
        )}
      </div>

      {/* RIGHT */}
      <div className="col-span-12 md:col-span-6">
        <div className="border rounded-xl overflow-hidden shadow-lg">
          <img src={course?.thumbnail} className="h-64 w-full object-cover" />

          <div className="p-4 text-sm space-y-2">
            <div>
              <i className="fa-solid fa-layer-group"></i> {course?.level}
            </div>

            <div>
              <i className="fa-regular fa-clock"></i>{" "}
              {course?.date_created &&
                new Date(course?.date_created).toLocaleDateString()}
            </div>
          </div>

          <div className="p-4 text-center text-gray-500">
            Enrolled <i className="fa-solid fa-graduation-cap"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassroomCoursePageClient;

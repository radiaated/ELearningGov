"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import StarRating from "@/app/components/StarRating";
import ChapterList from "@/app/components/ChapterList";
import CourseReviewList from "@/app/components/CourseReviewList";
import SetStarRating from "@/app/components/SetStarRating";

import getCourse from "@/app/lib/getCourse";
import postCoureReview from "@/app/lib/postCoureReview";

import courseCategories from "@/data/courseCategories";

import type { Course } from "@/types/course";

import { courseReviewSchema } from "@/schemas/course";
import type { CourseReviewFormData } from "@/schemas/course";

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
    reset,
  } = useForm<CourseReviewFormData>({
    resolver: yupResolver(courseReviewSchema),
  });

  const onRatingChange = (rating: number) => {
    setValue("rating", rating);
  };

  const onSubmit = async (data: CourseReviewFormData) => {
    await postCoureReview(data, slug);
    const updated = await getCourse(slug);
    setCourse(updated);
    reset();
  };

  const categoryTitle =
    courseCategories.find((c) => c.value === course?.category)?.label ??
    "Uncategorized";

  useEffect(() => {
    getCourse(slug).then(setCourse);
    router.replace("?view=content");
  }, [slug, router]);

  return (
    <section>
      <div className="section-container my-8">
        <div className="grid grid-cols-12 gap-8">
          {/* LEFT SIDE */}
          <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">
            <h3 className="text-2xl font-bold">{course?.title}</h3>

            <p className="text-sm text-zinc-700">{course?.description}</p>

            {/* Rating */}
            <div className="flex items-center gap-2">
              {course?.avg_rating && (
                <span className="font-medium text-yellow-700">
                  {course.avg_rating}
                </span>
              )}

              {course?.avg_rating && <StarRating rating={course.avg_rating} />}

              <span className="text-sm">
                ({course?.reviews_count} review
                {course?.reviews_count !== 1 ? "s" : ""})
              </span>
            </div>

            {/* Category */}
            <div className="bg-zinc-100 border border-zinc-300/30 text-xs w-fit px-2 py-1 rounded">
              {categoryTitle}
            </div>

            {/* Author / Meta */}
            <div className="flex items-center gap-4 text-xs text-zinc-600">
              <span>
                <i className="fa-regular fa-user" />{" "}
                <span className="text-primary-main">John Smith</span>
              </span>

              <span>
                <i className="fa-solid fa-globe" /> English
              </span>
            </div>

            <hr className="text-zinc-300" />

            {/* Tabs */}
            <div className="flex gap-6 border-b text-sm">
              <Link
                href="?view=content"
                className={`pb-2 ${
                  qs.get("view") === "content"
                    ? "border-b-2 border-primary-main font-medium"
                    : ""
                }`}
              >
                Contents
              </Link>

              <Link
                href="?view=review"
                className={`pb-2 ${
                  qs.get("view") === "review"
                    ? "border-b-2 border-primary-main font-medium"
                    : ""
                }`}
              >
                Reviews
              </Link>
            </div>

            {/* CONTENT */}
            {qs.get("view") === "content" && course?.course_chapters && (
              <ChapterList
                chapters={course.course_chapters}
                courseSlug={slug}
                showWatchButton
              />
            )}

            {/* REVIEWS */}
            {qs.get("view") === "review" && (
              <div className="space-y-6">
                {/* POST REVIEW */}
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="border border-zinc-200 rounded p-4 space-y-3"
                >
                  <SetStarRating onChange={onRatingChange} />

                  <textarea
                    className="w-full border p-2 rounded text-sm"
                    {...register("comment")}
                    placeholder="Write your review..."
                  />

                  {errors.comment?.message && (
                    <p className="text-xs text-red-500">
                      {errors.comment.message}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="bg-primary-main text-white px-4 py-2 text-sm rounded"
                  >
                    Post Review
                  </button>
                </form>

                {course && (
                  <CourseReviewList
                    courseReviews={course.course_reviews}
                    courseSlug={slug}
                  />
                )}
              </div>
            )}
          </div>

          {/* RIGHT SIDE (sticky card like your original design) */}
          <div className="col-span-12 lg:col-span-6">
            <div className="md:sticky md:top-30">
              <div className="border border-primary-dark rounded-xl overflow-hidden shadow-lg w-full lg:w-2/3 mx-auto divide-y divide-zinc-300">
                <img
                  src={course?.thumbnail}
                  alt={course?.title}
                  className="h-64 w-full object-cover"
                />

                {/* META */}
                <div className="text-sm px-4 py-4 space-y-2">
                  <span className="block">
                    <i className="fa-solid fa-layer-group" /> {course?.level}
                  </span>
                </div>

                {/* REQUIREMENTS */}
                <div className="text-sm px-4 py-4 space-y-2">
                  <span className="block text-base">
                    <i className="fa-solid fa-info text-sm" /> Requirements
                  </span>
                  <span className="block">{course?.requirements}</span>
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

export default ClassroomCoursePageClient;

"use client";
import { toast } from "sonner";

import type { CourseReview } from "@/types/course";

import CourseReviewItem from "./CourseReviewItem";

import deleteCourseReview from "../app/lib/deleteCourseReview";

const CourseReviewList = ({
  courseReviews,
  courseSlug,
}: {
  courseReviews: CourseReview[];
  courseSlug?: string;
}) => {
  const handleDelete = async (reviewId: number) => {
    if (!courseSlug) return;

    try {
      await deleteCourseReview(courseSlug, reviewId);
    } catch (err) {
      toast.error("Failed to delete the course review.");
      console.error("Error occured.", err);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-medium my-3">Reviews</h3>

      <div className="flex flex-col gap-2">
        {courseReviews.length > 0 ? (
          courseReviews.map((review) => (
            <CourseReviewItem
              key={review.id}
              review={review}
              deleteReview={() => handleDelete(review.id)}
            />
          ))
        ) : (
          <p>No reviews</p>
        )}
      </div>
    </div>
  );
};

export default CourseReviewList;

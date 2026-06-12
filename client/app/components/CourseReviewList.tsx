import React from "react";
import type { CourseReview } from "@/types/course";
import CourseReviewItem from "./CourseReviewItem";
import deleteCourseReview from "../lib/deleteCourseReview";

const CourseReviewList = ({
  courseReviews,
  courseSlug,
}: {
  courseReviews: CourseReview[];
  courseSlug?: string;
}) => {
  return (
    <div>
      <h3 className="text-lg font-medium my-3">Reviews</h3>

      <div className="flex flex-col gap-2">
        {courseReviews?.length > 0 ? (
          courseReviews.map((review) => (
            <CourseReviewItem
              key={review.id}
              review={review}
              deleteReview={() =>
                review.id &&
                courseSlug &&
                deleteCourseReview(courseSlug, review.id)
              }
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

import React from "react";
import type { CourseReview } from "@/types/course";
import CourseReviewItem from "./CourseReviewItem";

const CourseReviewList = ({
  couresReviews,
}: {
  couresReviews: CourseReview[];
}) => {
  return (
    <div>
      <h3 className="text-lg font-medium my-3">Reviews</h3>
      <div className="flex flex-col gap-2">
        {couresReviews?.length > 0
          ? couresReviews.map((review, ind) => (
              <CourseReviewItem review={review} isOwner={true} key={ind} />
            ))
          : "No reviews"}
      </div>
    </div>
  );
};

export default CourseReviewList;

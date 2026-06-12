"use client";

import { useState } from "react";
import StarRating from "./StarRating";
import { CourseReview } from "@/types/course";

const CourseReviewItem = ({
  review,
  deleteReview,
}: {
  review: CourseReview;
  deleteReview?: (id: number) => void;
}) => {
  const [revMenu, setRevMenu] = useState(false);

  const handleDelete = async () => {
    if (!review.id) return;

    deleteReview && deleteReview(review.id);

    setRevMenu(false);
  };

  return (
    <div className="bg-zinc-50 p-4 border border-zinc-100 relative">
      {/* Menu button */}
      <button
        onClick={() => setRevMenu((state) => !state)}
        className="absolute top-1 right-4 text-zinc-500 text-sm"
      >
        <i className="fa-solid fa-ellipsis"></i>
      </button>

      {/* Dropdown + overlay */}
      {revMenu && (
        <>
          <div
            className="w-full h-screen fixed top-0 left-0 z-[60]"
            onClick={() => setRevMenu(false)}
          />

          <div className="bg-white border border-zinc-200 shadow-md rounded-md absolute right-2 top-6 text-zinc-700 text-sm z-[65]">
            <button
              className="block py-2 px-4 text-red-700"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </>
      )}

      {/* Content */}
      <div className="text-primary-main">{review.username}</div>

      <div className="flex justify-between text-xs">
        <StarRating rating={review.rating} />

        {review.date_created && (
          <div>
            {new Date(review.date_created).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        )}
      </div>

      <hr className="my-2" />

      <div className="text-[15px]">{review.comment}</div>
    </div>
  );
};

export default CourseReviewItem;

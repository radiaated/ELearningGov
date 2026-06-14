"use client";

import { useState } from "react";

import type { CourseReview } from "@/types/course";

import StarRating from "./StarRating";

import formatDate from "@/utils/formatDate";

type Props = {
  review: CourseReview;
  deleteReview?: (id: number) => void;
};

const CourseReviewItem = ({ review, deleteReview }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleDelete = () => {
    if (!review.id || !deleteReview) return;
    deleteReview(review.id);
    setIsMenuOpen(false);
  };

  return (
    <div className="relative rounded-lg bg-white p-4 hover:bg-zinc-50 transition">
      {/* Menu button */}
      <button
        type="button"
        onClick={() => setIsMenuOpen((p) => !p)}
        className="absolute right-2 top-2 text-zinc-400 hover:text-zinc-600"
        aria-label="Open menu"
      >
        <i className="fa-solid fa-ellipsis text-sm" />
      </button>

      {/* Dropdown + overlay */}
      {isMenuOpen && (
        <>
          <button
            className="fixed inset-0 z-40"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          />

          <div className="absolute right-2 top-7 z-50 w-28 rounded-md bg-white shadow-sm border border-zinc-100 text-sm">
            <button
              onClick={handleDelete}
              className="w-full text-left px-3 py-2 text-red-500 hover:bg-zinc-50"
            >
              Delete
            </button>
          </div>
        </>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <div className="text-sm font-medium text-zinc-800">
            {review.username}
          </div>

          <div className="text-xs text-zinc-400">
            {formatDate(review.date_created)}
          </div>
        </div>
      </div>
      <hr className="text-zinc-200 mt-2" />

      {/* Rating */}
      <div className="mt-1">
        <StarRating rating={review.rating} />
      </div>

      {/* Comment */}
      <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
        {review.comment}
      </p>
    </div>
  );
};

export default CourseReviewItem;

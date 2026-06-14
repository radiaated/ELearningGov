"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import SetStarRating from "@/components/SetStarRating";

import postCoureReview from "@/app/lib/postCoureReview";

import { courseReviewSchema, CourseReviewFormData } from "@/schemas/course";

type Props = {
  slug: string;
};

const CourseReviewForm = ({ slug }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CourseReviewFormData>({
    resolver: yupResolver(courseReviewSchema),
  });

  const onSubmit = async (data: CourseReviewFormData) => {
    await postCoureReview(data, slug);

    reset();

    window.location.reload();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border border-zinc-200 rounded p-4 space-y-3"
    >
      <div className="title">Post your review...</div>
      <SetStarRating onChange={(rating) => setValue("rating", rating)} />

      <textarea
        className="w-full border p-2 rounded text-sm"
        {...register("comment")}
        placeholder="Write your review..."
      />

      {errors.comment && (
        <p className="text-xs text-red-500">{errors.comment.message}</p>
      )}

      <button
        type="submit"
        className="bg-primary-main text-white px-4 py-2 text-sm rounded"
      >
        Post Review
      </button>
    </form>
  );
};

export default CourseReviewForm;

import * as yup from "yup";

import courseCategories from "@/data/courseCategories";

/**
 * Course Schema
 */
export const courseSchema = yup.object({
  title: yup.string().max(200).required("Title is required"),

  author: yup.string().max(200).required("Author is required"),

  language: yup.string().max(100).required("Language is required"),

  level: yup.string().max(100).required("Level is required"),

  description: yup.string().max(5000).required("Description is required"),

  requirements: yup.string().max(200).required("Requirements are required"),

  category: yup
    .string()
    .oneOf(["", ...courseCategories.map((item) => item.value)])
    .required("Category is required"),

  thumbnail: yup.mixed().required("Thumbnail is required"),

  preview_video: yup.mixed().required("Preview video is required"),

  price: yup
    .number()
    .typeError("Price must be a number")
    .min(0.1, "Price must be at least 0.1")
    .required("Price is required"),
});

/**
 * Chapter Schema
 */
export const chapterSchema = yup.object({
  chpt: yup
    .number()
    .typeError("Chapter number must be a number")
    .integer()
    .min(1)
    .required("Chapter number is required"),

  course: yup
    .number()
    .typeError("Course ID must be provided")
    .required("Course is required"),

  title: yup.string().max(200).required("Title is required"),

  description: yup.string().max(5000).required("Description is required"),

  video: yup.mixed().required("Video is required"),

  duration: yup
    .number()
    .typeError("Duration must be a number")
    .integer()
    .min(1)
    .required("Duration is required"),
});

/**
 * CourseReview Schema
 */
export const courseReviewSchema = yup.object({
  rating: yup
    .number()
    .typeError("Rating must be a number")
    .min(0)
    .max(5)
    .required("Rating is required"),

  comment: yup.string().max(1000).required("Comment is required"),
});

export type CourseFormData = yup.InferType<typeof courseSchema>;
export type ChapterFormData = yup.InferType<typeof chapterSchema>;
export type CourseReviewFormData = yup.InferType<typeof courseReviewSchema>;

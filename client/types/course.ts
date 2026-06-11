import * as yup from "yup";

export const courseReviewSchema = yup.object({
  username: yup.string().required(),
  rating: yup.number().required().min(1).max(5),
  comment: yup.string().required(),
  date_created: yup.date().required().min(1).max(5),
});

export const courseSchema = yup.object({
  id: yup.number().required(),
  slug: yup.string().required(),

  title: yup.string().required().min(3),
  thumbnail: yup.string().url().required(),

  description: yup.string().optional(),

  price: yup.number().required().min(0),

  category: yup.string().required(),

  avg_rating: yup.number().required().min(0).max(5),

  reviews_count: yup.number().required().min(0),

  level: yup.string().optional(),
  language: yup.string().optional(),

  created_at: yup.string().optional(),
  updated_at: yup.string().optional(),
});

export type CourseReview = yup.InferType<typeof courseReviewSchema>;
export type Course = yup.InferType<typeof courseSchema>;

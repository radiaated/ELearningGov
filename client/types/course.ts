import * as yup from "yup";

export const courseReviewSchema = yup.object({
  id: yup.number().notRequired(),
  username: yup.string().optional(),
  rating: yup.number().required().min(1).max(5),
  comment: yup.string().required(),
  date_created: yup.date().optional(),
  is_admin: yup.boolean().required().default(false),
});

export const chapterSchema = yup.object({
  slug: yup.string().required(),

  chpt: yup.number().required().integer().min(1),

  title: yup.string().required().min(1).max(200),

  description: yup.string().required().max(5000),

  video: yup.string().required(),

  duration: yup.number().required().integer().min(1),

  date_created: yup.date().required(),
});

export const courseSchema = yup.object({
  id: yup.number().required(),
  slug: yup.string().required(),
  requirements: yup.string().required(),
  title: yup.string().required().min(3),
  thumbnail: yup.string().url().required(),

  description: yup.string().optional(),

  price: yup.number().required().min(0),

  category: yup.string().required(),

  avg_rating: yup.number().required().min(0).max(5),

  reviews_count: yup.number().required().min(0),

  level: yup.string().optional(),
  language: yup.string().optional(),
  course_chapters: yup.array().of(chapterSchema).required(),
  course_reviews: yup.array().of(courseReviewSchema).required(),
  date_created: yup.string().required(),
});

export type Course = yup.InferType<typeof courseSchema>;
export type Chapter = yup.InferType<typeof chapterSchema>;
export type CourseReview = yup.InferType<typeof courseReviewSchema>;

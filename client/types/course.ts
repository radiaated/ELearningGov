import courseCategories from "@/data/course";

export type CourseCategory = (typeof courseCategories)[number]["value"];

export interface Course {
  id: number;
  slug: string;
  title: string;
  author: string;
  language: string;
  level: string;
  description: string;
  requirements: string;
  category: CourseCategory;
  thumbnail: string;
  preview_video: string;
  price: number;
  date_created: string;
  avg_rating: number;
  reviews_count: number;
  course_chapters: Chapter[];
  course_reviews: CourseReview[];
}

export interface Chapter {
  id: number;
  slug: string;
  chpt: number;
  course: number;
  title: string;
  description: string;
  video: string;
  duration: number;
  date_created: string;
}

export interface CourseReview {
  id: number;
  username: number;
  course: number;
  rating: number;
  comment: string;
  date_created: string;
}

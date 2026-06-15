import * as yup from "yup";

import courseCategories from "@/data/course";

export const chapterSchema = yup.object({
  chpt: yup
    .number()
    .typeError("Chapter must be a number")
    .integer()
    .min(1)
    .required("Chapter number is required"),

  title: yup.string().max(200).required("Title is required"),

  description: yup.string().max(5000).required("Description is required"),

  video: yup
    .mixed<File>()
    .required("Video is required")
    .test("fileExists", "Please upload a video", (file) => {
      return file instanceof FileList && file.length > 0;
    })
    .test("fileType", "Only MP4 or MKV allowed", (file) => {
      if (!(file instanceof FileList) || file.length === 0) return false;

      return ["video/mp4", "video/x-matroska"].includes(file[0].type);
    }),

  // duration: yup
  //   .number()
  //   .typeError("Duration must be a number")
  //   .integer()
  //   .min(1)
  //   .required("Duration is required"),
});

export const chapterUpdateSchema = chapterSchema.omit(["video"]).shape({
  video: yup
    .mixed<File>()
    .notRequired()
    .test("fileExists", "Upload a preview video", (file) => {
      if (!file) return true;
      return file instanceof FileList && file.length > 0;
    })
    .test("fileType", "Only MP4 or MKV allowed", (file) => {
      if (!file || !(file instanceof FileList) || file.length === 0)
        return true;

      return ["video/mp4", "video/x-matroska"].includes(file[0].type);
    }),
});

export const courseSchema = yup.object({
  title: yup.string().max(200).required("Title is required"),

  author: yup.string().max(200).required("Author is required"),

  language: yup.string().max(100).required("Language is required"),

  level: yup.string().max(100).required("Level is required"),

  description: yup.string().max(5000).required("Description is required"),

  requirements: yup.string().max(200).required("Requirements is required"),

  category: yup
    .string()
    .oneOf(
      courseCategories.map((item) => item.value),
      "Invalid category",
    )
    .required("Category is required"),

  thumbnail: yup
    .mixed<FileList>()
    .required("Thumbnail is required")
    .test("fileExists", "Upload a thumbnail", (file) => {
      return file instanceof FileList && file.length > 0;
    })
    .test("fileType", "Only images allowed", (file) => {
      if (!(file instanceof FileList) || file.length === 0) return false;

      return ["image/png", "image/jpeg", "image/jpg", "image/gif"].includes(
        file[0].type,
      );
    }),

  preview_video: yup
    .mixed<FileList>()
    .required("Preview video is required")
    .test("fileExists", "Upload a preview video", (file) => {
      return file instanceof FileList && file.length > 0;
    })
    .test("fileType", "Only MP4 or MKV allowed", (file) => {
      if (!(file instanceof FileList) || file.length === 0) return false;

      return ["video/mp4", "video/x-matroska"].includes(file[0].type);
    }),

  price: yup
    .number()
    .typeError("Price must be a number")
    .min(0.1, "Price must be at least 0.1")
    .required("Price is required"),

  course_chapters: yup.array().of(chapterSchema).default([]),
});

export const courseUpdateSchema = courseSchema
  .omit(["thumbnail", "preview_video"])
  .shape({
    thumbnail: yup
      .mixed<FileList>()
      .notRequired()
      .test("fileExists", "Upload a thumbnail", (file) => {
        if (!file) return true;
        return file instanceof FileList && file.length > 0;
      })
      .test("fileType", "Only images allowed", (file) => {
        if (!file || !(file instanceof FileList) || file.length === 0)
          return true;

        return ["image/png", "image/jpeg", "image/jpg", "image/gif"].includes(
          file[0].type,
        );
      }),

    preview_video: yup
      .mixed<FileList>()
      .notRequired()
      .test("fileExists", "Upload a preview video", (file) => {
        if (!file) return true;
        return file instanceof FileList && file.length > 0;
      })
      .test("fileType", "Only MP4 or MKV allowed", (file) => {
        if (!file || !(file instanceof FileList) || file.length === 0)
          return true;

        return ["video/mp4", "video/x-matroska"].includes(file[0].type);
      }),
  });

export const courseReviewSchema = yup.object({
  rating: yup
    .number()
    .typeError("Rating must be a number")
    .integer()
    .min(0)
    .max(5)
    .required("Rating is required"),

  comment: yup.string().max(1000).required("Comment is required"),
});

export type CourseFormData = yup.InferType<typeof courseSchema>;
export type CourseUpdateFormData = yup.InferType<typeof courseUpdateSchema>;
export type ChapterFormData = yup.InferType<typeof chapterSchema>;
export type ChapterUpdateFormData = yup.InferType<typeof chapterUpdateSchema>;
export type CourseReviewFormData = yup.InferType<typeof courseReviewSchema>;

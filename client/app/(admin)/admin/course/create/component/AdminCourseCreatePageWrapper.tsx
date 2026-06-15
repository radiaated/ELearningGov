"use client";

import React, { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  ChapterFormData,
  CourseFormData,
  courseSchema,
} from "@/schemas/course";

import { BadRequestError } from "@/app/lib/api";
import postAdminCourse from "@/app/lib/postAdminCourse";

import courseCategories from "@/data/course";

const AdminCourseCreatePageWrapper = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(courseSchema),
  });

  const [chapters, setChapters] = useState<ChapterFormData[]>([
    {
      chpt: 1,
      title: "",
      description: "",
      video: undefined as unknown as File,
    },
  ]);

  const onChangeChapter = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => {
    const { name, value } = e.target;

    setChapters((prev) => {
      const updated = [...prev];

      if (name === "duration" || name === "chpt") {
        updated[index] = {
          ...updated[index],
          [name]: Number(value),
        };
      } else {
        updated[index] = {
          ...updated[index],
          [name]: value,
        };
      }

      return updated;
    });
  };

  const onSubmit = async (payload: CourseFormData) => {
    const fd = new FormData();

    fd.append("title", payload.title);
    fd.append("author", payload.author);
    fd.append("language", payload.language);
    fd.append("level", payload.level);
    fd.append("description", payload.description);
    fd.append("requirements", payload.requirements);
    fd.append("category", payload.category);

    fd.append("thumbnail", payload.thumbnail[0]);
    fd.append("preview_video", payload.preview_video[0]);

    fd.append("price", String(payload.price));

    fd.append("course_chapters", JSON.stringify(chapters));

    chapters.forEach((chapter, i) => {
      if (chapter.video) {
        fd.append(`chpt_no${i + 1}`, chapter.video);
      }
    });

    try {
      await postAdminCourse(fd);
      router.push("/admin/course");
    } catch (err) {
      if (err instanceof BadRequestError) {
        const validationMessage = await err.response?.json();
        Object.entries(validationMessage).forEach(([field, messages]) => {
          setError(field as keyof CourseFormData, {
            type: "server",
            message: Array.isArray(messages) ? messages[0] : String(messages),
          });
        });
        return;
      }

      setError("root", {
        type: "server",
        message: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <section>
      <div className="section-container my-16 md:w-1/2">
        <div className="text-xs text-white flex gap-1 items-center mb-2">
          <Link href={`/admin/course`} className="hover:underline">
            <i className="fa-solid fa-chevron-left"></i>
            Go back to courses
          </Link>
        </div>
        <div className="fixed bg-primary-light w-full h-[50%] top-0 left-0 -z-10" />

        <div className="bg-white drop-shadow-2xl py-10 pb-12 px-12 rounded-md relative">
          <h2 className="text-3xl font-semibold mt-2">Create Course</h2>
          <hr className="my-4 text-zinc-400" />

          <form onSubmit={handleSubmit(onSubmit)} className="form-container">
            {/* Title */}
            <div>
              <label className="form-label">Title *</label>
              <input
                {...register("title")}
                className="form-input"
                placeholder="Enter course title"
              />
              <p className="form-error">{errors.title?.message}</p>
            </div>

            {/* Description */}
            <div>
              <label className="form-label">Description *</label>
              <textarea
                {...register("description")}
                className="form-input"
                placeholder="Write a short course description"
              />
              <p className="form-error">{errors.description?.message}</p>
            </div>

            {/* Author */}
            <div>
              <label className="form-label">Author *</label>
              <input
                {...register("author")}
                className="form-input"
                placeholder="Enter author name"
              />
              <p className="form-error">{errors.author?.message}</p>
            </div>

            {/* Language */}
            <div>
              <label className="form-label">Language *</label>
              <input
                {...register("language")}
                className="form-input"
                placeholder="e.g. English, Nepali"
              />
              <p className="form-error">{errors.language?.message}</p>
            </div>

            {/* Level */}
            <div>
              <label className="form-label">Level *</label>
              <input
                {...register("level")}
                className="form-input"
                placeholder="Beginner / Intermediate / Advanced"
              />
              <p className="form-error">{errors.level?.message}</p>
            </div>

            {/* Requirements */}
            <div>
              <label className="form-label">Requirements *</label>
              <input
                {...register("requirements")}
                className="form-input"
                placeholder="Basic knowledge required"
              />
            </div>

            {/* Category */}
            <div>
              <label className="form-label">Category *</label>
              <select {...register("category")} className="form-input">
                <option value="">Select category</option>
                {courseCategories.map((cat, i) => (
                  <option key={i} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Thumbnail */}
            <div>
              <label className="form-label">Thumbnail *</label>
              <input
                type="file"
                {...register("thumbnail")}
                className="form-input"
              />
            </div>

            {/* Preview video */}
            <div>
              <label className="form-label">Preview Video *</label>
              <input
                type="file"
                {...register("preview_video")}
                className="form-input"
              />
            </div>

            {/* Price */}
            <div>
              <label className="form-label">Price *</label>
              <input
                type="number"
                {...register("price")}
                className="form-input"
                placeholder="Enter course price"
              />
            </div>

            {/* Chapters */}
            <div className="border p-4 rounded-md space-y-4 mt-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Chapters</h3>

                <button
                  type="button"
                  onClick={() =>
                    setChapters((prev) => [
                      ...prev,
                      {
                        chpt: prev.length + 1,
                        title: "",
                        description: "",
                        video: undefined as any,
                        duration: 0,
                      },
                    ])
                  }
                  className="btn border-2 border-primary-main text-primary-main hover:bg-primary-main hover:text-zinc-50 p-1"
                >
                  Add +
                </button>
              </div>

              {chapters.map((chpt, i) => (
                <div key={i} className="border rounded-md p-3 space-y-3">
                  <div className="grid grid-cols-12 gap-2 items-center">
                    <div className="col-span-1 font-medium">{i + 1}</div>

                    <input
                      className="form-input col-span-8"
                      name="title"
                      value={chpt.title}
                      onChange={(e) => onChangeChapter(e, i)}
                      placeholder="Chapter title"
                    />

                    <input
                      className="form-input col-span-2"
                      type="file"
                      name="video"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        setChapters((prev) => {
                          const copy = [...prev];
                          copy[i].video = file as any;
                          return copy;
                        });
                      }}
                    />

                    <button
                      type="button"
                      className="col-span-1 text-xs btn border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-zinc-50 w-fit px-1"
                      onClick={() =>
                        setChapters((prev) =>
                          prev.filter((_, idx) => idx !== i),
                        )
                      }
                    >
                      <i className="fa-solid fa-circle-xmark"></i>
                    </button>
                  </div>

                  <textarea
                    className="form-input w-full"
                    name="description"
                    value={chpt.description}
                    onChange={(e) => onChangeChapter(e, i)}
                    placeholder="Write chapter description"
                    rows={3}
                  />
                </div>
              ))}
            </div>

            {/* Submit */}
            <input type="submit" value="Submit" className="form-button mt-4" />
          </form>
        </div>
      </div>
    </section>
  );
};

export default AdminCourseCreatePageWrapper;

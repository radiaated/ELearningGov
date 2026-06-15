"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  ChapterUpdateFormData,
  CourseFormData,
  CourseUpdateFormData,
  courseUpdateSchema,
} from "@/schemas/course";

import courseCategories from "@/data/course";
import { BadRequestError, NotFoundError } from "@/app/lib/api";
import postAdminCourse from "@/app/lib/postAdminCourse";

import { notFound, useParams, useRouter } from "next/navigation";
import getAdminCourse from "@/app/lib/getAdminCourse";
import Link from "next/link";

const AdminCourseUpdatePageWrapper = () => {
  const { slug } = useParams();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(courseUpdateSchema),
  });

  const [chapters, setChapters] = useState<ChapterUpdateFormData[]>([
    {
      chpt: 1,
      title: "",
      description: "",
      video: undefined as any,
    },
  ]);

  const fetchCourse = async (slug: string) => {
    try {
      const data = await getAdminCourse(slug);

      // populate form
      reset({
        title: data.title,
        author: data.author,
        language: data.language,
        level: data.level,
        description: data.description,
        requirements: data.requirements,
        category: data.category,
        price: data.price,
      });

      // populate chapters
      if (data.course_chapters?.length) {
        const chapters =
          data.course_chapters as unknown as ChapterUpdateFormData[];
        setChapters(chapters);
      }
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

      if (err instanceof NotFoundError) {
        notFound();
      }

      setError("root", {
        type: "server",
        message: "Something went wrong. Please try again.",
      });
    }
  };

  const onChangeChapter = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => {
    const { name, value } = e.target;

    setChapters((prev) => {
      const updated = [...prev];

      updated[index] = {
        ...updated[index],
        [name]: name === "chpt" || name === "duration" ? Number(value) : value,
      };

      return updated;
    });
  };

  const onSubmit = async (payload: CourseUpdateFormData) => {
    const fd = new FormData();

    fd.append("title", payload.title);
    fd.append("author", payload.author);
    fd.append("language", payload.language);
    fd.append("level", payload.level);
    fd.append("description", payload.description);
    fd.append("requirements", payload.requirements);
    fd.append("category", payload.category);

    if (payload.thumbnail) {
      fd.append("thumbnail", payload.thumbnail[0]);
    }

    if (payload.preview_video) {
      fd.append("preview_video", payload.preview_video[0]);
    }

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

  useEffect(() => {
    if (slug) fetchCourse(slug as string);
  }, []);

  return (
    <section>
      <div className="section-container my-16 md:w-1/2">
        <div className="text-xs text-white flex gap-1 items-center mb-2">
          <Link href={`/admin/course`} className="hover:underline">
            Courses
          </Link>
          <i className="fa-solid fa-chevron-right"></i>
          {watch("title")}
        </div>
        <div className="fixed bg-primary-light w-full h-[50%] top-0 left-0 -z-10" />

        <div className="bg-white drop-shadow-2xl py-10 pb-12 px-12 rounded-md relative">
          <h2 className="text-3xl font-semibold mt-2">Create Course</h2>
          <hr className="my-4 text-zinc-400" />

          <form onSubmit={handleSubmit(onSubmit)} className="form-container">
            {/* Title */}
            <div>
              <label className="form-label">Title *</label>
              <input {...register("title")} className="form-input" />
              <p className="form-error">{errors.title?.message}</p>
            </div>

            {/* Description */}
            <div>
              <label className="form-label">Description *</label>
              <textarea {...register("description")} className="form-input" />
              <p className="form-error">{errors.description?.message}</p>
            </div>

            {/* Author */}
            <div>
              <label className="form-label">Author *</label>
              <input {...register("author")} className="form-input" />
              <p className="form-error">{errors.author?.message}</p>
            </div>

            {/* Language */}
            <div>
              <label className="form-label">Language *</label>
              <input {...register("language")} className="form-input" />
              <p className="form-error">{errors.language?.message}</p>
            </div>

            {/* Level */}
            <div>
              <label className="form-label">Level *</label>
              <input {...register("level")} className="form-input" />
              <p className="form-error">{errors.level?.message}</p>
            </div>

            {/* Requirements */}
            <div>
              <label className="form-label">Requirements *</label>
              <input {...register("requirements")} className="form-input" />
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
                  <i className="fa-solid fa-plus"></i>
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
                    />

                    <input
                      className="form-input col-span-2"
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        setChapters((prev) => {
                          const copy = [...prev];
                          copy[i] = {
                            ...copy[i],
                            video: file as any,
                          };
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
                      ✕
                    </button>
                  </div>

                  <textarea
                    className="form-input w-full"
                    name="description"
                    value={chpt.description}
                    onChange={(e) => onChangeChapter(e, i)}
                    rows={3}
                  />
                </div>
              ))}
            </div>

            <input type="submit" value="Submit" className="form-button mt-4" />
          </form>
        </div>
      </div>
    </section>
  );
};

export default AdminCourseUpdatePageWrapper;

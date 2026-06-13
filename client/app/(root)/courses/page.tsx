"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import useDebounce from "@/hook/useDebounce";
import courseCategories from "@/data/courseCategories";
import PaginatedCourses from "./components/PaginatedCourses";
import PaginatedCoursesSkeleton from "./components/PaginatedCoursesSkeleton";

const schema = yup.object({
  q: yup.string().default(""),
  category: yup.string().default(""),
});

type FormData = yup.InferType<typeof schema>;

const CoursesPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const q = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "";

  const { register, watch, setValue } = useForm<FormData>({
    defaultValues: { q, category },
    resolver: yupResolver(schema),
  });

  const values = watch();

  useDebounce(
    () => {
      const next = new URLSearchParams(searchParams.toString());

      next.set("q", values.q);
      next.set("category", values.category);
      next.set("page", "1");

      router.replace(`${pathname}?${next.toString()}`);
    },
    [values.q, values.category],
    400,
  );

  const categoryOptions = [{ value: "", label: "All" }, ...courseCategories];

  return (
    <section className="w-full">
      <div className="section-container md:p-6 flex flex-col gap-6">
        <h2 className="text-3xl font-semibold tracking-tight text-gray-900">
          Online Courses
        </h2>

        {/* Filters */}
        <div className="flex flex-col gap-4">
          {/* Search */}
          <div className="relative w-full col-span-6">
            <input
              placeholder="Search courses..."
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 pl-12 text-gray-700 shadow-sm outline-none transition focus:border-primary-main focus:ring-2 focus:ring-primary-main/20"
              {...register("q")}
            />
            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          {/* Category Buttons */}
          <div className="flex flex-wrap gap-2">
            {categoryOptions.map((item) => {
              const isActive = watch("category") === item.value;

              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setValue("category", item.value)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition border ${
                    isActive
                      ? "bg-primary-main text-white border-primary-main"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Paginated List */}

        <PaginatedCourses />
      </div>
    </section>
  );
};

export default CoursesPage;

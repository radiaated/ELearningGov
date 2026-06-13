"use client";

import { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import ReactPaginate from "react-paginate";

import type { Course } from "@/types/course";
import CourseList from "@/app/components/CourseList";

import useDebounce from "@/hook/useDebounce";
import getCourses from "@/app/lib/getCourses";
import courseCategories from "@/data/courseCategories";

const schema = yup.object({
  q: yup.string().default(""),
  category: yup.string().default(""),
});

type FormData = yup.InferType<typeof schema>;

const PAGE_SIZE = 5;

export default function CoursePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const page = Number(searchParams.get("page") ?? 1);
  const q = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "";

  const { register, control, watch, setValue } = useForm<FormData>({
    defaultValues: { q, category },
    resolver: yupResolver(schema),
  });

  const [courses, setCourses] = useState<Course[]>([]);
  const [count, setCount] = useState(0);

  const updateURL = (params: Partial<Record<string, string | number>>) => {
    const next = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (!value) next.delete(key);
      else next.set(key, String(value));
    });

    router.replace(`${pathname}?${next.toString()}`);
  };

  const handlePageClick = (event: any) => {
    updateURL({ page: event.selected + 1 });
  };

  const values = watch();

  useDebounce(
    () => {
      updateURL({
        q: values.q,
        category: values.category,
        page: 1,
      });
    },
    [values.q, values.category],
    400,
  );

  useEffect(() => {
    const query = searchParams.toString();

    getCourses(query).then((data) => {
      setCourses(data.results);
      setCount(data.count);
    });
  }, [searchParams]);

  const categoryOptions = [
    { value: "", label: "All" },
    ...courseCategories.map((c) => ({
      value: c.short,
      label: c.title,
    })),
  ];

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

          {/* Category Select wrapper for better spacing */}
          <div className="flex flex-wrap gap-2">
            {categoryOptions.map((item) => {
              const isActive = watch("category") === item.value;

              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setValue("category", item.value)}
                  className={`
          rounded-full px-4 py-1.5 text-sm font-medium transition
          border focus:outline-none focus:ring-2 focus:ring-primary-main/30
          ${
            isActive
              ? "bg-primary-main text-white border-primary-main shadow-sm"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-gray-400"
          }
        `}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* List */}
        <div className="min-h-50">
          <CourseList courses={courses} />
        </div>

        {/* Pagination */}
        {count > 0 && (
          <div className="flex justify-center pt-4">
            <ReactPaginate
              forcePage={page - 1}
              pageCount={Math.ceil(count / PAGE_SIZE)}
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              previousLabel="Prev"
              nextLabel="Next"
              containerClassName="flex items-center gap-2 text-sm"
              pageClassName="rounded-lg overflow-hidden"
              pageLinkClassName="px-3 py-1.5 rounded-lg hover:bg-gray-100 transition"
              activeClassName="bg-primary-main text-white"
              previousClassName="px-3 py-1.5 rounded-lg hover:bg-gray-100"
              nextClassName="px-3 py-1.5 rounded-lg hover:bg-gray-100"
              disabledClassName="opacity-40 cursor-not-allowed"
            />
          </div>
        )}
      </div>
    </section>
  );
}

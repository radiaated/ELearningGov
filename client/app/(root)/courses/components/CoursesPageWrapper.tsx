"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import PaginatedCourses from "./PaginatedCourses";

import useDebounce from "@/hook/useDebounce";
import courseCategories from "@/data/course";
import { useEffect, useRef } from "react";

const schema = yup.object({
  q: yup.string().default(""),
  category: yup.string().default(""),
});

type FilterFormData = yup.InferType<typeof schema>;

const CoursesPageWrapper = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { register, watch, setValue } = useForm({
    defaultValues: {
      q: searchParams.get("q") ?? "",
      category: searchParams.get("category") ?? "",
    },
    resolver: yupResolver(schema),
  });

  const categoryOptions = [{ value: "", label: "All" }, ...courseCategories];

  const handleFilterChange = (data: FilterFormData) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (data.q.trim().length > 0) {
      newSearchParams.set("q", data.q.trim());
    } else {
      newSearchParams.delete("q");
    }

    if (data.category.length > 0) {
      newSearchParams.set("category", data.category);
    } else {
      newSearchParams.delete("category");
    }

    newSearchParams.delete("page");

    const newSearchParamsString = newSearchParams.toString();

    router.replace(`${pathname}?${newSearchParamsString}`, { scroll: false });
  };

  const isMounted = useRef<boolean>(false);

  const values = watch();

  useEffect(() => {
    if (isMounted.current) {
      useDebounce(() => handleFilterChange(values), 400);
    }

    isMounted.current = true;
  }, [values.category, values.q]);

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

export default CoursesPageWrapper;

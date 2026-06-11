"use client";

import { useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import ReactPaginate from "react-paginate";

import type { Course } from "@/types/course";
import CourseItem from "@/app/components/CourseItem";

import useDebounce from "@/hook/useDebounce";

import { api } from "@/app/lib/api";
import { env } from "@/env";

import courseCategories from "@/data/courseCategories";
import CourseList from "@/app/components/CourseList";

const formSchema = yup.object({
  q: yup.string().default(""),
  category: yup.string().default(""),
});

type FormData = yup.InferType<typeof formSchema>;

const CoursePage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [courses, setCourses] = useState<Course[]>([]);
  const [count, setCount] = useState<number>(0);

  const { register, watch, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      q: searchParams.get("q") ?? "",
      category: searchParams.get("category") ?? "",
    },
    resolver: yupResolver(formSchema),
  });

  // Build query string from form data
  const setSearchParams = (searchParamsObj: Record<string, any>) => {
    const params = new URLSearchParams();

    Object.entries(searchParamsObj).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") return;
      params.set(key, String(value));
    });

    router.replace(`${pathname}?${params.toString()}`);
  };

  const fetchCourses = async () => {
    const res = await api(
      `${env.API_URL}/api/course?${searchParams.toString()}`,
    );

    const data = await res?.json();
    setCourses(data?.results ?? []);
    setCount(data?.count);
  };

  const pageParam = searchParams.get("page");

  const handlePageClick = (event: any) => {
    setSearchParams({ page: event.selected });
  };

  const onSubmit = (formData: FormData) => {
    setSearchParams(formData);
  };

  // Fetch when URL changes
  useEffect(() => {
    fetchCourses();
  }, [searchParams.toString()]);

  const values = watch();

  useDebounce(
    () => {
      handleSubmit(onSubmit)();
    },
    [values.q, values.category],
    300,
  );

  return (
    <div className="md:p-4 flex flex-col gap-2">
      <div className="mb-4">
        <h2 className="text-2xl font-medium mb-2">Online Courses</h2>

        <form className="flex gap-2">
          <div className="w-full flex justify-end items-center relative">
            <input
              placeholder="Search"
              className="border border-gray-400 rounded-lg p-4 pl-12 w-full"
              {...register("q")}
            />

            <i className="fa-solid fa-magnifying-glass absolute left-0 ml-4 w-10"></i>
          </div>

          <div>
            Filter:
            <select
              className="bg-zinc-100 text-md border border-zinc-200 p-2 rounded-xl mb-1"
              {...register("category")}
            >
              <option value="">All</option>
              {courseCategories.map((item) => (
                <option key={item.short} value={item.short}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>

      <hr className="my-2" />

      <CourseList courses={courses} />
      {courses && (
        <ReactPaginate
          forcePage={pageParam ? Number(pageParam) - 1 : 0}
          containerClassName="w-full block space-x-4"
          nextClassName="inline-block after:block after:h-[2px] after:bg-primary-main text-sm"
          previousClassName="inline-block after:block after:h-[2px] after:bg-primary-main text-sm"
          activeClassName="bg-primary-main text-white"
          pageLinkClassName="block h-7 w-7 leading-7 align-middle text-center"
          pageClassName={"inline-block rounded-full cursor-pointer "}
          disabledClassName="text-zinc-400 after:block after:h-[2px] after:bg-zinc-400"
          breakLabel="..."
          breakClassName="inline-block"
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={Math.ceil(count / 5)}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
        />
      )}
    </div>
  );
};

export default CoursePage;

"use client";

import { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import ReactPaginate from "react-paginate";

import type { Course } from "@/types/course";

import CourseList from "@/components/CourseList";
import PaginatedCoursesSkeleton from "./PaginatedCoursesSkeleton";

import getCourses from "@/app/lib/getCourses";

const PAGE_SIZE = 5;

const PaginatedCourses = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const page = Number(searchParams.get("page") ?? 1);

  const [courses, setCourses] = useState<Course[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    setLoading(true);

    const query = searchParams.toString();

    try {
      getCourses(query).then((data) => {
        setCourses(data.results);
        setCount(data.count);
        setLoading(false);
      });
    } catch (err) {
      throw err;
    }
  }, [searchParams]);

  if (loading) {
    return <PaginatedCoursesSkeleton />;
  }

  return (
    <>
      <div className="min-h-50">
        <CourseList courses={courses} />
      </div>

      {count > 0 && (
        <div className="flex justify-center pt-4">
          <ReactPaginate
            forcePage={page - 1}
            pageCount={Math.ceil(count / PAGE_SIZE)}
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            previousLabel="Prev"
            nextLabel="Next"
            containerClassName="flex items-center gap-2 text-sm mb-8 max-w-[90%]"
            pageClassName="rounded-lg overflow-hidden"
            pageLinkClassName="px-3 py-1.5 rounded-lg hover:bg-gray-100 transition"
            activeClassName="bg-primary-main text-white"
            previousClassName="px-3 py-1.5 rounded-lg hover:bg-gray-100"
            nextClassName="px-3 py-1.5 rounded-lg hover:bg-gray-100"
            disabledClassName="opacity-40 cursor-not-allowed"
          />
        </div>
      )}
    </>
  );
};

export default PaginatedCourses;

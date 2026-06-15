"use client";

import { useState, useMemo, useEffect, useRef } from "react";

import { useSearchParams, useRouter, usePathname } from "next/navigation";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnDef,
  ColumnFiltersState,
} from "@tanstack/react-table";

import type { Course } from "@/types/course";
import ReactPaginate from "react-paginate";

import getAdminCourses from "@/app/lib/getAdminCourses";
import useDebounce from "@/hook/useDebounce";

import courseCategories from "@/data/course";
import Link from "next/link";
import { toast } from "sonner";
import { NotFoundError } from "@/app/lib/api";
import deleteAdminCourse from "@/app/lib/deleteAdminCourse";

const filterSchema = yup.object({
  q: yup.string().default(""),
  category: yup.string().default(""),
});

type FilterFormData = yup.InferType<typeof filterSchema>;

const PAGE_SIZE = 10;

const AdminCoursesPageWrapper = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const [pageCount, setPageCount] = useState<number>(0);

  const hanldeDeleteCourse = async (slug: string) => {
    try {
      await deleteAdminCourse(slug);
      router.push("/admin/course");
    } catch (err) {
      if (err instanceof NotFoundError) {
        console.error("Error occured.", err);
        toast.error("Failed to delete the course");
      }

      throw err;
    }
  };

  const fetchCourses = async () => {
    try {
      const data = await getAdminCourses(searchParams.toString());

      setCourses(data.results);
      setPageCount(Math.ceil(data.count / PAGE_SIZE));
    } catch (err) {
      console.error("Error occured.", err);
      throw err;
    }
  };

  const columns = useMemo<ColumnDef<Course>[]>(
    () => [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "title", header: "Title" },
      {
        accessorKey: "category",
        cell: ({ getValue }) => {
          const value = getValue<string>();

          return (
            courseCategories.find((item) => item.value === value)?.label ??
            value
          );
        },
        header: "Category",
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const course = row.original;

          return (
            <div className="flex gap-2">
              <Link
                href={`/admin/course/${course.slug}/update`}
                className="px-3 py-1 text-xs rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                <i className="fa-regular fa-pen-to-square"></i>{" "}
              </Link>

              <button
                onClick={() => hanldeDeleteCourse(course.slug)}
                className="btn px-3 py-1 text-xs rounded-md bg-red-600 text-white hover:bg-red-700"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          );
        },
      },
    ],
    [],
  );

  const table = useReactTable({
    data: courses,
    columns,
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const categoryOptions = [{ value: "", label: "All" }, ...courseCategories];

  const { register, watch } = useForm<FilterFormData>({
    resolver: yupResolver(filterSchema),
    defaultValues: {
      q: searchParams.get("q") ?? "",
      category: searchParams.get("category") ?? "",
    },
  });

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

  const handlePageChange = (event: any) => {
    const pageN = event.selected + 1;

    const newSearchParams = new URLSearchParams(searchParams.toString());

    newSearchParams.set("page", String(pageN));

    const newSearchParamsString = newSearchParams.toString();

    router.replace(`${pathname}?${newSearchParamsString}`, { scroll: false });
  };

  const values = watch();

  const isMounted = useRef<boolean>(false);

  useEffect(() => {
    if (isMounted.current) {
      useDebounce(() => handleFilterChange(values), 500);
    }
    isMounted.current = true;
  }, [values.category, values.q]);

  useEffect(() => {
    fetchCourses();
  }, [searchParams]);

  return (
    <section>
      <div className="section-container w-full md:w-2/4 p-5 font-sans min-h-screen">
        <div className="title">Courses</div>
        {/* Filters */}
        <div className="flex gap-3 justify-between mb-4">
          <form className="flex gap-3">
            <input
              type="text"
              placeholder="Search by title..."
              {...register("q")}
              className="px-3 py-2 w-52 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              {...register("category")}
              className="px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categoryOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </form>
          <Link
            href="/admin/course/create"
            className="text-right text-primary-main hover:text-zinc-50 hover:bg-primary-main border-2  border-primary-main px-6 py-2 rounded"
          >
            Create
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full border-collapse min-h-133">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="bg-gray-100 text-left border-b"
                >
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-sm font-semibold text-gray-700 border-b"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b hover:bg-primary-main/20 transition"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-4 py-3 text-sm text-gray-700"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center py-10 text-gray-500"
                  >
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6">
          <ReactPaginate
            forcePage={page - 1}
            pageCount={pageCount}
            onPageChange={handlePageChange}
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
      </div>
    </section>
  );
};

export default AdminCoursesPageWrapper;

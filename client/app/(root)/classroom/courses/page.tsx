import Link from "next/link";
import { cookies } from "next/headers";

import courseCategories from "@/data/courseCategories";
import { env } from "@/env";
import type { Course } from "@/types/course";
import { api } from "@/app/lib/api";

const ClassroomCourses = async () => {
  // Get cookies from incoming request
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  // Fetch API with forwarded cookies
  const response = await api(env.API_URL + "/api/user/course", {
    method: "GET",
    headers: {
      Cookie: cookieHeader,
      "Content-Type": "application/json",
    },
  });

  const courses: Course[] = await response?.json();

  return (
    <section>
      <div className="section-container lg:w-2/3 my-8">
        <h2 className="title">Your Courses</h2>
        <hr className="text-zinc-300" />

        <div className="divide-y divide-zinc-200">
          {courses?.map((course) => (
            <div
              key={course.slug}
              className="flex flex-col md:flex-row gap-4 py-6"
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                className="h-40 md:h-24 w-full md:w-40 rounded-lg object-cover bg-zinc-100"
              />

              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-medium text-zinc-900">
                  {course.title}
                </h3>

                <p className="mt-1 text-sm text-zinc-600 line-clamp-2">
                  {course.description}
                </p>

                {course.category && (
                  <div className="mt-1 bg-zinc-100 border border-zinc-300/25 text-xs w-fit px-1 py-0 rounded">
                    {
                      courseCategories.find(
                        (cat) => cat.value === course.category,
                      )?.label
                    }
                  </div>
                )}
              </div>

              <Link
                href={`/classroom/courses/${course.slug}`}
                className="self-start md:self-center text-sm text-zinc-100 font-medium text-center w-full md:w-fit bg-primary-main hover:bg-primary-dark transition-colors rounded-md px-8 py-4"
              >
                Watch →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClassroomCourses;

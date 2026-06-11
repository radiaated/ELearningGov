import Link from "next/link";
import { cookies } from "next/headers";

import courseCategories from "@/data/courseCategories";
import { env } from "@/env";
import { Course } from "@/types/course";

const ClassroomCourses = async () => {
  // Get cookies from incoming request
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  // Fetch API with forwarded cookies
  const response = await fetch(env.API_URL + "/api/user/course", {
    method: "GET",
    headers: {
      Cookie: cookieHeader,
      "Content-Type": "application/json",
    },
  });

  const courses: Course[] = await response.json();

  return (
    <div className="w-full md:w-[60%] mx-auto mb-60">
      <h2 className="text-xl font-semibold">Your Courses</h2>
      <hr className="my-2" />

      <div className="flex flex-col gap-2 divide-y divide-zinc-300">
        {courses &&
          courses.map((course, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row gap-2 relative py-4"
            >
              <img
                className="block h-24 w-full md:w-32 object-cover mr-2"
                src={course.thumbnail}
                alt={course.title}
              />

              <div className="flex-1">
                <h3 className="text-xl font-medium">{course.title}</h3>

                <p className="text-sm">{course.description?.slice(0, 75)}...</p>

                <div className="bg-zinc-100 border border-zinc-300/25 text-sm w-fit px-1 mt-2">
                  {course.category &&
                    courseCategories.find(
                      (cat) => cat.short === course.category,
                    )?.title}
                </div>
              </div>

              <Link
                href={`/classroom/courses/${course.slug}`}
                className="flex h-fit items-center gap-2 border border-primary-dark bg-primary-main px-4 py-2 w-fit rounded-sm text-white hover:bg-primary-dark duration-75"
              >
                Watch
                <i className="fa-solid fa-arrow-right" />
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ClassroomCourses;

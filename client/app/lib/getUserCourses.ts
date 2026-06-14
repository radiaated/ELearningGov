import type { Course } from "@/types/course";

import { api } from "./api";
import { env } from "@/env";

const getUserCourses = async (cookieHeader?: string): Promise<Course[]> => {
  const res = await api(env.API_URL + "/api/user/course/", {
    headers: {
      "Content-Type": "application/json",
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
    credentials: cookieHeader ? undefined : "include",
  });

  return res?.json();
};

export default getUserCourses;

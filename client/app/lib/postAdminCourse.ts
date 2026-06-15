import type { Course } from "@/types/course";
import { CourseFormData } from "@/schemas/course";

import { api } from "./api";
import { env } from "@/env";

const postAdminCourse = async (
  payload: FormData,
  cookieHeader?: string | null,
): Promise<Course> => {
  const res = await api(`${env.API_URL}/api/admins/course/`, {
    method: "POST",
    headers: {
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
      // "Content-Type": "application/json",
    },
    body: payload,
    credentials: cookieHeader ? undefined : "include",
  });

  return res?.json();
};

export default postAdminCourse;

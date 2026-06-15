import type { Course } from "@/types/course";

import { api } from "./api";
import { env } from "@/env";

const getAdminCourse = async (
  slug: string,
  cookieHeader?: string | null,
): Promise<Course> => {
  const response = await api(`${env.API_URL}/api/admins/course/${slug}/`, {
    headers: {
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
    credentials: cookieHeader ? undefined : "include",
  });

  const data = response?.json();

  return data;
};

export default getAdminCourse;

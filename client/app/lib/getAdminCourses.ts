import type { Course } from "@/types/course";

import { api } from "./api";
import { env } from "@/env";

const getAdminCourses = async (
  searhParams: string,
  cookieHeader?: string | null,
): Promise<{ count: number; results: Course[] }> => {
  const res = await api(`${env.API_URL}/api/admins/course/?${searhParams}`, {
    headers: {
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
    credentials: cookieHeader ? undefined : "include",
  });

  return res?.json();
};

export default getAdminCourses;

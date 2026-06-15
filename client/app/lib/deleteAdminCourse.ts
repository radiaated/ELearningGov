import { api } from "./api";
import { env } from "@/env";

const deleteAdminCourse = async (
  slug: string,
  cookieHeader?: string | null,
): Promise<void> => {
  await api(`${env.API_URL}/api/admins/course/${slug}/`, {
    method: "DELETE",
    headers: {
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
    credentials: cookieHeader ? undefined : "include",
  });
};

export default deleteAdminCourse;

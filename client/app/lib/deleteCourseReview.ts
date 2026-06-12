import { api } from "./api";
import { env } from "@/env";

const deleteCourseReview = async (
  id: number,
  cookieHeader: string | null = null,
): Promise<void> => {
  const headers = cookieHeader ? { Cookie: cookieHeader } : undefined;

  await api(`${env.API_URL}/api/course/course-review/?review_id=${id}`, {
    method: "DELETE",
    headers,
    credentials: cookieHeader ? undefined : "include",
  });
};

export default deleteCourseReview;

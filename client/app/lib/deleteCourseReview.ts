import { api } from "./api";
import { env } from "@/env";

const deleteCourseReview = async (
  courseSlug: string,
  id: number,
  cookieHeader?: string | null,
): Promise<void> => {
  await api(
    `${env.API_URL}/api/course/${courseSlug}/course-review/?course=${id}`,
    {
      method: "DELETE",
      headers: {
        ...(cookieHeader ? { Cookie: cookieHeader } : {}),
      },
      credentials: cookieHeader ? undefined : "include",
    },
  );
};

export default deleteCourseReview;

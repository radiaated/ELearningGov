import { api } from "./api";
import { env } from "@/env";
import type { CourseReview as CourseReviewFormData } from "@/types/course";

const updateCoureReview = async (
  payload: CourseReviewFormData,
  courseSlug: string,
  cookieHeader?: string,
): Promise<any> =>
  api(`${env.API_URL}/api/course/${courseSlug}/course-review/`, {
    method: "PUT",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
    credentials: cookieHeader ? undefined : "include",
  });

export default updateCoureReview;

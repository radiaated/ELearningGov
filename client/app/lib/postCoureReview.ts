import type { CourseReviewFormData } from "@/schemas/course";

import { api } from "./api";
import { env } from "@/env";

const postCoureReview = async (
  payload: CourseReviewFormData,
  courseSlug: string,
  cookieHeader?: string,
): Promise<any> =>
  api(`${env.API_URL}/api/course/${courseSlug}/course-review/`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
    credentials: cookieHeader ? undefined : "include",
  });

export default postCoureReview;

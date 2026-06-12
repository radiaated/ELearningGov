import { api } from "./api";
import { env } from "@/env";

type DeleteCourseReviewPayload = {
  review_id: number;
};

const deleteCourseReview = async (
  payload: DeleteCourseReviewPayload,
  cookieHeader?: string | null,
): Promise<void> => {
  await api(
    `${env.API_URL}/api/course/course-review/?review_id=${payload.review_id}`,
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

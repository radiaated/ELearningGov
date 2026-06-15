import { api } from "./api";
import { env } from "@/env";

type PurchaseStatusResponse = {
  purchase_status: boolean;
};

const getCoursePurchaseStatus = async (
  course_slug: string,
  cookieHeader?: string | null,
): Promise<PurchaseStatusResponse> => {
  const options: RequestInit = cookieHeader
    ? {
        headers: {
          Cookie: cookieHeader,
        },
      }
    : {
        credentials: "include",
      };

  const res = await api(
    `${env.API_URL}/api/user/course/${course_slug}/purchase-status/`,
    options,
  );

  return res?.json();
};

export default getCoursePurchaseStatus;

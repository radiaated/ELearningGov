import { api } from "./api";
import { env } from "@/env";

type PurchaseStatusResponse = {
  purchase_status: boolean;
};

const getCoursePurchaseStatus = async (
  courseSlug: string,
  cookieHeader: string | null = null,
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

  const response = await api(
    `${env.API_URL}/api/user/course/${courseSlug}/purchase-status/`,
    options,
  );

  const data: PurchaseStatusResponse = await response?.json();
  return data;
};

export default getCoursePurchaseStatus;

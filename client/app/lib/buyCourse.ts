import { api } from "./api";
import { env } from "@/env";

type BuyCoursePayload = {
  course_id: number[];
  price: number;
};

type BuyCourseResponse = {
  payment_url: string;
};

const buyCourse = async (
  payload: BuyCoursePayload,
  cookieHeader?: string | null,
): Promise<BuyCourseResponse> => {
  const res = await api(`${env.API_URL}/api/purchase/urchase-course/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
    body: JSON.stringify(payload),
    credentials: cookieHeader ? undefined : "include",
  });

  return res?.json();
};

export default buyCourse;

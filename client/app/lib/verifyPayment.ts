import { api } from "./api";
import { env } from "@/env";

type Payload = {
  pidx: string;
};

const verifyPayment = (
  payload: Payload,
  purchaseOrderName: string,
  cookieHeader?: string | null,
) =>
  api(
    `${env.API_URL}/api/purchase/verify-payment/?course_ids=${purchaseOrderName}`,
    {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader ? cookieHeader : undefined,
      },
      credentials: cookieHeader ? undefined : "include",
    },
  );

export default verifyPayment;

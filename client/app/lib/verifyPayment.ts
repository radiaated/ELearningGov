import { api } from "./api";
import { env } from "@/env";

type VerifyPaymentPayload = {
  pidx: string;
};

const verifyPayment = async (
  payload: VerifyPaymentPayload,
  purchaseOrderName: string,
  cookieHeader?: string,
): Promise<any> =>
  api(
    `${env.API_URL}/api/purchase/verify-payment/?course_ids=${purchaseOrderName}`,
    {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        ...(cookieHeader ? { Cookie: cookieHeader } : {}),
      },
      credentials: cookieHeader ? undefined : "include",
    },
  );

export default verifyPayment;

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { api } from "@/app/lib/api";
import { env } from "@/env";

type Props = {
  searchParams: Promise<{
    pidx?: string;
    purchase_order_name?: string;
  }>;
};

export default async function VerifyPaymentPage({ searchParams }: Props) {
  const { pidx, purchase_order_name } = await searchParams;

  if (!pidx || !purchase_order_name) {
    redirect("/classroom/courses");
  }

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  try {
    await api(
      `${env.API_URL}/api/purchase/verify-payment/?course_ids=${purchase_order_name}`,
      {
        method: "POST",
        body: JSON.stringify({ pidx }),
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader,
        },
      },
    );
  } catch (error) {
    // optionally handle error
  }

  redirect("/classroom/courses");
}

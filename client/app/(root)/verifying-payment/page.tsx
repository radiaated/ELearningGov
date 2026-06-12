"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "@/app/lib/api";
import { env } from "@/env";
import { useCartStore } from "@/store/cartStore";

export default function VerifyPaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const cartItems = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const verifyPayment = async () => {
    const pidx = searchParams.get("pidx");
    const purchaseOrderName = searchParams.get("purchase_order_name");

    if (!pidx || !purchaseOrderName) {
      router.replace("/classroom/courses");
      return;
    }

    const purchasedCourseIds = purchaseOrderName
      .split("_")
      .map((item) => parseInt(item, 10));

    try {
      await api(
        `${env.API_URL}/api/purchase/verify-payment/?course_ids=${purchaseOrderName}`,
        {
          method: "POST",
          body: JSON.stringify({ pidx }),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );

      purchasedCourseIds.forEach((id) => {
        if (cartItems.some((item) => item.id === id)) {
          removeItem(id);
        }
      });
    } catch (error) {
      console.error("Payment verification failed:", error);
    } finally {
      router.replace("/classroom/courses");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [searchParams, router, cartItems, removeItem]);

  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <p>Verifying payment...</p>
    </div>
  );
}

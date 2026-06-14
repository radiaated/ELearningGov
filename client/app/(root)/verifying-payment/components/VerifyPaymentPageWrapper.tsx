"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useCartStore } from "@/store/cartStore";

import verifyPayment from "@/app/lib/verifyPayment";

export default function VerifyPaymentPageWrapper() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const cartItems = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);

  const [verificationStatus, setVerificationStatus] = useState<
    "pending" | "success" | "rejected"
  >("pending");

  const verifyPaymentt = async () => {
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
      await verifyPayment({ pidx }, purchaseOrderName);

      purchasedCourseIds.forEach((id) => {
        if (cartItems.some((item) => item.id === id)) {
          removeItem(id);
        }
      });

      setVerificationStatus("success");
    } catch (error) {
      setVerificationStatus("rejected");
      console.error("Payment verification failed:", error);
    } finally {
      setTimeout(() => {
        router.replace("/classroom/courses");
      }, 1000);
    }
  };

  useEffect(() => {
    verifyPaymentt();
  }, []);

  return (
    <section>
      <div className="section-container min-h-[50vh] text-center">
        <p className="flex gap-2 items-center">
          {verificationStatus === "pending" ? (
            "Verifying payment..."
          ) : verificationStatus === "success" ? (
            <>
              <i className="fa-solid fa-circle-check text-green-600"></i>
              <span>Payment Verified.</span>
            </>
          ) : (
            <>
              <i className="fa-solid fa-exclamation text-red-700"></i>
              <span>Failed to verify payment.</span>
            </>
          )}
        </p>
      </div>
    </section>
  );
}

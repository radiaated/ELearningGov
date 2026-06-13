"use client";

import { useState } from "react";

import buyCourse from "@/app/lib/buyCourse";

type Props = {
  courseId: number;
  price: number;
};

const PurchaseButton = ({ courseId, price }: Props) => {
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    try {
      setLoading(true);

      const data = await buyCourse({
        course_id: [courseId],
        price,
      });

      if (data?.payment_url) {
        window.location.href = data.payment_url;
      }
    } catch (error) {
      console.error("Purchase failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePurchase}
      disabled={loading}
      className="btn w-full px-4 py-2 rounded-md text-zinc-100 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? "Processing..." : "Purchase"}
    </button>
  );
};

export default PurchaseButton;

import type { Metadata } from "next";

import VerifyPaymentPageClient from "./components/VerifyPaymentPageClient";

export const metadata: Metadata = {
  title: "Verify Payment | Dur-Sanchar Elearning",
  description:
    "Verifying your payment for Dur-Sanchar Elearning courses. Please wait while we confirm your transaction.",
};

export default function VerifyPaymentPage() {
  return <VerifyPaymentPageClient />;
}

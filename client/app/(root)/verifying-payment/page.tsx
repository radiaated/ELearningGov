import type { Metadata } from "next";
import { Suspense } from "react";

import VerifyPaymentPageWrapper from "./components/VerifyPaymentPageWrapper";

export const metadata: Metadata = {
  title: "Verify Payment | Dur-Sanchar Elearning",
  description:
    "Verifying your payment for Dur-Sanchar Elearning courses. Please wait while we confirm your transaction.",
};

const VerifyPaymentPage = () => {
  return (
    <Suspense>
      <VerifyPaymentPageWrapper />
    </Suspense>
  );
};

export default VerifyPaymentPage;

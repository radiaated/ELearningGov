import type { Metadata } from "next";

import VerifyPaymentPageWrapper from "./components/VerifyPaymentPageWrapper";

export const metadata: Metadata = {
  title: "Verify Payment | Dur-Sanchar Elearning",
  description:
    "Verifying your payment for Dur-Sanchar Elearning courses. Please wait while we confirm your transaction.",
};

const VerifyPaymentPage = () => {
  return <VerifyPaymentPageWrapper />;
};

export default VerifyPaymentPage;

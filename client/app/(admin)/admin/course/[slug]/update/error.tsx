"use client";

import AppError from "@/components/AppError";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <AppError
      error={error}
      reset={unstable_retry}
      message="Failed to load the dashboard course update page."
    />
  );
}

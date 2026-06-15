"use client";
import AppError from "@/components/AppError";
import Header from "./(root)/components/Header";
import Footer from "./(root)/components/Footer";

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html>
      <body>
        <Header />
        <div className="min-h-[calc(100vh-6.5rem)] mt-44">
          <AppError
            error={error}
            reset={unstable_retry}
            message="Failed to load the courses."
          />
        </div>
        <Footer />
      </body>
    </html>
  );
}

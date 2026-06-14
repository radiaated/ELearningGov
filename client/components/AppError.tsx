"use client";

import { useEffect } from "react";

type AppErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
  message: string;
};

export default function AppError({ error, reset, message }: AppErrorProps) {
  useEffect(() => {
    console.error(message, error);
  }, [error, message]);

  return (
    <section>
      <div className="section-container my-16 flex flex-col items-center gap-4 text-center">
        <div className="italic text-zinc-700">
          {message}
          <br />
          {error?.message}

          {error?.digest && (
            <>
              <br />
              <span className="text-sm text-zinc-500">
                Error ID: {error.digest}
              </span>
            </>
          )}
        </div>

        <img src="/error.gif" alt="Error" className="h-64" />

        <button
          onClick={() => reset()}
          className="btn bg-primary-main hover:bg-primary-dark px-8 py-4 text-zinc-50"
        >
          Try again
        </button>
      </div>
    </section>
  );
}

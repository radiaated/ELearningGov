import Link from "next/link";

export default function AppNotFound({ message }: { message: string }) {
  console.log(message);
  return (
    <section>
      <div className="section-container my-16 flex flex-col items-center gap-4 text-center">
        <div className="italic text-zinc-700">{message}</div>

        <img src="/404-not-found.gif" alt="Error" className="h-64" />

        <Link
          href="/"
          className="btn bg-primary-main hover:bg-primary-dark px-8 py-4 text-zinc-50"
        >
          Go to home
        </Link>
      </div>
    </section>
  );
}

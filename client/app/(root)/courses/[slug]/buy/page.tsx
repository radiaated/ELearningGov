import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";
import { cookies } from "next/headers";

import type { Course } from "@/types/course";

import PurchaseButton from "./components/PurchaseButton";

import { NotFoundError } from "@/app/lib/api";
import getCourse from "@/app/lib/getCourse";

import courseCategories from "@/data/course";
import getCoursePurchaseStatus from "@/app/lib/getCoursePurchaseStatus";

import formatPrice from "@/utils/formatPrice";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const BuyCoursePage = async ({ params }: Props) => {
  const { slug } = await params;

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  let course: Course;
  let categoryTitle: string;

  try {
    course = await getCourse(slug);
    categoryTitle =
      courseCategories.find((cat) => cat.value === course.category)?.label ??
      "-";
  } catch (err) {
    if (err instanceof NotFoundError) {
      notFound();
    }
    throw err;
  }

  const purchaseStatus = await getCoursePurchaseStatus(slug, cookieHeader);

  if (purchaseStatus?.purchase_status) {
    redirect(`/classroom/courses/${slug}`);
  }

  return (
    <section>
      <div className="section-container my-8 w-full md:w-2/4">
        <div className="w-full space-y-6">
          <h3 className="title">Purchase Course</h3>

          <hr className="text-zinc-200" />

          <div className="grid grid-cols-8 gap-2">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="col-span-3 md:col-span-3 w-full h-20 rounded-md object-cover bg-zinc-100"
            />

            <div className="col-span-5 md:col-span-3 flex-1 space-y-1">
              <Link href={`/course/${slug}`}>
                <h3 className="text-base font-medium text-zinc-900 hover:text-primary-main transition">
                  {course.title}
                </h3>
              </Link>

              <div className="bg-zinc-100 border border-zinc-300/25 text-xs w-fit px-2 py-1 rounded">
                {categoryTitle}
              </div>
            </div>

            <div className="col-span-12 md:col-span-2 text-center md:text-right text-2xl font-bold text-zinc-900">
              {formatPrice(course.price)}
            </div>
          </div>

          <PurchaseButton courseId={course.id} price={course.price} />
        </div>
      </div>
    </section>
  );
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const course = await getCourse(slug);

  const title = `Buy ${course.title} | Dur-Sanchar Elearning`;

  const description =
    course.description.slice(0, 160) ||
    `Buy and learn ${course.title} with Dur-Sanchar Elearning.`;

  return {
    title,
    description,
  };
}

export default BuyCoursePage;

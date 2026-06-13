"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import courseCategories from "@/data/courseCategories";
import getCoursePurchaseStatus from "@/app/lib/getCoursePurchaseStatus";
import getCourse from "@/app/lib/getCourse";
import buyCourse from "@/app/lib/buyCourse";
import type { Course } from "@/types/course";
import formatPrice from "@/utils/formatPrice";

export default function BuyCoursePage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();

  const [course, setCourse] = useState<Course | null>(null);

  const loadData = async () => {
    try {
      const purchaseStatus = await getCoursePurchaseStatus(slug);

      if (purchaseStatus?.purchase_status) {
        router.push(`/classroom/course/${slug}`);
        return;
      }

      const courseData = await getCourse(slug);

      setCourse(courseData);
    } catch (error) {
      console.error("Failed to load course data:", error);
    }
  };

  const categoryLabel = course
    ? courseCategories.find((cat) => cat.value === course?.category)?.label
    : undefined;

  const handlePurchase = async () => {
    if (!course) return;

    try {
      const data = await buyCourse({
        course_id: [course?.id],
        price: course?.price,
      });

      if (data?.payment_url) {
        window.location.href = data.payment_url;
      }
    } catch (error) {
      console.error("Purchase failed:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <section>
      <div className="section-container my-8 w-full md:w-2/4">
        <div className="w-full space-y-6">
          <h3 className="title">Purchase Course</h3>

          <hr className="text-zinc-200" />

          <div className="grid grid-cols-8 gap-2">
            <img
              src={course?.thumbnail}
              alt={course?.title}
              className="col-span-3 md:col-span-3 w-full h-20 rounded-md object-cover bg-zinc-100"
            />

            <div className="col-span-5 md:col-span-3 flex-1 space-y-1">
              <Link href={`/course/${slug}`}>
                <h3 className="text-base font-medium text-zinc-900 hover:text-primary-main transition">
                  {course?.title}
                </h3>
              </Link>

              {categoryLabel && (
                <div className="bg-zinc-100 border border-zinc-300/25 text-xs w-fit px-2 py-1 rounded">
                  {categoryLabel}
                </div>
              )}
            </div>

            <div className="col-span-12 md:col-span-2 text-center md:text-right text-2xl font-bold text-zinc-900">
              {course?.price && formatPrice(course.price)}
            </div>
          </div>
          <button
            onClick={handlePurchase}
            className="btn w-full px-4 py-2 rounded-md text-zinc-100 bg-green-600 hover:bg-green-700"
          >
            Purchase
          </button>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import courseCategories from "@/data/courseCategories";
import { api } from "@/app/lib/api";
import { env } from "@/env";

export default function BuyCoursePage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();

  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const loadData = async () => {
      try {
        // Check purchase status
        let response = await api(
          `${env.API_URL}/api/user/course/${slug}/purchase-status/`,
          {
            credentials: "include",
          },
        );

        const purchaseStatusData = await response?.json();

        if (purchaseStatusData.purchase_status) {
          router.push(`/classroom/course/${slug}`);
          return;
        }

        // Get course
        response = await api(`${env.API_URL}/api/course/${slug}/`);

        const courseData = await response?.json();
        setCourse(courseData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [slug, router]);

  const purchaseCourse = async () => {
    if (!course) return;

    try {
      const response = await api(
        `${env.API_URL}/api/purchase/purchase-course/`,
        {
          method: "POST",
          body: JSON.stringify({
            course_id: [String(course.id)],
            price: course.price,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );

      const data = await response?.json();

      window.location.href = data.payment_url;
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!course) {
    return <div>Course not found.</div>;
  }

  return (
    <div className="w-full md:w-[50%] mx-auto">
      <div>
        <div>
          <h3 className="text-xl md:text-3xl font-semi-bold mb-4">Purchase</h3>

          <hr className="mb-4" />

          <div className="flex flex-col md:flex-row gap-4">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="h-36 md:h-24 rounded-md object-cover"
            />

            <div className="flex flex-col gap-1">
              <Link href={`/course/${slug}`}>
                <h3 className="text-xl font-medium">{course.title}</h3>
              </Link>

              <div className="bg-zinc-100 border border-zinc-300/25 text-sm w-fit px-1">
                {
                  courseCategories.find((cat) => cat.short === course.category)
                    ?.title
                }
              </div>
            </div>

            <div>
              <div className="text-xl font-medium text-center mb-2">
                Rs. {course.price / 100}
              </div>

              <button
                className="group border border-green-600 rounded-full w-full px-5 py-2 hover:bg-green-600 hover:text-zinc-100 duration-100 md:w-fit"
                onClick={purchaseCourse}
              >
                Purchase
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

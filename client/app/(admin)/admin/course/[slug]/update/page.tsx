import { Metadata } from "next";

import AdminCourseUpdatePageWrapper from "./components/AdminCourseUpdatePageWrapper";

import getCourse from "@/app/lib/getCourse";

const AdminCourseUpdatePage = async () => {
  return <AdminCourseUpdatePageWrapper />;
};

export default AdminCourseUpdatePage;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const course = await getCourse(slug);

  const title = `${course.title} - Admin Dashboard | Dur-Sanchar Elearning`;

  const description =
    course.description.slice(0, 160) ||
    `Update the course ${course.title} using admin dashboard on Dur-Sanchar Elearning.`;

  return {
    title,
    description,
  };
}

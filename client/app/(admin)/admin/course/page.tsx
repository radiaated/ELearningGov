import { Metadata } from "next";

import AdminCoursesPageWrapper from "./components/AdminCoursesPageWrapper";

const AdminCoursesPage = () => {
  return <AdminCoursesPageWrapper />;
};

export default AdminCoursesPage;

export const metadata: Metadata = {
  title: "Courses - Admin Dashboard | Dur-Sanchar Elearning",
  description: `View and manage the courses using admin dashboard on Dur-Sanchar Elearning.`,
};

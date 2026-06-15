import { Metadata } from "next";

import AdminCourseCreatePageWrapper from "./component/AdminCourseCreatePageWrapper";

const AdminCourseCreatePage = () => {
  return <AdminCourseCreatePageWrapper />;
};

export default AdminCourseCreatePage;

export const metadata: Metadata = {
  title: "Create course - Admin Dashboard | Dur-Sanchar Elearning",
  description: `Create a course using admin dashboard on Dur-Sanchar Elearning.`,
};

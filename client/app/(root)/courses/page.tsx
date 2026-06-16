import { Suspense } from "react";
import CoursesPageWrapper from "./components/CoursesPageWrapper";

export const metadata = {
  title: "Courses | Dur-Sanchar Elearning",
  description:
    "View all the courses on Dur-Sanchar Elearning. Dur-Sanchar Elearning is a leading government-provided e-learning platform offering online courses, PDFs, and software tools to enhance learning.",
};

const CoursePage = () => {
  return (
    <Suspense>
      <CoursesPageWrapper />
    </Suspense>
  );
};

export default CoursePage;

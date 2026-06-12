import { env } from "@/env";
import { api } from "@/app/lib/api";
import CourseList from "@/app/components/CourseList";
import getCourses from "@/app/lib/getCourses";

const CoursesForYouSection = async () => {
  const coursesData = await getCourses();
  console.log(coursesData);
  const courses = coursesData.results;
  return (
    <section className="section">
      <h2 className="title">Courses for you</h2>
      <CourseList courses={courses} />
    </section>
  );
};

export default CoursesForYouSection;

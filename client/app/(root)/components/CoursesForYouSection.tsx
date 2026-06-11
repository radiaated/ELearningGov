import { env } from "@/env";
import { api } from "@/app/lib/api";
import CourseList from "@/app/components/CourseList";

const CoursesForYouSection = async () => {
  let courses = [];
  const response = await api(env.API_URL + "/api/course/");
  const data = await response?.json();
  courses = data.results;
  return (
    <section className="section">
      <h2 className="title">Courses for you</h2>
      <CourseList courses={courses} />
    </section>
  );
};

export default CoursesForYouSection;

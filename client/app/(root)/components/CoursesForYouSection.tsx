import { env } from "@/env";
import { api } from "@/app/lib/api";
import CourseList from "@/components/CourseList";
import getCourses from "@/app/lib/getCourses";

const CoursesForYouSection = async () => {
  const coursesData = await getCourses();
  console.log(coursesData);
  const courses = coursesData.results;
  return (
    <section>
      <div className="section-container my-16">
        <h2 className="title">Courses for you</h2>
        <CourseList courses={courses} />
      </div>
    </section>
  );
};

export default CoursesForYouSection;

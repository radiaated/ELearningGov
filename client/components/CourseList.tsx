import type { Course } from "@/types/course";

import CourseItem from "./CourseItem";

const CourseList = ({ courses }: { courses: Course[] }) => {
  return (
    <div className="grid grid-cols-5 gap-8">
      {courses.map((course: Course, ind: number) => (
        <div key={ind} className="col-span-5 md:col-span-1">
          <CourseItem course={course} />
        </div>
      ))}
    </div>
  );
};

export default CourseList;

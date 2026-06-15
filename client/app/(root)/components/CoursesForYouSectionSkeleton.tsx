import CourseListSkeleton from "@/components/CourseListSkeleton";

const CoursesForYouSectionSkeleton = async () => {
  return (
    <section>
      <div className="section-container my-16">
        <h2 className="title">Courses for you</h2>
        <CourseListSkeleton />
      </div>
    </section>
  );
};

export default CoursesForYouSectionSkeleton;

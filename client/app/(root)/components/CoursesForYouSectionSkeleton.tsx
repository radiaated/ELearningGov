import CourseListSkeleton from "@/app/components/CourseListSkeleton";

const CoursesForYouSectionSkeleton = async () => {
  return (
    <div>
      <h2 className="title w-1/5 h-6 bg-gray-200"></h2>
      <CourseListSkeleton />
    </div>
  );
};

export default CoursesForYouSectionSkeleton;

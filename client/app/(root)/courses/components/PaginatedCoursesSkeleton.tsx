import CourseListSkeleton from "@/components/CourseListSkeleton";

const PaginatedCoursesSkeleton = () => {
  return (
    <>
      {/* List */}
      <div className="min-h-50">
        <CourseListSkeleton />
      </div>

      {/* Pagination */}
      <div className="w-full h-8 md:w-1/3 mx-auto bg-gray-200 rounded-sm mt-8" />
    </>
  );
};

export default PaginatedCoursesSkeleton;

const CourseListSkeleton = () => {
  return (
    <div className="grid grid-cols-5 gap-8 animate-pulse">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="col-span-5 md:col-span-1">
          <div className="h-32 bg-gray-200 rounded-sm mt-1" />
          <div className="w-full h-4 bg-gray-200 rounded-sm mt-1"></div>
          <div>
            <div className="w-full h-8 bg-gray-200 rounded-sm mt-1"></div>
          </div>
          <div className="w-full h-8 bg-gray-200 rounded-sm mt-1"></div>
        </div>
      ))}
    </div>
  );
};

export default CourseListSkeleton;

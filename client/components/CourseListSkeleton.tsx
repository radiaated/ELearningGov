const CourseListSkeleton = () => {
  return (
    <div className="grid grid-cols-5 gap-8">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="col-span-5 md:col-span-1">
          <div className="h-32 mt-1 skeleton" />
          <div className="h-4 mt-1 skeleton"></div>
          <div>
            <div className="h-8 mt-1 skeleton"></div>
          </div>
          <div className="h-8 skeleton"></div>
        </div>
      ))}
    </div>
  );
};

export default CourseListSkeleton;

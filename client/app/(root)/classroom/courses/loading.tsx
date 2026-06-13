const loading = () => {
  return (
    <section>
      <div className="section-container lg:w-2/3 my-8">
        <div className="h-8 bg-gray-200 rounded-sm animate-pulse my-8"></div>
        <div className="flex flex-col gap-y-6">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div
              className="h-80 md:h-24 w-full bg-gray-200 rounded-sm animate-pulse"
              key={idx}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default loading;

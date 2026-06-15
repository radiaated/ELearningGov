const loading = () => {
  return (
    <section>
      <div className="section-container my-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Left side */}
          <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">
            <div className="h-8 skeleton"></div>

            <div className="h-38 skeleton"></div>

            {/* Course Contents */}
            <div className="h-[50vh] skeleton mt-4"></div>

            <hr className="text-zinc-400" />
          </div>

          {/* Right side */}
          <div className="col-span-12 lg:col-span-6">
            <div className="lg:w-2/3 h-3/4 mx-auto skeleton"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default loading;

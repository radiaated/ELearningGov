const loading = () => {
  return (
    <section>
      <div className="section-container my-8 w-full md:w-2/4">
        <div className="w-full space-y-6">
          <div className="h-8 bg-gray-200 rounded-sm animate-pulse"></div>
          <hr className="text-zinc-300" />
          <div className="h-20 bg-gray-200 rounded-sm animate-pulse"></div>

          <div className="h-8 bg-gray-200 rounded-sm animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default loading;

const loading = () => {
  return (
    <section>
      <div className="section-container my-8 w-full md:w-2/4">
        <div className="w-full space-y-6">
          <div className="h-8 skeleton"></div>
          <hr className="text-zinc-300" />
          <div className="h-20 skeleton"></div>

          <div className="h-8 skeleton"></div>
        </div>
      </div>
    </section>
  );
};

export default loading;

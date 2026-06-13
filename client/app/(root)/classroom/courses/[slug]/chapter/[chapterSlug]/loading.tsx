import React from "react";

const loading = () => {
  return (
    <section>
      <div className="section-container my-8">
        <div className="h-8 w-full md:w-64 bg-gray-200 rounded-sm animate-pulse"></div>

        <div className="grid grid-cols-12 mt-4 gap-x-4">
          <div className="col-span-12 md:col-span-4 order-2 md:order-1">
            <div className="flex flex-col gap-2">
              {Array.from({ length: 12 }).map((_, idx) => (
                <div
                  className="w-full h-8 bg-gray-200 rounded-sm animate-pulse"
                  key={idx}
                ></div>
              ))}
            </div>
          </div>

          <div className="col-span-12 md:col-span-8 mt-0 md:-mt-12 order-1 md:order-2">
            <div className="flex flex-col gap-2">
              <div className="w-full h-8 bg-gray-200 rounded-sm animate-pulse"></div>

              <div className="w-full h-16 bg-gray-200 rounded-sm animate-pulse"></div>

              <div className="w-full h-[50vh] bg-gray-200 rounded-sm animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default loading;

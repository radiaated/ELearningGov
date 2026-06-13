import Link from "next/link";
import courseCategories from "@/data/courseCategories";

const CategoriesSection = () => {
  return (
    <section>
      <div className="section-container my-16">
        <h2 className="title">Choose Categories from...</h2>
        <hr />

        <div className="grid grid-cols-12 gap-6 my-8">
          {courseCategories.map(({ short, title }) => (
            <Link
              key={short}
              href={`/courses?category=${short}`}
              aria-label={`Browse ${title} courses`}
              className="
              group relative col-span-6 md:col-span-3
              block overflow-hidden
              border-b-2 border-zinc-600
              bg-zinc-100 px-4 py-2
              transition-colors
              hover:text-zinc-50
              drop-shadow-sm
            "
            >
              {/* Base label */}
              <span className="relative z-10">{title}</span>

              {/* Hover overlay */}
              <div
                className="
                absolute inset-0
                flex items-center justify-between
                bg-zinc-600 text-zinc-50
                px-4
                opacity-0
                group-hover:opacity-100
                transition-opacity
              "
              >
                <span>{title}</span>
                <i className="fa-solid fa-magnifying-glass" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;

import React from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  const courseCategories = [
    { title: "Technology and IT", short: "tech_it" },
    { title: "Professional Development", short: "prof_dev" },
    { title: "Creative Arts", short: "creative_arts" },
    { title: "Health and Wellness", short: "health_wellness" },
    { title: "Language Learning", short: "language" },
    { title: "Vocational and Trade Skills", short: "vocational_trade" },
    { title: "Environmental Studies", short: "environmental_studies" },
    { title: "Social Sciences", short: "social_sciences" },
    { title: "Law and Legal Studies", short: "law_studies" },
  ];
  return (
    <div className="section my-16">
      <h2 className="title">Choose Categories from...</h2>
      <hr />
      <div className="grid grid-cols-12 gap-6 my-8">
        {courseCategories.map((cat, ind) => (
          <Link
            to={`/courses?category=${cat.short}`}
            className="col-span-6 md:col-span-3 group block border-b-2 border-zinc-600 px-4 py-2 bg-zinc-100 relative hover:text-zinc-50 drop-shadow-sm"
            key={ind}
          >
            <div className="h-0 w-full bg-zinc-600 flex justify-between items-center absolute left-0 bottom-0 group-hover:h-full group-hover:px-4 group-hover:py-2 transition-[height] overflow-hidden">
              {cat.title} <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            {cat.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
